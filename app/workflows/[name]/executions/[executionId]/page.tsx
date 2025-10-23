'use client';

import { useState } from 'react';
import * as React from 'react';
import { useParams } from 'next/navigation';
import { useWorkflowExecution, useWorkflowExecutionLogs, useWorkflowExecutionLogsByStep } from '@/lib/hooks/use-workflows';
import type { TestWorkflowSignature } from '@/lib/api/generated/models/TestWorkflowSignature';
import type { WorkflowLogEntry } from '@/lib/api/workflow-logs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  GitBranch,
  ChevronDown,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';

export default function WorkflowExecutionDetailPage() {
  const params = useParams();
  const workflowName = params.name as string;
  const executionId = params.executionId as string;

  const { data: execution, isLoading, isError, error, refetch } = useWorkflowExecution(workflowName, executionId);

  // Build step info with both ref and name for log fetching
  const stepInfo = React.useMemo(() => {
    if (!execution?.result?.steps || !execution?.signature) return [];

    // First build the signature map
    const sigMap = new Map<string, { name?: string; category?: string }>();
    const flattenSig = (sigs: any[] | undefined) => {
      if (!sigs) return;
      for (const sig of sigs) {
        if (sig.ref) {
          sigMap.set(sig.ref, { name: sig.name, category: sig.category });
        }
        if (sig.children) flattenSig(sig.children);
      }
    };
    flattenSig(execution.signature);

    // Create array with ref and name
    return Object.keys(execution.result.steps).map(ref => {
      const sig = sigMap.get(ref);
      return {
        ref,
        name: sig?.name || sig?.category || ref,
      };
    });
  }, [execution?.result?.steps, execution?.signature]);

  const status = execution?.result?.status || 'unknown';
  const duration = execution?.result?.duration || '-';
  const isRunning = status === 'running' || status === 'queued';

  // Fetch logs for all steps using step names (with follow=true if running)
  const {
    data: logsByStepMap,
    isLoading: logsLoading,
    isError: logsError,
    error: logsErrorObj,
  } = useWorkflowExecutionLogsByStep(workflowName, executionId, stepInfo, isRunning);

  // Fetch aggregated logs for the whole execution (with follow=true if running)
  const {
    data: aggregatedLogs,
  } = useWorkflowExecutionLogs(workflowName, executionId, isRunning);

  // Build signature map and order list from the signature tree
  const { signatureMap, signatureOrder } = React.useMemo(() => {
    const map = new Map<string, { name?: string; category?: string }>();
    const order: string[] = [];

    const flattenSignature = (signatures: TestWorkflowSignature[] | undefined) => {
      if (!signatures) return;

      for (const sig of signatures) {
        if (sig.ref) {
          map.set(sig.ref, {
            name: sig.name,
            category: sig.category,
          });
          order.push(sig.ref); // Track order
        }
        // Recursively process children (maintains order)
        if (sig.children) {
          flattenSignature(sig.children);
        }
      }
    };

    flattenSignature(execution?.signature);
    console.log('[Execution Page] Signature map built:', Array.from(map.entries()));
    console.log('[Execution Page] Signature order:', order);
    return { signatureMap: map, signatureOrder: order };
  }, [execution?.signature]);

  // Logs are already grouped by step from the API
  const logsByStep = React.useMemo(
    () => logsByStepMap || new Map<string, WorkflowLogEntry[]>(),
    [logsByStepMap]
  );

  // Convert steps Record to Array with proper names from signature, sorted by signature order
  const steps = React.useMemo(() => {
    if (!execution?.result?.steps) return [];

    // Create array of steps with metadata
    const stepsArray = Object.entries(execution.result.steps).map(([ref, stepResult]) => {
      const sigInfo = signatureMap.get(ref);
      return {
        ref,
        name: sigInfo?.name || sigInfo?.category || ref,
        category: sigInfo?.category,
        ...stepResult,
      };
    });

    // Sort by signature order
    stepsArray.sort((a, b) => {
      const indexA = signatureOrder.indexOf(a.ref);
      const indexB = signatureOrder.indexOf(b.ref);

      // If both found in order, sort by index
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only A found, put it first
      if (indexA !== -1) return -1;
      // If only B found, put it first
      if (indexB !== -1) return 1;
      // If neither found, maintain current order
      return 0;
    });

    console.log('[Execution Page] Steps sorted by signature order:', stepsArray.map(s => s.ref));
    return stepsArray;
  }, [execution?.result?.steps, signatureMap, signatureOrder]);

  // Debug logging
  React.useEffect(() => {
    if (execution) {
      console.log('[Execution Page] Execution data:', {
        id: execution.id,
        status: execution.result?.status,
        steps: execution.result?.steps,
        stepsType: typeof execution.result?.steps,
        stepsKeys: execution.result?.steps ? Object.keys(execution.result.steps) : [],
        signature: execution.signature,
        output: execution.output,
      });
    }
  }, [execution]);

  // Debug logs
  React.useEffect(() => {
    console.log('[Execution Page] Logs by step:', {
      stepsWithLogs: Array.from(logsByStep.keys()),
      totalSteps: logsByStep.size,
      executionId,
    });
  }, [logsByStep, executionId]);

  // Auto-refresh execution status every 2 seconds if running
  React.useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      refetch(); // Only refetch execution status, logs have auto-refresh built-in
    }, 2000);
    return () => clearInterval(interval);
  }, [isRunning, refetch]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/workflows/${workflowName}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Execution Not Found</h1>
            <p className="text-muted-foreground mt-1">
              {error instanceof Error ? error.message : 'Could not load execution details'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/workflows/${workflowName}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href={`/workflows/${workflowName}`} className="hover:text-primary">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GitBranch className="h-4 w-4" />
                  <span className="text-sm">{workflowName}</span>
                </div>
              </Link>
            </div>
            <h1 className="text-3xl font-bold font-mono">
              {executionId?.substring(0, 16)}...
            </h1>
            {isRunning && (
              <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                <Clock className="mr-1 h-3 w-3 animate-pulse" />
                Auto-refreshing
              </Badge>
            )}
          </div>
        </div>
        <ExecutionStatusBadge status={status} large />
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Execution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                {execution?.scheduledAt ? (
                  <>
                    <p className="text-sm font-medium">
                      {format(new Date(execution.scheduledAt), 'PPp')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(execution.scheduledAt), { addSuffix: true })}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Unknown</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-2xl font-bold">
                {duration || '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <p className="text-2xl font-bold">{steps.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debug Info for Logs */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-sm text-blue-800">📊 Logs Debug Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs text-blue-700">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-semibold">Workflow:</span>
                <p className="font-mono text-xs break-all">{workflowName}</p>
              </div>
              <div>
                <span className="font-semibold">Execution ID:</span>
                <p className="font-mono text-xs break-all">{executionId}</p>
              </div>
            </div>
            <div>
              <div>
                <span className="font-semibold">Logs API Endpoint:</span>
                <p className="font-mono text-xs break-all">
                  /v1/test-workflows/{workflowName}/executions/{executionId}/logs
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="font-semibold">Loading:</span> {logsLoading ? '🔄 Yes' : '✅ No'}
              </div>
              <div>
                <span className="font-semibold">Error:</span> {logsError ? '❌ Yes' : '✅ No'}
              </div>
              <div>
                <span className="font-semibold">Steps w/ Logs:</span> {logsByStep.size}
              </div>
            </div>
            {logsError && (
              <div className="mt-2 p-2 bg-red-100 rounded border border-red-300">
                <p className="text-red-800 font-semibold">Error Details:</p>
                <p className="text-red-700">{logsErrorObj instanceof Error ? logsErrorObj.message : 'Unknown error'}</p>
              </div>
            )}
            <div>
              <span className="font-semibold">Steps with Logs:</span>
              <p className="font-mono">{Array.from(logsByStep.keys()).join(', ') || 'None'}</p>
            </div>
            <div className="mt-2 p-2 bg-yellow-100 rounded border border-yellow-300">
              <p className="text-yellow-800 text-xs">
                💡 <strong>Check Browser Console (F12)</strong> for detailed log fetch information
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Execution Steps with Expandable Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Execution Steps</CardTitle>
          <CardDescription>
            Step-by-step execution breakdown with logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {steps.length > 0 ? (
            <div className="space-y-2">
              {steps.map((step: any, index: number) => {
                // Get logs for this step
                const stepLogs = logsByStep.get(step.ref) || [];

                // Debug: log what we're passing
                if (index === 0) {
                  console.log('[Execution Page] Mapping first step:', {
                    ref: step.ref,
                    logsCount: stepLogs.length,
                    logsByStepKeys: Array.from(logsByStep.keys()),
                    sampleLog: stepLogs[0],
                  });
                }

                return (
                  <StepCollapsible
                    key={step.ref || index}
                    step={step}
                    index={index}
                    logs={stepLogs}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Terminal className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No step information</p>
              <p className="text-sm mt-1">Step details are not available for this execution</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Aggregated Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aggregated Execution Logs</CardTitle>
              <CardDescription>
                Complete logs from all steps in the workflow execution
              </CardDescription>
            </div>
            {isRunning && aggregatedLogs && aggregatedLogs.length > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Clock className="mr-1 h-3 w-3 animate-pulse" />
                Live Streaming
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {aggregatedLogs && aggregatedLogs.length > 0 ? (
            <div className="bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-[600px] overflow-y-auto">
              {aggregatedLogs.map((log, index) => (
                <div key={index} className="py-0.5">
                  {log.time && (
                    <span className="text-gray-500">
                      [{new Date(log.time).toLocaleTimeString()}]{' '}
                    </span>
                  )}
                  {log.ref && (
                    <span className="text-blue-400">
                      [{log.ref}]{' '}
                    </span>
                  )}
                  <span className={log.error ? 'text-red-400' : 'text-gray-100'}>
                    {log.content || ''}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-950 text-gray-100 p-4 rounded text-xs font-mono">
              <p className="text-gray-400">
                {isRunning
                  ? '# Waiting for aggregated logs...'
                  : '# No aggregated logs available for this execution'}
              </p>
            </div>
          )}
          {aggregatedLogs && aggregatedLogs.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Total log entries: {aggregatedLogs.length}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StepCollapsible({
  step,
  index,
  logs,
}: {
  step: any;
  index: number;
  logs: WorkflowLogEntry[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const status = step.status || 'unknown';
  const hasError = step.errorMessage || (step.exitCode !== undefined && step.exitCode !== 0);
  const isStepRunning = status === 'running' || status === 'queued';

  // Debug logging
  React.useEffect(() => {
    console.log(`[Step ${step.ref}] Received ${logs.length} log entries`);
    if (logs.length > 0) {
      console.log(`[Step ${step.ref}] Sample log:`, logs[0]);
    }
  }, [step.ref, logs]);

  // Calculate duration if we have startedAt and finishedAt
  const duration = React.useMemo(() => {
    if (!step.startedAt || !step.finishedAt) return null;
    const start = new Date(step.startedAt).getTime();
    const finish = new Date(step.finishedAt).getTime();
    const durationMs = finish - start;
    const seconds = Math.floor(durationMs / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }, [step.startedAt, step.finishedAt]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex-shrink-0">
            <StepStatusIcon status={status} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-mono text-xs">
                {index + 1}
              </Badge>
              <p className="font-medium">{step.name || `Step ${index + 1}`}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {duration && <span>Duration: {duration}</span>}
              {step.exitCode !== undefined && (
                <span className={step.exitCode === 0 ? 'text-green-600' : 'text-red-600'}>
                  Exit code: {step.exitCode}
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Badge variant={hasError ? 'destructive' : 'secondary'} className="text-xs">
              {status}
            </Badge>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 ml-11 p-4 bg-gray-50 border rounded-lg space-y-4">
          {/* Step Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">{status}</p>
            </div>
            {step.exitCode !== undefined && (
              <div>
                <p className="text-muted-foreground">Exit Code</p>
                <p className={`font-medium ${step.exitCode === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {step.exitCode}
                </p>
              </div>
            )}
            {step.startedAt && (
              <div>
                <p className="text-muted-foreground">Started</p>
                <p className="font-medium text-xs">
                  {formatDistanceToNow(new Date(step.startedAt), { addSuffix: true })}
                </p>
              </div>
            )}
            {step.finishedAt && (
              <div>
                <p className="text-muted-foreground">Finished</p>
                <p className="font-medium text-xs">
                  {formatDistanceToNow(new Date(step.finishedAt), { addSuffix: true })}
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {step.errorMessage && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Error Message</p>
              <pre className="bg-red-50 text-red-900 p-3 rounded text-xs font-mono overflow-x-auto">
                {step.errorMessage}
              </pre>
            </div>
          )}

          {/* Step Logs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Step Logs</p>
              {isStepRunning && logs.length > 0 && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  <Clock className="mr-1 h-3 w-3 animate-pulse" />
                  Streaming
                </Badge>
              )}
              {logs.length > 0 && (
                <span className="text-xs text-muted-foreground">{logs.length} log entries</span>
              )}
            </div>
            {logs.length > 0 ? (
              <div className="bg-gray-950 text-gray-100 p-3 rounded text-xs font-mono max-h-[400px] overflow-y-auto">
                {logs.map((log, logIndex) => (
                  <div key={logIndex} className="py-0.5">
                    {log.time && (
                      <span className="text-gray-500">
                        [{new Date(log.time).toLocaleTimeString()}]{' '}
                      </span>
                    )}
                    <span className={log.error ? 'text-red-400' : 'text-gray-100'}>
                      {log.content || ''}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-950 text-gray-100 p-3 rounded text-xs font-mono">
                <p className="text-gray-400">
                  {isStepRunning
                    ? '# Waiting for logs...'
                    : '# No logs available for this step'}
                </p>
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ExecutionStatusBadge({ status, large }: { status?: string; large?: boolean }) {
  const statusConfig = {
    passed: { icon: CheckCircle2, className: 'bg-green-500/10 text-green-700 border-green-200' },
    failed: { icon: XCircle, className: 'bg-red-500/10 text-red-700 border-red-200' },
    running: { icon: Clock, className: 'bg-blue-500/10 text-blue-700 border-blue-200' },
    queued: { icon: Clock, className: 'bg-gray-500/10 text-gray-700 border-gray-200' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    icon: AlertCircle,
    className: 'bg-gray-500/10 text-gray-700 border-gray-200',
  };

  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} ${large ? 'text-base px-3 py-1' : ''}`}>
      <Icon className={`mr-1 ${large ? 'h-4 w-4' : 'h-3 w-3'}`} />
      {status || 'unknown'}
    </Badge>
  );
}

function StepStatusIcon({ status }: { status?: string }) {
  if (status === 'passed') {
    return (
      <div className="rounded-full bg-green-500/10 p-2">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div className="rounded-full bg-red-500/10 p-2">
        <XCircle className="h-4 w-4 text-red-600" />
      </div>
    );
  }
  if (status === 'running') {
    return (
      <div className="rounded-full bg-blue-500/10 p-2 animate-pulse">
        <Clock className="h-4 w-4 text-blue-600" />
      </div>
    );
  }
  return (
    <div className="rounded-full bg-gray-500/10 p-2">
      <AlertCircle className="h-4 w-4 text-gray-600" />
    </div>
  );
}

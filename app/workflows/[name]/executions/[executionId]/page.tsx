'use client';

import { useState } from 'react';
import * as React from 'react';
import { useParams } from 'next/navigation';
import { useWorkflowExecution } from '@/lib/hooks/use-workflows';
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

  // Auto-refresh every 3 seconds if execution is running
  React.useEffect(() => {
    const isRunning = execution?.result?.status === 'running' || execution?.result?.status === 'queued';
    if (!isRunning) return;

    const interval = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(interval);
  }, [execution?.result?.status, refetch]);

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

  const status = execution?.result?.status || 'unknown';
  const duration = execution?.result?.duration || 0;
  const steps = Array.isArray(execution?.result?.steps) ? execution.result.steps : [];
  const isRunning = status === 'running' || status === 'queued';

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
              {steps.map((step: any, index: number) => (
                <StepCollapsible
                  key={index}
                  step={step}
                  index={index}
                />
              ))}
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

      {/* Full Output */}
      {execution?.output && (
        <Card>
          <CardHeader>
            <CardTitle>Full Execution Output</CardTitle>
            <CardDescription>
              Complete logs from the workflow execution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-[600px] overflow-y-auto">
              {typeof execution.output === 'string'
                ? execution.output
                : JSON.stringify(execution.output, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StepCollapsible({
  step,
  index,
}: {
  step: any;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const status = step.status || 'unknown';
  const hasError = step.errorMessage || step.exitCode !== 0;

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
              {step.duration && <span>Duration: {step.duration}</span>}
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

          {/* Step Logs Placeholder */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Step Logs</p>
            <div className="bg-gray-950 text-gray-100 p-3 rounded text-xs font-mono">
              <p className="text-gray-400">
                # Logs for step: {step.name || `step-${index + 1}`}
              </p>
              <p className="text-gray-400">
                # Check the Full Execution Output section below for complete logs
              </p>
            </div>
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

'use client';

import { useParams } from 'next/navigation';
import { useWorkflowExecution } from '@/lib/hooks/use-workflows';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  GitBranch,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';

export default function WorkflowExecutionDetailPage() {
  const params = useParams();
  const workflowName = params.name as string;
  const executionId = params.executionId as string;

  const { data: execution, isLoading, isError, error } = useWorkflowExecution(workflowName, executionId);

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
            <p className="text-muted-foreground mt-1">
              Workflow execution details
            </p>
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
                {duration ? `${duration}ms` : '-'}
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

      {/* Tabs */}
      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Steps</CardTitle>
              <CardDescription>
                Step-by-step execution breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              {steps.length > 0 ? (
                <div className="space-y-3">
                  {steps.map((step: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <StepStatusIcon status={step.status} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="font-mono">
                            {index + 1}
                          </Badge>
                          <p className="font-medium">{step.name || `Step ${index + 1}`}</p>
                        </div>
                        {step.duration && (
                          <p className="text-xs text-muted-foreground">
                            Duration: {step.duration}
                          </p>
                        )}
                      </div>
                    </div>
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
        </TabsContent>

        <TabsContent value="output" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Output</CardTitle>
              <CardDescription>
                Logs and output from the workflow execution
              </CardDescription>
            </CardHeader>
            <CardContent>
              {execution?.output ? (
                <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-[600px] overflow-y-auto">
                  {typeof execution.output === 'string'
                    ? execution.output
                    : JSON.stringify(execution.output, null, 2)}
                </pre>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium">No output available</p>
                  <p className="text-sm mt-1">This execution did not produce any output logs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Execution ID</p>
                    <p className="font-mono text-sm mt-1">{executionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Workflow Name</p>
                    <p className="font-medium text-sm mt-1">{workflowName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      <ExecutionStatusBadge status={status} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Namespace</p>
                    <p className="font-medium text-sm mt-1">
                      {execution?.workflow?.namespace || 'default'}
                    </p>
                  </div>
                </div>

                {execution?.signature && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Execution Signature</p>
                    <pre className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                      {JSON.stringify(execution.signature, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
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
      <div className="rounded-full bg-blue-500/10 p-2">
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

'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useWorkflow,
  useWorkflowExecutions,
  useExecuteWorkflow,
  useDeleteWorkflow
} from '@/lib/hooks/use-workflows';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Play,
  Trash2,
  Calendar,
  GitBranch,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function WorkflowDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workflowName = params.name as string;
  const { toast } = useToast();

  const { data: workflow, isLoading: workflowLoading, isError: workflowError } = useWorkflow(workflowName);
  const { data: executionsData, isLoading: executionsLoading } = useWorkflowExecutions(workflowName);
  const executeWorkflow = useExecuteWorkflow(workflowName);
  const deleteWorkflow = useDeleteWorkflow();

  // Handle both array and object responses
  const executions = Array.isArray(executionsData)
    ? executionsData
    : (executionsData as any)?.results || [];

  const handleExecute = async () => {
    try {
      await executeWorkflow.mutateAsync({});
      toast({
        title: 'Workflow started',
        description: `${workflowName} execution has been started.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start workflow execution.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete workflow "${workflowName}"?`)) return;

    try {
      await deleteWorkflow.mutateAsync(workflowName);
      toast({
        title: 'Workflow deleted',
        description: `${workflowName} has been deleted successfully.`,
      });
      router.push('/workflows');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete workflow.',
        variant: 'destructive',
      });
    }
  };

  if (workflowError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/workflows">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Workflow Not Found</h1>
            <p className="text-muted-foreground mt-1">
              The workflow &quot;{workflowName}&quot; could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (workflowLoading) {
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
            <Link href="/workflows">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GitBranch className="h-8 w-8" />
              {workflowName}
            </h1>
            <p className="text-muted-foreground mt-1">
              {workflow?.description || 'No description'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExecute} disabled={executeWorkflow.isPending}>
            <Play className="mr-2 h-4 w-4" />
            Execute
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Workflow Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium">{workflow?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Namespace</span>
              <span className="text-sm font-medium">{workflow?.namespace || 'default'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Steps</span>
              <Badge variant="secondary">
                {workflow?.spec?.steps?.length || 0} steps
              </Badge>
            </div>
            {workflow?.created && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(workflow.created), { addSuffix: true })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Executions</span>
              <span className="text-sm font-medium">{executions.length || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Passed</span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {executions.filter((e: any) => e.result?.status === 'passed').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Failed</span>
              <span className="text-sm font-medium text-red-600 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                {executions.filter((e: any) => e.result?.status === 'failed').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Running</span>
              <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {executions.filter((e: any) => e.result?.status === 'running').length || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Steps */}
      {workflow?.spec?.steps && workflow.spec.steps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Workflow Steps</CardTitle>
            <CardDescription>
              Steps executed in this workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {workflow.spec.steps.map((step: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <Badge variant="outline" className="font-mono">
                    {index + 1}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium">{step.name || `Step ${index + 1}`}</p>
                    {step.template && (
                      <p className="text-xs text-muted-foreground">
                        Template: {step.template.name}
                      </p>
                    )}
                    {step.execute && (
                      <p className="text-xs text-muted-foreground">
                        Execute: {step.execute.tests?.join(', ') || 'Custom action'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Executions</CardTitle>
          <CardDescription>
            Execution history for this workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          {executionsLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : executions && executions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {executions.slice(0, 10).map((execution: any) => (
                  <TableRow
                    key={execution.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => window.location.href = `/workflows/${workflowName}/executions/${execution.id}`}
                  >
                    <TableCell className="font-mono text-sm">
                      <Link
                        href={`/workflows/${workflowName}/executions/${execution.id}`}
                        className="hover:text-primary"
                      >
                        {execution.id?.substring(0, 8) || 'N/A'}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ExecutionStatusBadge status={execution.result?.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {execution.scheduledAt
                        ? formatDistanceToNow(new Date(execution.scheduledAt), {
                            addSuffix: true,
                          })
                        : 'Unknown'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {execution.result?.duration
                        ? `${execution.result.duration}ms`
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No executions yet</p>
              <p className="text-sm mt-1">Execute this workflow to see results here</p>
              <Button className="mt-4" onClick={handleExecute}>
                <Play className="mr-2 h-4 w-4" />
                Execute Workflow
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ExecutionStatusBadge({ status }: { status?: string }) {
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
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {status || 'unknown'}
    </Badge>
  );
}

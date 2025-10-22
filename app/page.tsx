'use client';

import { useWorkflows, useWorkflowExecutions } from '@/lib/hooks/use-workflows';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Workflow, CheckCircle2, XCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import * as React from 'react';

export default function Home() {
  const { data: workflows, refetch: refetchWorkflows } = useWorkflows();

  // Auto-refresh every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetchWorkflows();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchWorkflows]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your workflow executions in real-time
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="mr-1 h-3 w-3" />
          Auto-refreshing
        </Badge>
      </div>

      {/* Workflows with Latest Status */}
      <Card>
        <CardHeader>
          <CardTitle>Workflows</CardTitle>
          <CardDescription>
            Latest execution status for each workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!workflows ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : workflows.length > 0 ? (
            <div className="space-y-3">
              {workflows.map((workflow: any) => (
                <WorkflowStatusCard key={workflow.name} workflow={workflow} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Workflow className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No workflows found</p>
              <p className="text-sm mt-1">Create workflows to see them here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function WorkflowStatusCard({ workflow }: { workflow: any }) {
  const { data: executionsData, refetch } = useWorkflowExecutions(workflow.name);

  // Auto-refresh executions every 3 seconds for this workflow
  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Get executions array
  const executions = React.useMemo(() => {
    if (!executionsData) return [];
    if (Array.isArray(executionsData)) {
      if (executionsData.length > 0 && executionsData[0]?.results) {
        return executionsData.flatMap((resultObj: any) => resultObj.results || []);
      }
      return executionsData;
    }
    if ((executionsData as any)?.results) {
      return (executionsData as any).results;
    }
    return [];
  }, [executionsData]);

  const latestExecution = executions[0];
  const status = latestExecution?.result?.status || 'pending';

  return (
    <Link
      href={`/workflows/${workflow.name}`}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-4 flex-1">
        <ExecutionStatusIcon status={status} large />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{workflow.name}</h3>
            <Badge variant="outline" className="text-xs">
              {workflow.spec?.steps?.length || 0} steps
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {workflow.description || 'No description'}
          </p>
          {latestExecution && (
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-muted-foreground">
                Last run: {formatDistanceToNow(new Date(latestExecution.scheduledAt || Date.now()), { addSuffix: true })}
              </span>
              {latestExecution.result?.duration && (
                <span className="text-xs text-muted-foreground">
                  Duration: {latestExecution.result.duration}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {latestExecution && (
          <Link
            href={`/workflows/${workflow.name}/executions/${latestExecution.id}`}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Link>
        )}
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </Link>
  );
}

function ExecutionStatusIcon({ status, large }: { status?: string; large?: boolean }) {
  const sizeClass = large ? 'h-6 w-6' : 'h-4 w-4';
  const paddingClass = large ? 'p-3' : 'p-2';

  if (status === 'passed') {
    return (
      <div className={`rounded-full bg-green-500/10 ${paddingClass}`}>
        <CheckCircle2 className={`${sizeClass} text-green-600`} />
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div className={`rounded-full bg-red-500/10 ${paddingClass}`}>
        <XCircle className={`${sizeClass} text-red-600`} />
      </div>
    );
  }
  if (status === 'running') {
    return (
      <div className={`rounded-full bg-blue-500/10 ${paddingClass} animate-pulse`}>
        <Clock className={`${sizeClass} text-blue-600`} />
      </div>
    );
  }
  return (
    <div className={`rounded-full bg-gray-500/10 ${paddingClass}`}>
      <AlertCircle className={`${sizeClass} text-gray-600`} />
    </div>
  );
}

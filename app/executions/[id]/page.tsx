'use client';

import { use } from 'react';
import {
  useExecution,
  useExecutionLogs,
  useExecutionArtifacts,
  useAbortExecution,
} from '@/lib/hooks/use-executions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  StopCircle,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow, format } from 'date-fns';

export default function ExecutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: execution, isLoading: executionLoading } = useExecution(id);
  const { data: logs, isLoading: logsLoading } = useExecutionLogs(id);
  const { data: artifacts, isLoading: artifactsLoading } = useExecutionArtifacts(id);
  const abortExecution = useAbortExecution();
  const { toast } = useToast();

  const handleAbort = async () => {
    if (!confirm('Are you sure you want to abort this execution?')) return;

    try {
      await abortExecution.mutateAsync(id);
      toast({
        title: 'Execution aborted',
        description: 'The test execution has been aborted.',
      });
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to abort execution.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'passed':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            Passed
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      case 'running':
      case 'queued':
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3 animate-spin" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  if (executionLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">Execution not found</p>
        <Link href="/executions">
          <Button className="mt-4">Back to Executions</Button>
        </Link>
      </div>
    );
  }

  const status = execution.executionResult?.status;
  const isRunning = status?.toLowerCase() === 'running' || status?.toLowerCase() === 'queued';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/executions">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Execution Details</h1>
            <p className="text-muted-foreground mt-1">
              {execution.testName || 'Unknown Test'}
            </p>
          </div>
        </div>
        {isRunning && (
          <Button variant="destructive" onClick={handleAbort} disabled={abortExecution.isPending}>
            <StopCircle className="mr-2 h-4 w-4" />
            Abort Execution
          </Button>
        )}
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Status</CardTitle>
            {getStatusBadge(status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Execution ID</p>
              <p className="mt-1 font-mono text-sm">{execution.id?.substring(0, 12)}...</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Started</p>
              <p className="mt-1">
                {execution.startTime
                  ? formatDistanceToNow(new Date(execution.startTime), { addSuffix: true })
                  : 'Unknown'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p className="mt-1">{execution.duration || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Namespace</p>
              <p className="mt-1">{execution.testNamespace || 'default'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="artifacts">
            Artifacts
            {artifacts && artifacts.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {artifacts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Execution Logs</CardTitle>
              <CardDescription>Real-time execution output</CardDescription>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <Skeleton className="h-96 w-full" />
              ) : (
                <ScrollArea className="h-96 w-full rounded-md border bg-black p-4">
                  <pre className="text-xs text-green-400 font-mono">
                    {Array.isArray(logs) && logs.length > 0
                      ? logs.map((log: any) => log.content || log.output || '').join('\n')
                      : 'No logs available'}
                  </pre>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts">
          <Card>
            <CardHeader>
              <CardTitle>Artifacts</CardTitle>
              <CardDescription>Files generated during test execution</CardDescription>
            </CardHeader>
            <CardContent>
              {artifactsLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : artifacts && artifacts.length > 0 ? (
                <div className="space-y-2">
                  {artifacts.map((artifact: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{artifact.name || `Artifact ${index + 1}`}</p>
                          <p className="text-xs text-muted-foreground">
                            {artifact.size || 'Unknown size'}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-2 opacity-20" />
                  <p>No artifacts available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Execution Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Test Name</p>
                <Link href={`/tests/${execution.testName}`}>
                  <Button variant="link" className="p-0 h-auto">
                    {execution.testName}
                  </Button>
                </Link>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Test Type</p>
                <p className="mt-1">{execution.testType || 'Unknown'}</p>
              </div>
              {execution.startTime && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                  <p className="mt-1">{format(new Date(execution.startTime), 'PPpp')}</p>
                </div>
              )}
              {execution.endTime && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">End Time</p>
                  <p className="mt-1">{format(new Date(execution.endTime), 'PPpp')}</p>
                </div>
              )}
              {execution.executionResult?.errorMessage && (
                <div>
                  <p className="text-sm font-medium text-destructive">Error Message</p>
                  <pre className="mt-1 p-3 bg-destructive/10 rounded-md text-sm text-destructive">
                    {execution.executionResult.errorMessage}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

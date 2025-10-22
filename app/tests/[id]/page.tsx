'use client';

import { use } from 'react';
import { useTest, useTestExecutions, useExecuteTest } from '@/lib/hooks/use-tests';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export default function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: test, isLoading: testLoading } = useTest(id);
  const { data: executionsData, isLoading: executionsLoading } = useTestExecutions(id);
  const executions = executionsData?.results || [];
  const executeTest = useExecuteTest(id);
  const { toast } = useToast();

  const handleExecute = async () => {
    try {
      await executeTest.mutateAsync({});
      toast({
        title: 'Test started',
        description: 'Test execution has been started.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start test execution.',
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
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Running
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  if (testLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!test) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">Test not found</p>
        <Link href="/tests">
          <Button className="mt-4">Back to Tests</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/tests">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{test.name}</h1>
            <p className="text-muted-foreground mt-1">Test details and execution history</p>
          </div>
        </div>
        <Button onClick={handleExecute} disabled={executeTest.isPending}>
          <Play className="mr-2 h-4 w-4" />
          Execute Test
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <Badge variant="outline" className="mt-1">
                    {test.type || 'Unknown'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Namespace</p>
                  <p className="mt-1">{test.namespace || 'default'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="mt-1">
                    {test.created
                      ? formatDistanceToNow(new Date(test.created), { addSuffix: true })
                      : 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source Type</p>
                  <p className="mt-1">{test.content?.type || 'Unknown'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {test.content?.type === 'git' && (
            <Card>
              <CardHeader>
                <CardTitle>Git Source</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Repository</p>
                  <p className="mt-1 font-mono text-sm">
                    {test.content.repository?.uri || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Branch</p>
                  <p className="mt-1">{test.content.repository?.branch || 'main'}</p>
                </div>
                {test.content.repository?.path && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Path</p>
                    <p className="mt-1 font-mono text-sm">{test.content.repository.path}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="executions">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>Recent test execution results</CardDescription>
            </CardHeader>
            <CardContent>
              {executionsLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : executions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Execution ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Started</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {executions.map((execution: any) => (
                      <TableRow key={execution.id}>
                        <TableCell className="font-mono text-sm">
                          {execution.id?.substring(0, 8)}
                        </TableCell>
                        <TableCell>{getStatusBadge(execution.executionResult?.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {execution.startTime
                            ? formatDistanceToNow(new Date(execution.startTime), {
                                addSuffix: true,
                              })
                            : 'Unknown'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {execution.duration || 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/executions/${execution.id}`}>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No executions yet</p>
                  <p className="text-sm mt-1">Execute this test to see results here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Test Settings</CardTitle>
              <CardDescription>Configuration and advanced options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Test settings management coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

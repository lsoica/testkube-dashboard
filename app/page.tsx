'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTests } from '@/lib/hooks/use-tests';
import { useTestSuites } from '@/lib/hooks/use-test-suites';
import { useExecutions } from '@/lib/hooks/use-executions';
import { FlaskConical, FolderTree, PlayCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export default function DashboardPage() {
  const { data: tests, isLoading: testsLoading } = useTests();
  const { data: testSuites, isLoading: suitesLoading } = useTestSuites();
  const { data: executions, isLoading: executionsLoading } = useExecutions({ pageSize: 10 });

  const executionResults = executions?.results || [];

  const stats = [
    {
      name: 'Total Tests',
      value: tests?.length || 0,
      icon: FlaskConical,
      color: 'text-blue-500',
      loading: testsLoading,
    },
    {
      name: 'Test Suites',
      value: testSuites?.length || 0,
      icon: FolderTree,
      color: 'text-purple-500',
      loading: suitesLoading,
    },
    {
      name: 'Recent Executions',
      value: executionResults.length,
      icon: PlayCircle,
      color: 'text-green-500',
      loading: executionsLoading,
    },
  ];

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'passed':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" />Passed</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Failed</Badge>;
      case 'running':
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Running</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your Testkube dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {stat.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Executions</CardTitle>
          <CardDescription>Latest test execution results</CardDescription>
        </CardHeader>
        <CardContent>
          {executionsLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : executionResults.length > 0 ? (
            <div className="space-y-2">
              {executionResults.map((execution: any) => (
                <Link
                  key={execution.id}
                  href={`/executions/${execution.id}`}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{execution.testName || execution.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {execution.startTime
                          ? formatDistanceToNow(new Date(execution.startTime), { addSuffix: true })
                          : 'Just now'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(execution.executionResult?.status)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <PlayCircle className="mx-auto h-12 w-12 mb-2 opacity-20" />
              <p>No executions yet</p>
              <p className="text-sm mt-1">Run a test to see execution results here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/tests"
              className="flex items-center gap-2 rounded-lg border p-3 hover:bg-gray-50 transition-colors"
            >
              <FlaskConical className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Create New Test</span>
            </Link>
            <Link
              href="/test-suites"
              className="flex items-center gap-2 rounded-lg border p-3 hover:bg-gray-50 transition-colors"
            >
              <FolderTree className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Create Test Suite</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Agent Status</span>
                <Badge className="bg-green-500">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Version</span>
                <span className="text-sm text-muted-foreground">v1.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

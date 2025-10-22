'use client';

import { useState } from 'react';
import { useWorkflowExecutionsList } from '@/lib/hooks/use-workflows';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Search,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function WorkflowExecutionsPage() {
  const [search, setSearch] = useState('');
  const { data: executionsData, isLoading, error, isError } = useWorkflowExecutionsList(100);

  // Handle both array and object responses
  const executions = Array.isArray(executionsData)
    ? executionsData
    : (executionsData as any)?.results || [];

  const filteredExecutions = executions.filter((execution: any) =>
    execution.workflow?.name?.toLowerCase().includes(search.toLowerCase()) ||
    execution.id?.toLowerCase().includes(search.toLowerCase())
  );

  // Count by status
  const totals = {
    total: executions.length,
    passed: executions.filter((e: any) => e.result?.status === 'passed').length,
    failed: executions.filter((e: any) => e.result?.status === 'failed').length,
    running: executions.filter((e: any) => e.result?.status === 'running').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workflow Executions</h1>
        <p className="text-muted-foreground mt-1">
          Monitor all workflow execution runs across your system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totals.passed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totals.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totals.running}</div>
          </CardContent>
        </Card>
      </div>

      {/* Executions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Workflow Executions</CardTitle>
              <CardDescription>
                {filteredExecutions.length} execution{filteredExecutions.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by workflow or ID..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-lg font-medium text-red-900">Failed to load executions</p>
              <p className="text-sm text-red-600 mt-1">
                {error instanceof Error ? error.message : 'Could not connect to Testkube agent'}
              </p>
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredExecutions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Execution ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExecutions.map((execution: any) => (
                  <TableRow key={execution.id}>
                    <TableCell>
                      <Link
                        href={`/workflows/${execution.workflow?.name}`}
                        className="flex items-center gap-2 font-medium hover:text-primary"
                      >
                        <Workflow className="h-4 w-4" />
                        {execution.workflow?.name || 'Unknown'}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/workflows/${execution.workflow?.name}/executions/${execution.id}`}
                        className="font-mono text-sm hover:text-primary"
                      >
                        {execution.id?.substring(0, 12) || 'N/A'}...
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
              <PlayCircle className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No executions found</p>
              <p className="text-sm mt-1">
                {search ? 'Try a different search term' : 'Execute some workflows to see results here'}
              </p>
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

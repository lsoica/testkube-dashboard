'use client';

import { useState } from 'react';
import { useExecutions } from '@/lib/hooks/use-executions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayCircle, Search, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function ExecutionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pageSize] = useState(20);

  const { data: executionsData, isLoading } = useExecutions({
    pageSize,
    statusFilter: statusFilter === 'all' ? undefined : statusFilter,
  });

  const executions = executionsData?.results || [];

  const filteredExecutions = executions.filter((execution: any) =>
    execution.testName?.toLowerCase().includes(search.toLowerCase())
  );

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

  const getStatusStats = () => {
    const results = executions;
    const stats = {
      total: results.length,
      passed: 0,
      failed: 0,
      running: 0,
    };

    results.forEach((execution: any) => {
      const status = execution.executionResult?.status?.toLowerCase();
      if (status === 'passed') stats.passed++;
      else if (status === 'failed') stats.failed++;
      else if (status === 'running' || status === 'queued') stats.running++;
    });

    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Executions</h1>
        <p className="text-muted-foreground mt-1">Monitor test execution results</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.running}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>All Executions</CardTitle>
              <CardDescription>
                {filteredExecutions.length} execution{filteredExecutions.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by test name..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredExecutions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Execution ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExecutions.map((execution: any) => (
                  <TableRow key={execution.id}>
                    <TableCell>
                      <Link
                        href={`/tests/${execution.testName}`}
                        className="font-medium hover:text-primary"
                      >
                        {execution.testName || 'Unknown Test'}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {execution.id?.substring(0, 12)}...
                    </TableCell>
                    <TableCell>{getStatusBadge(execution.executionResult?.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {execution.startTime
                        ? formatDistanceToNow(new Date(execution.startTime), { addSuffix: true })
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
            <div className="text-center py-12 text-muted-foreground">
              <PlayCircle className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No executions found</p>
              <p className="text-sm mt-1">
                {search || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Execute a test to see results here'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

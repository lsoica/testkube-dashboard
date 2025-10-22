'use client';

import { useState } from 'react';
import { useTestSuites, useDeleteTestSuite, useExecuteTestSuite } from '@/lib/hooks/use-test-suites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderTree, MoreVertical, Play, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { CreateTestSuiteDialog } from '@/components/forms/create-test-suite-dialog';

export default function TestSuitesPage() {
  const [search, setSearch] = useState('');
  const { data: testSuites, isLoading } = useTestSuites();
  const deleteTestSuite = useDeleteTestSuite();
  const { toast } = useToast();

  const filteredTestSuites = testSuites?.filter((suite: any) =>
    suite.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteTestSuite.mutateAsync(id);
      toast({
        title: 'Test suite deleted',
        description: `${name} has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete test suite.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Suites</h1>
          <p className="text-muted-foreground mt-1">
            Manage collections of tests
          </p>
        </div>
        <CreateTestSuiteDialog />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Test Suites</CardTitle>
              <CardDescription>
                {filteredTestSuites?.length || 0} test suite{filteredTestSuites?.length !== 1 ? 's' : ''} total
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search test suites..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredTestSuites && filteredTestSuites.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestSuites.map((suite: any) => (
                  <TableRow key={suite.name}>
                    <TableCell>
                      <Link
                        href={`/test-suites/${suite.name}`}
                        className="flex items-center gap-2 font-medium hover:text-primary"
                      >
                        <FolderTree className="h-4 w-4" />
                        {suite.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {suite.steps?.length || 0} tests
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-md truncate">
                      {suite.description || 'No description'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {suite.created
                        ? formatDistanceToNow(new Date(suite.created), { addSuffix: true })
                        : 'Unknown'}
                    </TableCell>
                    <TableCell className="text-right">
                      <TestSuiteActionsMenu
                        suiteId={suite.name}
                        suiteName={suite.name}
                        onDelete={() => handleDelete(suite.name, suite.name)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FolderTree className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No test suites found</p>
              <p className="text-sm mt-1">Create your first test suite to get started</p>
              <div className="mt-4">
                <CreateTestSuiteDialog />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TestSuiteActionsMenu({
  suiteId,
  suiteName,
  onDelete,
}: {
  suiteId: string;
  suiteName: string;
  onDelete: () => void;
}) {
  const executeTestSuite = useExecuteTestSuite(suiteId);
  const { toast } = useToast();

  const handleExecute = async () => {
    try {
      await executeTestSuite.mutateAsync({});
      toast({
        title: 'Test suite started',
        description: `${suiteName} execution has been started.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start test suite execution.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExecute} disabled={executeTestSuite.isPending}>
          <Play className="mr-2 h-4 w-4" />
          Execute
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/test-suites/${suiteId}`}>View Details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

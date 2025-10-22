'use client';

import { useState } from 'react';
import { useTests, useDeleteTest, useExecuteTest } from '@/lib/hooks/use-tests';
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
import {
  FlaskConical,
  MoreVertical,
  Play,
  Trash2,
  Search,
  FileText,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { CreateTestDialog } from '@/components/forms/create-test-dialog';

export default function TestsPage() {
  const [search, setSearch] = useState('');
  const { data: tests, isLoading } = useTests();
  const deleteTest = useDeleteTest();
  const { toast } = useToast();

  const filteredTests = tests?.filter((test: any) =>
    test.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteTest.mutateAsync(id);
      toast({
        title: 'Test deleted',
        description: `${name} has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete test. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tests</h1>
          <p className="text-muted-foreground mt-1">
            Manage your test definitions
          </p>
        </div>
        <CreateTestDialog />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Tests</CardTitle>
              <CardDescription>
                {filteredTests?.length || 0} test{filteredTests?.length !== 1 ? 's' : ''} total
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
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
          ) : filteredTests && filteredTests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test: any) => (
                  <TableRow key={test.name}>
                    <TableCell>
                      <Link
                        href={`/tests/${test.name}`}
                        className="flex items-center gap-2 font-medium hover:text-primary"
                      >
                        <FlaskConical className="h-4 w-4" />
                        {test.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{test.type || 'Unknown'}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {test.content?.type === 'git' ? (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Git
                        </span>
                      ) : test.content?.type === 'string' ? (
                        'Inline'
                      ) : (
                        'File'
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {test.created
                        ? formatDistanceToNow(new Date(test.created), { addSuffix: true })
                        : 'Unknown'}
                    </TableCell>
                    <TableCell className="text-right">
                      <TestActionsMenu
                        testId={test.name}
                        testName={test.name}
                        onDelete={() => handleDelete(test.name, test.name)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FlaskConical className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No tests found</p>
              <p className="text-sm mt-1">Create your first test to get started</p>
              <div className="mt-4">
                <CreateTestDialog />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TestActionsMenu({
  testId,
  testName,
  onDelete,
}: {
  testId: string;
  testName: string;
  onDelete: () => void;
}) {
  const executeTest = useExecuteTest(testId);
  const { toast } = useToast();

  const handleExecute = async () => {
    try {
      await executeTest.mutateAsync({});
      toast({
        title: 'Test started',
        description: `${testName} execution has been started.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start test execution.',
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
        <DropdownMenuItem onClick={handleExecute} disabled={executeTest.isPending}>
          <Play className="mr-2 h-4 w-4" />
          Execute
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/tests/${testId}`}>View Details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

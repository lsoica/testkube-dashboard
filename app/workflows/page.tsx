'use client';

import { useState } from 'react';
import { useWorkflows, useDeleteWorkflow, useExecuteWorkflow } from '@/lib/hooks/use-workflows';
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
import { Workflow, MoreVertical, Play, Trash2, Search, GitBranch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function WorkflowsPage() {
  const [search, setSearch] = useState('');
  const { data: workflows, isLoading, error, isError } = useWorkflows();
  const deleteWorkflow = useDeleteWorkflow();
  const { toast } = useToast();

  const filteredWorkflows = workflows?.filter((workflow: any) =>
    workflow.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (name: string) => {
    if (!confirm(`Are you sure you want to delete workflow "${name}"?`)) return;

    try {
      await deleteWorkflow.mutateAsync(name);
      toast({
        title: 'Workflow deleted',
        description: `${name} has been deleted successfully.`,
      });
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to delete workflow. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Advanced test orchestration and automation
          </p>
        </div>
        <Button>
          <GitBranch className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Workflows</CardTitle>
              <CardDescription>
                {filteredWorkflows?.length || 0} workflow{filteredWorkflows?.length !== 1 ? 's' : ''} total
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workflows..."
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
                <Workflow className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-lg font-medium text-red-900">Failed to load workflows</p>
              <p className="text-sm text-red-600 mt-1">
                {error instanceof Error ? error.message : 'Could not connect to Testkube agent'}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Check your API URL in Settings and ensure the agent is running
              </p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/settings'}>
                Go to Settings
              </Button>
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredWorkflows && filteredWorkflows.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Steps</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkflows.map((workflow: any) => (
                  <TableRow key={workflow.name}>
                    <TableCell>
                      <Link
                        href={`/workflows/${workflow.name}`}
                        className="flex items-center gap-2 font-medium hover:text-primary"
                      >
                        <Workflow className="h-4 w-4" />
                        {workflow.name}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                      {workflow.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {workflow.spec?.steps?.length || 0} steps
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {workflow.created
                        ? formatDistanceToNow(new Date(workflow.created), { addSuffix: true })
                        : 'Unknown'}
                    </TableCell>
                    <TableCell className="text-right">
                      <WorkflowActionsMenu
                        workflowName={workflow.name}
                        onDelete={() => handleDelete(workflow.name)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Workflow className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No workflows found</p>
              <p className="text-sm mt-1">Create your first workflow for advanced test orchestration</p>
              <Button className="mt-4">
                <GitBranch className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">About Test Workflows</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800">
          <p>
            Test Workflows provide advanced orchestration capabilities beyond simple test execution:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
            <li>Define complex multi-step test scenarios</li>
            <li>Set up service dependencies and configurations</li>
            <li>Use templates and parameterization</li>
            <li>Parallel execution and matrix testing (requires Control Plane)</li>
            <li>Advanced artifact management</li>
          </ul>
          <p className="mt-3">
            <strong>Note:</strong> Some advanced features require connection to a Testkube Control Plane.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function WorkflowActionsMenu({
  workflowName,
  onDelete,
}: {
  workflowName: string;
  onDelete: () => void;
}) {
  const executeWorkflow = useExecuteWorkflow(workflowName);
  const { toast } = useToast();

  const handleExecute = async () => {
    try {
      await executeWorkflow.mutateAsync({});
      toast({
        title: 'Workflow started',
        description: `${workflowName} execution has been started.`,
      });
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to start workflow execution.',
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
        <DropdownMenuItem onClick={handleExecute} disabled={executeWorkflow.isPending}>
          <Play className="mr-2 h-4 w-4" />
          Execute
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/workflows/${workflowName}`}>View Details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

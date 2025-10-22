'use client';

import { useState } from 'react';
import { useWorkflowTemplates, useDeleteWorkflowTemplate } from '@/lib/hooks/use-workflow-templates';
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
import { FileCode, MoreVertical, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export default function WorkflowTemplatesPage() {
  const [search, setSearch] = useState('');
  const { data: templates, isLoading, error, isError } = useWorkflowTemplates();
  const deleteTemplate = useDeleteWorkflowTemplate();
  const { toast } = useToast();

  const filteredTemplates = templates?.filter((template: any) =>
    template.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (name: string) => {
    if (!confirm(`Are you sure you want to delete template "${name}"?`)) return;

    try {
      await deleteTemplate.mutateAsync(name);
      toast({
        title: 'Template deleted',
        description: `${name} has been deleted successfully.`,
      });
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to delete template. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Templates</h1>
          <p className="text-muted-foreground mt-1">
            Reusable workflow templates for test orchestration
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Templates</CardTitle>
              <CardDescription>
                {filteredTemplates?.length || 0} template{filteredTemplates?.length !== 1 ? 's' : ''} total
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
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
                <FileCode className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-lg font-medium text-red-900">Failed to load templates</p>
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
          ) : filteredTemplates && filteredTemplates.length > 0 ? (
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
                {filteredTemplates.map((template: any) => (
                  <TableRow key={template.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate text-sm text-muted-foreground">
                      {template.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {template.spec?.steps?.length || 0} steps
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {template.created
                        ? formatDistanceToNow(new Date(template.created), { addSuffix: true })
                        : 'Unknown'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(template.name)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileCode className="mx-auto h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-sm mt-1">Create workflow templates to reuse common patterns</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">About Workflow Templates</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800">
          <p>
            Workflow Templates allow you to define reusable workflow patterns that can be referenced by multiple workflows:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
            <li>Define common test patterns once, use them everywhere</li>
            <li>Maintain consistency across workflows</li>
            <li>Support parameterization and customization</li>
            <li>Reduce duplication and improve maintainability</li>
          </ul>
          <p className="mt-3">
            <strong>Note:</strong> Templates are referenced in workflows using the <code className="bg-blue-100 px-1 rounded">template</code> field.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

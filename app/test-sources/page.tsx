'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCode, Plus } from 'lucide-react';

export default function TestSourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Sources</h1>
          <p className="text-muted-foreground mt-1">
            Manage Git repositories and test sources
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Test Source
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Test Sources</CardTitle>
          <CardDescription>Git repositories containing test definitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <FileCode className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No test sources configured</p>
            <p className="text-sm mt-1">Connect a Git repository to store test definitions</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Test Source
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

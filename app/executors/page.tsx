'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cog, Plus } from 'lucide-react';

export default function ExecutorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Executors</h1>
          <p className="text-muted-foreground mt-1">
            Manage test executors and runners
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Executor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Executors</CardTitle>
          <CardDescription>Test execution engines and runners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Cog className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No executors configured</p>
            <p className="text-sm mt-1">Add an executor to run different test types</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Executor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

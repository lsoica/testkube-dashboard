'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Plus } from 'lucide-react';

export default function TriggersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Triggers</h1>
          <p className="text-muted-foreground mt-1">
            Configure event-based test triggers
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Trigger
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Triggers</CardTitle>
          <CardDescription>Automated test execution based on events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Zap className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No triggers configured</p>
            <p className="text-sm mt-1">Create a trigger to automate test execution</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create Trigger
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

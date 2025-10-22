'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Webhook, Plus } from 'lucide-react';

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhooks</h1>
          <p className="text-muted-foreground mt-1">
            Configure webhooks for test events
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Webhook
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Webhooks</CardTitle>
          <CardDescription>HTTP callbacks triggered by test events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Webhook className="mx-auto h-12 w-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No webhooks configured</p>
            <p className="text-sm mt-1">Create a webhook to receive notifications</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create Webhook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

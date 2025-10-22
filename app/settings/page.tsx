'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getAPIBaseUrl, setAPIBaseUrl } from '@/lib/api/config';
import { Settings as SettingsIcon, Save, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setApiUrl(getAPIBaseUrl());
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    try {
      setAPIBaseUrl(apiUrl);
      toast({
        title: 'Settings saved',
        description: 'API configuration has been updated. Refresh the page to apply changes.',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive',
      });
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const defaultUrl = process.env.NEXT_PUBLIC_AGENT_URL || 'http://localhost:8088/v1';
    setApiUrl(defaultUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your dashboard preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            <CardTitle>Testkube Agent Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure the connection to your Testkube standalone agent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiUrl">Agent API URL</Label>
            <Input
              id="apiUrl"
              placeholder="http://localhost:8088/v1"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The base URL of your Testkube agent API (e.g., http://localhost:8088/v1 or http://testkube.example.com)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleSave} disabled={isSaving || !apiUrl}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Current Configuration</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Agent URL</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {getAPIBaseUrl()}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Proxy</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  /api/proxy
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connection Status</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                  Connected
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dashboard Version</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Framework</span>
            <span className="text-sm font-medium">Next.js 14</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">License</span>
            <span className="text-sm font-medium">MIT</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

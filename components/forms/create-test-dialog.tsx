'use client';

import { useState } from 'react';
import { useCreateTest } from '@/lib/hooks/use-tests';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

export function CreateTestDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [namespace, setNamespace] = useState('testkube');
  const [type, setType] = useState('postman/collection');
  const [contentType, setContentType] = useState('git');
  const [gitUri, setGitUri] = useState('');
  const [gitBranch, setGitBranch] = useState('main');
  const [gitPath, setGitPath] = useState('');
  const [stringContent, setStringContent] = useState('');

  const createTest = useCreateTest();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast({
        title: 'Error',
        description: 'Test name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      const testData: any = {
        name,
        namespace,
        type,
      };

      if (contentType === 'git') {
        if (!gitUri) {
          toast({
            title: 'Error',
            description: 'Git repository URI is required',
            variant: 'destructive',
          });
          return;
        }
        testData.content = {
          type: 'git',
          repository: {
            type: 'git',
            uri: gitUri,
            branch: gitBranch || 'main',
            path: gitPath || '',
          },
        };
      } else {
        testData.content = {
          type: 'string',
          data: stringContent,
        };
      }

      await createTest.mutateAsync(testData);

      toast({
        title: 'Success',
        description: `Test "${name}" created successfully`,
      });

      setOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create test. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setName('');
    setNamespace('testkube');
    setType('postman/collection');
    setContentType('git');
    setGitUri('');
    setGitBranch('main');
    setGitPath('');
    setStringContent('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Test
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Test</DialogTitle>
          <DialogDescription>
            Define a new test to run in your Kubernetes cluster
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Test Name *</Label>
              <Input
                id="name"
                placeholder="my-api-test"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="namespace">Namespace</Label>
              <Input
                id="namespace"
                placeholder="testkube"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Test Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postman/collection">Postman Collection</SelectItem>
                  <SelectItem value="curl/test">cURL Test</SelectItem>
                  <SelectItem value="k6/script">K6 Script</SelectItem>
                  <SelectItem value="artillery/test">Artillery Test</SelectItem>
                  <SelectItem value="playwright/test">Playwright Test</SelectItem>
                  <SelectItem value="cypress/project">Cypress Project</SelectItem>
                  <SelectItem value="maven/project">Maven Project</SelectItem>
                  <SelectItem value="gradle/project">Gradle Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Content Source</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="git">Git Repository</SelectItem>
                  <SelectItem value="string">Inline Content</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {contentType === 'git' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="gitUri">Git Repository URI *</Label>
                  <Input
                    id="gitUri"
                    placeholder="https://github.com/user/repo.git"
                    value={gitUri}
                    onChange={(e) => setGitUri(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gitBranch">Branch</Label>
                    <Input
                      id="gitBranch"
                      placeholder="main"
                      value={gitBranch}
                      onChange={(e) => setGitBranch(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gitPath">Path</Label>
                    <Input
                      id="gitPath"
                      placeholder="tests/api.json"
                      value={gitPath}
                      onChange={(e) => setGitPath(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="content">Test Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your test content here..."
                  value={stringContent}
                  onChange={(e) => setStringContent(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createTest.isPending}>
              {createTest.isPending ? 'Creating...' : 'Create Test'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

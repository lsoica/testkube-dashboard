'use client';

import { useState } from 'react';
import { useCreateTestSuite } from '@/lib/hooks/use-test-suites';
import { useTests } from '@/lib/hooks/use-tests';
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
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function CreateTestSuiteDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [namespace, setNamespace] = useState('testkube');
  const [description, setDescription] = useState('');
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const { data: availableTests } = useTests();
  const createTestSuite = useCreateTestSuite();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast({
        title: 'Error',
        description: 'Test suite name is required',
        variant: 'destructive',
      });
      return;
    }

    if (selectedTests.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one test',
        variant: 'destructive',
      });
      return;
    }

    try {
      const suiteData: any = {
        name,
        namespace,
        description,
        steps: selectedTests.map((testName) => ({
          test: testName,
        })),
      };

      await createTestSuite.mutateAsync(suiteData);

      toast({
        title: 'Success',
        description: `Test suite "${name}" created successfully`,
      });

      setOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create test suite. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setName('');
    setNamespace('testkube');
    setDescription('');
    setSelectedTests([]);
  };

  const addTest = (testName: string) => {
    if (!selectedTests.includes(testName)) {
      setSelectedTests([...selectedTests, testName]);
    }
  };

  const removeTest = (testName: string) => {
    setSelectedTests(selectedTests.filter((t) => t !== testName));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Test Suite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Test Suite</DialogTitle>
          <DialogDescription>
            Group multiple tests into a test suite for sequential execution
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Suite Name *</Label>
              <Input
                id="name"
                placeholder="my-api-test-suite"
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this test suite does..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Tests in Suite *</Label>
              {selectedTests.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[60px]">
                  {selectedTests.map((testName, index) => (
                    <Badge key={testName} variant="secondary" className="gap-1">
                      {index + 1}. {testName}
                      <button
                        type="button"
                        onClick={() => removeTest(testName)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <Select onValueChange={addTest}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tests to add..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTests && availableTests.length > 0 ? (
                    availableTests
                      .filter((test: any) => !selectedTests.includes(test.name))
                      .map((test: any) => (
                        <SelectItem key={test.name} value={test.name}>
                          {test.name} ({test.type})
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem value="_none" disabled>
                      No tests available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Tests will be executed in the order shown above
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createTestSuite.isPending}>
              {createTestSuite.isPending ? 'Creating...' : 'Create Test Suite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

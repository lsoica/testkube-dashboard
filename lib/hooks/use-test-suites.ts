import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../api/generated';
import type { TestSuiteUpsertRequest } from '../api/generated';

export function useTestSuites(selector?: string) {
  return useQuery({
    queryKey: ['test-suites', selector],
    queryFn: () => DefaultService.listTestSuites('testkube', selector),
  });
}

export function useTestSuite(id: string) {
  return useQuery({
    queryKey: ['test-suites', id],
    queryFn: () => DefaultService.getTestSuiteById(id),
    enabled: !!id,
  });
}

export function useCreateTestSuite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TestSuiteUpsertRequest) =>
      DefaultService.createTestSuite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-suites'] });
    },
  });
}

export function useDeleteTestSuite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DefaultService.deleteTestSuite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-suites'] });
    },
  });
}

export function useExecuteTestSuite(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => DefaultService.executeTestSuite(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-suite-executions'] });
    },
  });
}

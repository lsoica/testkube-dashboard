import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../api/generated';
import type { TestUpsertRequest } from '../api/generated';

export function useTests(selector?: string) {
  return useQuery({
    queryKey: ['tests', selector],
    queryFn: () => DefaultService.listTests('testkube', selector),
  });
}

export function useTest(id: string) {
  return useQuery({
    queryKey: ['tests', id],
    queryFn: () => DefaultService.getTest(id),
    enabled: !!id,
  });
}

export function useCreateTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TestUpsertRequest) => DefaultService.createTest(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

export function useUpdateTest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TestUpsertRequest) => DefaultService.updateTest(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
      queryClient.invalidateQueries({ queryKey: ['tests', id] });
    },
  });
}

export function useDeleteTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DefaultService.deleteTest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

export function useTestExecutions(id: string) {
  return useQuery({
    queryKey: ['tests', id, 'executions'],
    queryFn: () => DefaultService.listTestExecutions(id),
    enabled: !!id,
  });
}

export function useExecuteTest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => DefaultService.executeTest(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests', id, 'executions'] });
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
  });
}

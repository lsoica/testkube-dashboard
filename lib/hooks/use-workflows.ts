import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../api/generated';

export function useWorkflows(selector?: string) {
  return useQuery({
    queryKey: ['workflows', selector],
    queryFn: async () => {
      console.log('[Testkube] Fetching workflows with selector:', selector);
      try {
        const result = await DefaultService.listTestWorkflows(selector);
        console.log('[Testkube] Workflows fetched successfully:', result?.length || 0, 'workflows');
        return result;
      } catch (error) {
        console.error('[Testkube] Failed to fetch workflows:', error);
        throw error;
      }
    },
  });
}

export function useWorkflow(name: string) {
  return useQuery({
    queryKey: ['workflows', name],
    queryFn: () => DefaultService.getTestWorkflow(name),
    enabled: !!name,
  });
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => DefaultService.createTestWorkflow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useDeleteWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => DefaultService.deleteTestWorkflow(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useExecuteWorkflow(name: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => DefaultService.executeTestWorkflow(name, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-executions'] });
    },
  });
}

export function useWorkflowExecutions(name: string) {
  return useQuery({
    queryKey: ['workflows', name, 'executions'],
    queryFn: () => DefaultService.listTestWorkflowExecutionsByTestWorkflow(name),
    enabled: !!name,
  });
}

export function useWorkflowExecution(workflowName: string, executionId: string) {
  return useQuery({
    queryKey: ['workflow-executions', workflowName, executionId],
    queryFn: () => DefaultService.getTestWorkflowExecutionByTestWorkflow(workflowName, executionId),
    enabled: !!workflowName && !!executionId,
  });
}

export function useWorkflowExecutionsList(pageSize = 100) {
  return useQuery({
    queryKey: ['workflow-executions', pageSize],
    queryFn: () => DefaultService.listTestWorkflowExecutions('', pageSize.toString()),
  });
}

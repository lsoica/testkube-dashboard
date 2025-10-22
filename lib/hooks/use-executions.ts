import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../api/generated';

export function useExecutions(options?: {
  selector?: string;
  pageSize?: number;
  pageIndex?: number;
  statusFilter?: string;
}) {
  return useQuery({
    queryKey: ['executions', options],
    queryFn: () => DefaultService.listExecutions(
      '',
      '',
      '',
      options?.pageSize || 100,
      options?.pageIndex,
      undefined,
      undefined,
      undefined,
      options?.selector
    ),
  });
}

export function useExecution(id: string) {
  return useQuery({
    queryKey: ['executions', id],
    queryFn: () => DefaultService.getExecutionById(id),
    enabled: !!id,
  });
}

export function useExecutionLogs(id: string) {
  return useQuery({
    queryKey: ['executions', id, 'logs'],
    queryFn: () => DefaultService.getExecutionLogsV2(id),
    enabled: !!id,
    refetchInterval: (data) => {
      // Poll every 3 seconds if execution is still running
      if (data && typeof data === 'object' && 'executionResult' in data) {
        const executionData = data as Record<string, unknown>;
        const result = executionData.executionResult as Record<string, unknown> | undefined;
        const status = result?.status as string | undefined;
        return status === 'running' || status === 'queued' ? 3000 : false;
      }
      return false;
    },
  });
}

export function useExecutionArtifacts(id: string) {
  return useQuery({
    queryKey: ['executions', id, 'artifacts'],
    queryFn: () => DefaultService.getExecutionArtifacts(id),
    enabled: !!id,
  });
}

export function useAbortExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (executionId: string) =>
      DefaultService.abortExecution('', executionId),
    onSuccess: (_, executionId) => {
      queryClient.invalidateQueries({ queryKey: ['executions', executionId] });
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
  });
}

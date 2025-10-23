import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../api/generated';
import { getWorkflowExecutionLogs, getWorkflowExecutionLogsByStep, type WorkflowLogEntry, type StepInfo } from '../api/workflow-logs';

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
    queryFn: async () => {
      console.log('[Testkube] Fetching execution:', { workflowName, executionId });
      try {
        const result = await DefaultService.getTestWorkflowExecutionByTestWorkflow(workflowName, executionId);
        console.log('[Testkube] Execution data received:', JSON.stringify(result, null, 2));
        return result;
      } catch (error) {
        console.error('[Testkube] Failed to fetch execution:', error);
        throw error;
      }
    },
    enabled: !!workflowName && !!executionId,
  });
}

export function useWorkflowExecutionsList(pageSize = 100) {
  return useQuery({
    queryKey: ['workflow-executions-list', pageSize],
    queryFn: async () => {
      console.log('[Testkube] Fetching all workflow executions');
      try {
        // The API requires an id but for getting all executions we pass empty string
        // The second parameter is tagSelector, not pageSize
        const result = await DefaultService.listTestWorkflowExecutions('');
        console.log('[Testkube] Workflow executions response:', result);
        return result;
      } catch (error) {
        console.error('[Testkube] Failed to fetch workflow executions:', error);
        throw error;
      }
    },
  });
}

export function useWorkflowExecutionLogs(
  workflowName: string,
  executionId: string,
  isRunning: boolean = false,
  enabled = true
) {
  return useQuery({
    queryKey: ['workflow-execution-logs', workflowName, executionId],
    queryFn: async () => {
      console.log('[Testkube] Fetching workflow execution logs');
      console.log('[Testkube] Workflow:', workflowName, 'Execution:', executionId, 'Running:', isRunning);

      try {
        const result = await getWorkflowExecutionLogs({
          workflowName,
          executionId,
          follow: false, // Don't use follow - just poll regularly instead
        });
        console.log('[Testkube] ✅ Logs fetch SUCCESS! Count:', result?.length || 0);
        if (result && result.length > 0) {
          console.log('[Testkube] Sample log entries:', result.slice(0, 3));
        }
        return result;
      } catch (error: any) {
        console.error('[Testkube] ❌ Logs fetch FAILED!');
        console.error('[Testkube] Error:', error?.message || error);
        // Return empty array instead of throwing, so the UI doesn't break
        return [];
      }
    },
    enabled: !!workflowName && !!executionId && enabled,
    refetchInterval: isRunning ? 1500 : false, // Poll every 1.5s for running executions (faster polling instead of streaming)
    retry: false, // Don't retry failed log requests
  });
}

export function useWorkflowExecutionLogsByStep(
  workflowName: string,
  executionId: string,
  steps: StepInfo[],
  isRunning: boolean = false,
  enabled = true
) {
  return useQuery({
    queryKey: ['workflow-execution-logs-by-step', workflowName, executionId, steps],
    queryFn: async () => {
      console.log('[Testkube] Fetching logs for', steps.length, 'steps', isRunning ? '(POLLING)' : '(STATIC)');
      console.log('[Testkube] Steps:', steps.map(s => `${s.ref} (${s.name})`));

      try {
        const result = await getWorkflowExecutionLogsByStep(workflowName, executionId, steps, false); // Never use follow, just poll
        console.log('[Testkube] ✅ Step logs fetch SUCCESS!');
        console.log('[Testkube] Steps with logs:', Array.from(result.keys()));

        // Debug: show log counts
        const counts: Record<string, number> = {};
        result.forEach((logs, ref) => {
          counts[ref] = logs.length;
        });
        console.log('[Testkube] Log counts by step:', counts);

        return result;
      } catch (error: any) {
        console.error('[Testkube] ❌ Step logs fetch FAILED!');
        console.error('[Testkube] Error:', error?.message || error);
        return new Map<string, WorkflowLogEntry[]>();
      }
    },
    enabled: !!workflowName && !!executionId && steps.length > 0 && enabled,
    refetchInterval: isRunning ? 1500 : false, // Poll every 1.5s for running executions
    retry: false,
  });
}

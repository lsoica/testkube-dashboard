import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultService } from '../api/generated';

export function useWorkflowTemplates(selector?: string) {
  return useQuery({
    queryKey: ['workflow-templates', selector],
    queryFn: async () => {
      console.log('[Testkube] Fetching workflow templates, selector:', selector);
      try {
        const result = await DefaultService.listTestWorkflowTemplates(selector);
        console.log('[Testkube] Workflow templates fetched successfully:', result?.length || 0, 'templates');
        return result;
      } catch (error) {
        console.error('[Testkube] Failed to fetch workflow templates:', error);
        throw error;
      }
    },
  });
}

export function useWorkflowTemplate(name: string) {
  return useQuery({
    queryKey: ['workflow-templates', name],
    queryFn: () => DefaultService.getTestWorkflowTemplate(name),
    enabled: !!name,
  });
}

export function useDeleteWorkflowTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => DefaultService.deleteTestWorkflowTemplate(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-templates'] });
    },
  });
}

import { OpenAPI } from './generated/core/OpenAPI';

export interface WorkflowLogEntry {
  time?: string;
  content?: string;
  type?: string;
  error?: boolean;
  ref?: string;
}

export interface GetWorkflowLogsOptions {
  workflowName: string;
  executionId: string;
  step?: string;
  container?: string;
  follow?: boolean;
}

/**
 * Fetch logs for a test workflow execution
 * Uses the correct endpoint: /v1/test-workflows/{workflowName}/executions/{executionId}/logs
 */
export async function getWorkflowExecutionLogs(
  options: GetWorkflowLogsOptions
): Promise<WorkflowLogEntry[]> {
  const { workflowName, executionId, step, container, follow } = options;

  // Build URL with query params
  const params = new URLSearchParams();
  if (step) params.append('step', step);
  if (container) params.append('container', container);
  if (follow) params.append('follow', 'true');

  // Use the correct endpoint: /v1/test-workflows (with dash!)
  const queryString = params.toString();
  const url = `${OpenAPI.BASE}/test-workflows/${encodeURIComponent(
    workflowName
  )}/executions/${encodeURIComponent(executionId)}/logs${queryString ? `?${queryString}` : ''}`;

  console.log('[Workflow Logs] Fetching from:', url, follow ? '(STREAMING)' : '(STATIC)');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain',
      },
    });

    if (!response.ok) {
      console.error('[Workflow Logs] HTTP Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('[Workflow Logs] Error body:', errorText);
      throw new Error(`Failed to fetch logs: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    console.log('[Workflow Logs] Response content-type:', contentType);

    // Parse response - could be JSON array or newline-delimited JSON
    const text = await response.text();

    if (!text || text.trim() === '') {
      console.log('[Workflow Logs] Empty response');
      return [];
    }

    // Try to parse as JSON array first
    try {
      const json = JSON.parse(text);
      if (Array.isArray(json)) {
        console.log('[Workflow Logs] Parsed as JSON array, entries:', json.length);
        return json;
      }
      console.log('[Workflow Logs] Parsed as single JSON object');
      return [json];
    } catch {
      // If not valid JSON array, try newline-delimited JSON
      console.log('[Workflow Logs] Parsing as newline-delimited JSON');
      const lines = text.split('\n').filter(line => line.trim());
      const entries: WorkflowLogEntry[] = [];

      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          entries.push(entry);
        } catch {
          // If line is not JSON, treat it as raw log content
          entries.push({
            content: line,
            time: new Date().toISOString(),
          });
        }
      }

      console.log('[Workflow Logs] Parsed', entries.length, 'newline-delimited entries');
      return entries;
    }
  } catch (error: any) {
    console.error('[Workflow Logs] Fetch failed:', error);
    throw error;
  }
}

export interface StepInfo {
  ref: string;
  name: string;
}

/**
 * Fetch logs for all steps in a workflow execution
 * Fetches all logs at once and groups them by ref field
 */
export async function getWorkflowExecutionLogsByStep(
  workflowName: string,
  executionId: string,
  steps: StepInfo[],
  _follow: boolean = false
): Promise<Map<string, WorkflowLogEntry[]>> {
  const logsByStep = new Map<string, WorkflowLogEntry[]>();

  // Always fetch ALL logs at once and group them by ref
  // This works for both running and completed executions
  console.log('[Workflow Logs] Fetching ALL logs and grouping by ref');
  try {
    const allLogs = await getWorkflowExecutionLogs({
      workflowName,
      executionId,
      follow: false, // Never use follow - just poll instead
    });

    console.log('[Workflow Logs] Fetched', allLogs.length, 'total log entries');

    // Group logs by their ref field
    for (const log of allLogs) {
      const ref = log.ref || 'unknown';
      if (!logsByStep.has(ref)) {
        logsByStep.set(ref, []);
      }
      logsByStep.get(ref)!.push(log);
    }

    // Log what we got
    console.log('[Workflow Logs] Grouped logs by ref:');
    logsByStep.forEach((logs, ref) => {
      console.log(`  ${ref}: ${logs.length} entries`);
    });

    return logsByStep;
  } catch (error) {
    console.error('[Workflow Logs] Failed to fetch execution logs:', error);
    return logsByStep;
  }
}

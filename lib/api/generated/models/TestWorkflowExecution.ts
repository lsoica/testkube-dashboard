/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionTarget } from './ExecutionTarget';
import type { TestWorkflow } from './TestWorkflow';
import type { TestWorkflowExecutionConfig } from './TestWorkflowExecutionConfig';
import type { TestWorkflowExecutionResourceAggregationsReport } from './TestWorkflowExecutionResourceAggregationsReport';
import type { TestWorkflowExecutionRuntime } from './TestWorkflowExecutionRuntime';
import type { TestWorkflowOutput } from './TestWorkflowOutput';
import type { TestWorkflowReport } from './TestWorkflowReport';
import type { TestWorkflowResult } from './TestWorkflowResult';
import type { TestWorkflowRunningContext } from './TestWorkflowRunningContext';
import type { TestWorkflowSignature } from './TestWorkflowSignature';
import type { TestWorkflowTagValue } from './TestWorkflowTagValue';
export type TestWorkflowExecution = {
    /**
     * unique execution identifier
     */
    id: string;
    /**
     * identifier for group of correlated executions
     */
    groupId?: string;
    /**
     * identifier of the runner where it has been executed
     */
    runnerId?: string;
    runnerTarget?: ExecutionTarget;
    runnerOriginalTarget?: ExecutionTarget;
    /**
     * execution name
     */
    name: string;
    /**
     * execution namespace
     */
    namespace?: string;
    /**
     * sequence number for the execution
     */
    number?: number;
    /**
     * when the execution has been scheduled to run
     */
    scheduledAt?: string;
    /**
     * when the execution has been assigned to some runner
     */
    assignedAt?: string;
    /**
     * when the execution result's status has changed last time (queued, passed, failed)
     */
    statusAt?: string;
    /**
     * structured tree of steps
     */
    signature?: Array<TestWorkflowSignature>;
    result?: TestWorkflowResult;
    /**
     * additional information from the steps, like referenced executed tests or artifacts
     */
    output?: Array<TestWorkflowOutput>;
    /**
     * generated reports from the steps, like junit
     */
    reports?: Array<TestWorkflowReport>;
    resourceAggregations?: TestWorkflowExecutionResourceAggregationsReport;
    workflow: TestWorkflow;
    resolvedWorkflow?: TestWorkflow;
    /**
     * test workflow execution name started the test workflow execution
     */
    testWorkflowExecutionName?: string;
    /**
     * whether webhooks on the execution of this test workflow are disabled
     */
    disableWebhooks?: boolean;
    tags?: TestWorkflowTagValue;
    /**
     * running context for the test workflow execution (Pro edition only)
     */
    runningContext?: TestWorkflowRunningContext;
    configParams?: TestWorkflowExecutionConfig;
    runtime?: TestWorkflowExecutionRuntime;
};


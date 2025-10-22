/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionTarget } from './ExecutionTarget';
import type { TestWorkflowConfigValue } from './TestWorkflowConfigValue';
import type { TestWorkflowExecutionRuntime } from './TestWorkflowExecutionRuntime';
import type { TestWorkflowRunningContext } from './TestWorkflowRunningContext';
import type { TestWorkflowTagValue } from './TestWorkflowTagValue';
export type TestWorkflowExecutionRequest = {
    /**
     * custom execution name
     */
    name?: string;
    config?: TestWorkflowConfigValue;
    /**
     * runtime configuration for the test workflow execution
     */
    runtime?: TestWorkflowExecutionRuntime;
    /**
     * test workflow execution name started the test workflow execution
     */
    testWorkflowExecutionName?: string;
    /**
     * whether webhooks on the execution of this test workflow are disabled
     */
    disableWebhooks?: boolean;
    tags?: TestWorkflowTagValue;
    target?: ExecutionTarget;
    /**
     * running context for the test workflow execution (Pro edition only)
     */
    runningContext?: TestWorkflowRunningContext;
    /**
     * parent execution ids
     */
    parentExecutionIds?: Array<string>;
};


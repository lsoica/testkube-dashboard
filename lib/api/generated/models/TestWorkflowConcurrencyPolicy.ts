/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * configuration to control concurrent executions.
 */
export type TestWorkflowConcurrencyPolicy = {
    /**
     * Group ongoing executions by this identifier instead of by workflow name. Use the group identifier if you want the control concurrency across workflows.
     */
    group?: string;
    /**
     * The maximum amount of concurrent executions for this workflow or group. The scheduler will check the amount of ongoing executions for this workflow or group and only schedule this workflow when the amount is below its given maximum. When using a group identifier, it is recommended to keep the maximum in sync through a WorkflowTemplate.
     */
    max?: number;
    /**
     * Whether the oldest in progress execution should be cancelled to be replaced with the latest queued one.
     */
    cancelInProgress?: boolean;
};


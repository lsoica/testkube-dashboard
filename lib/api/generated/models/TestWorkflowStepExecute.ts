/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowStepExecuteTestRef } from './TestWorkflowStepExecuteTestRef';
import type { TestWorkflowStepExecuteTestWorkflowRef } from './TestWorkflowStepExecuteTestWorkflowRef';
export type TestWorkflowStepExecute = {
    /**
     * how many resources could be scheduled in parallel
     */
    parallelism?: number;
    /**
     * only schedule the resources, don't watch for the results (unless it is needed for parallelism)
     */
    async?: boolean;
    /**
     * tests to schedule
     */
    tests?: Array<TestWorkflowStepExecuteTestRef>;
    /**
     * workflows to schedule
     */
    workflows?: Array<TestWorkflowStepExecuteTestWorkflowRef>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowRetryPolicy } from './TestWorkflowRetryPolicy';
export type TestWorkflowStepControl = {
    /**
     * should the step be paused initially
     */
    paused?: boolean;
    /**
     * is the step expected to fail
     */
    negative?: boolean;
    /**
     * is the step optional, so the failure won't affect the TestWorkflow result
     */
    optional?: boolean;
    retry?: TestWorkflowRetryPolicy;
    /**
     * maximum time this step may take
     */
    timeout?: string;
};


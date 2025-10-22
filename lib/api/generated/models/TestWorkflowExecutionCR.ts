/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectRef } from './ObjectRef';
import type { TestWorkflowExecutionRequest } from './TestWorkflowExecutionRequest';
import type { TestWorkflowExecutionStatusCR } from './TestWorkflowExecutionStatusCR';
export type TestWorkflowExecutionCR = {
    /**
     * test workflow name and namespace
     */
    testWorkflow: ObjectRef;
    /**
     * test workflow execution request parameters
     */
    executionRequest?: TestWorkflowExecutionRequest;
    /**
     * test workflow execution status
     */
    status?: TestWorkflowExecutionStatusCR;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionRequest } from './ExecutionRequest';
import type { ObjectRef } from './ObjectRef';
import type { TestExecutionStatusCR } from './TestExecutionStatusCR';
export type TestExecutionCR = {
    /**
     * test name and namespace
     */
    test: ObjectRef;
    /**
     * test execution request parameters
     */
    executionRequest?: ExecutionRequest;
    /**
     * test execution status
     */
    status?: TestExecutionStatusCR;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectRef } from './ObjectRef';
import type { TestSuiteExecutionRequest } from './TestSuiteExecutionRequest';
import type { TestSuiteExecutionStatusCR } from './TestSuiteExecutionStatusCR';
export type TestSuiteExecutionCR = {
    /**
     * test suite name and namespace
     */
    testSuite: ObjectRef;
    /**
     * test suite execution request parameters
     */
    executionRequest?: TestSuiteExecutionRequest;
    /**
     * test suite execution status
     */
    status?: TestSuiteExecutionStatusCR;
};


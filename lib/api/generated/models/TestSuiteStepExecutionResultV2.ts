/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Execution } from './Execution';
import type { ObjectRef } from './ObjectRef';
import type { TestSuiteStepV2 } from './TestSuiteStepV2';
/**
 * execution result returned from executor
 */
export type TestSuiteStepExecutionResultV2 = {
    step?: TestSuiteStepV2;
    /**
     * object name and namespace
     */
    test?: ObjectRef;
    /**
     * test step execution
     */
    execution?: Execution;
};


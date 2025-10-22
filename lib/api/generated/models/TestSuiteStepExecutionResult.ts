/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Execution } from './Execution';
import type { ObjectRef } from './ObjectRef';
import type { TestSuiteStep } from './TestSuiteStep';
/**
 * execution result returned from executor
 */
export type TestSuiteStepExecutionResult = {
    step?: TestSuiteStep;
    /**
     * object name and namespace
     */
    test?: ObjectRef;
    /**
     * test step execution, NOTE: the execution output will be empty, retrieve it directly form the test execution
     */
    execution?: Execution;
};


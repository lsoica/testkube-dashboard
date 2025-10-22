/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionStatus } from './ExecutionStatus';
import type { TestSuiteStepType } from './TestSuiteStepType';
/**
 * Test suite execution summary
 */
export type TestSuiteStepExecutionSummary = {
    id: string;
    /**
     * execution name
     */
    name: string;
    /**
     * test name
     */
    testName?: string;
    status: ExecutionStatus;
    type?: TestSuiteStepType;
};


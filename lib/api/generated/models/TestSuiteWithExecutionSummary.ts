/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuite } from './TestSuite';
import type { TestSuiteExecutionSummary } from './TestSuiteExecutionSummary';
/**
 * Test suite with latest execution result
 */
export type TestSuiteWithExecutionSummary = {
    testSuite: TestSuite;
    latestExecution?: TestSuiteExecutionSummary;
};


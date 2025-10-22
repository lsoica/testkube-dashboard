/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuite } from './TestSuite';
import type { TestSuiteExecution } from './TestSuiteExecution';
/**
 * Test suite with latest execution result
 */
export type TestSuiteWithExecution = {
    testSuite: TestSuite;
    latestExecution?: TestSuiteExecution;
};


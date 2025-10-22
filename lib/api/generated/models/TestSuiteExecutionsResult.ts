/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionsTotals } from './ExecutionsTotals';
import type { TestSuiteExecutionSummary } from './TestSuiteExecutionSummary';
/**
 * the result for a page of executions
 */
export type TestSuiteExecutionsResult = {
    totals: ExecutionsTotals;
    filtered?: ExecutionsTotals;
    results: Array<TestSuiteExecutionSummary>;
};


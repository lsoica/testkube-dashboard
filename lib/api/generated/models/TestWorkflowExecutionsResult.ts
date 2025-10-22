/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionsTotals } from './ExecutionsTotals';
import type { TestWorkflowExecutionSummary } from './TestWorkflowExecutionSummary';
export type TestWorkflowExecutionsResult = {
    totals: ExecutionsTotals;
    filtered: ExecutionsTotals;
    results: Array<TestWorkflowExecutionSummary>;
};


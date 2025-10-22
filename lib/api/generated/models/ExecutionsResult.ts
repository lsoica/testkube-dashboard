/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionsTotals } from './ExecutionsTotals';
import type { ExecutionSummary } from './ExecutionSummary';
/**
 * the result for a page of executions
 */
export type ExecutionsResult = {
    totals: ExecutionsTotals;
    filtered?: ExecutionsTotals;
    results: Array<ExecutionSummary>;
};


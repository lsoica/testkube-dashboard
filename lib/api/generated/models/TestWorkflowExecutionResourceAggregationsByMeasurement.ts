/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowExecutionResourceAggregations } from './TestWorkflowExecutionResourceAggregations';
/**
 * TestWorkflowExecutionResourceAggregationsByMeasurement provides resource usage aggregations
 * for a specific measurement (e.g. CPU, Memory, etc.) across all steps in a TestWorkflowExecution.
 *
 */
export type TestWorkflowExecutionResourceAggregationsByMeasurement = Record<string, Record<string, TestWorkflowExecutionResourceAggregations>>;

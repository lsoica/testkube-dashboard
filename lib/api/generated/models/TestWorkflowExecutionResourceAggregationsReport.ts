/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowExecutionResourceAggregationsByMeasurement } from './TestWorkflowExecutionResourceAggregationsByMeasurement';
import type { TestWorkflowExecutionStepResourceAggregations } from './TestWorkflowExecutionStepResourceAggregations';
/**
 * TestWorkflowExecutionResourceAggregationsReport provides resource usage aggregations
 * for an entire TestWorkflowExecution (globally) and also per-step (by measurements).
 *
 */
export type TestWorkflowExecutionResourceAggregationsReport = {
    global?: TestWorkflowExecutionResourceAggregationsByMeasurement;
    step?: Array<TestWorkflowExecutionStepResourceAggregations>;
};


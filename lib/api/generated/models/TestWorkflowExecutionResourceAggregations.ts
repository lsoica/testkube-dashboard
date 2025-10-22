/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * TestWorkflowExecutionResourceAggregations provides min, max, average, total,
 * and standard deviation values for a resource metric.
 *
 */
export type TestWorkflowExecutionResourceAggregations = {
    /**
     * Total sum of the metric.
     */
    total?: number;
    /**
     * Minimum value of the metric.
     */
    min?: number;
    /**
     * Maximum value of the metric.
     */
    max?: number;
    /**
     * Average value of the metric.
     */
    avg?: number;
    /**
     * Standard deviation of the metric.
     */
    stdDev?: number;
};


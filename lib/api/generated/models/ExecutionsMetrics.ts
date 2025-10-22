/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionsMetricsExecutions } from './ExecutionsMetricsExecutions';
export type ExecutionsMetrics = {
    /**
     * Percentage pass to fail ratio
     */
    passFailRatio?: number;
    /**
     * 50th percentile of all durations
     */
    executionDurationP50?: string;
    /**
     * 50th percentile of all durations in milliseconds
     */
    executionDurationP50ms?: number;
    /**
     * 90th percentile of all durations
     */
    executionDurationP90?: string;
    /**
     * 90th percentile of all durations in milliseconds
     */
    executionDurationP90ms?: number;
    /**
     * 95th percentile of all durations
     */
    executionDurationP95?: string;
    /**
     * 95th percentile of all durations in milliseconds
     */
    executionDurationP95ms?: number;
    /**
     * 99th percentile of all durations
     */
    executionDurationP99?: string;
    /**
     * 99th percentile of all durations in milliseconds
     */
    executionDurationP99ms?: number;
    /**
     * total executions number
     */
    totalExecutions?: number;
    /**
     * failed executions number
     */
    failedExecutions?: number;
    /**
     * List of test/testsuite executions
     */
    executions?: Array<ExecutionsMetricsExecutions>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuiteBatchStepExecutionSummary } from './TestSuiteBatchStepExecutionSummary';
import type { TestSuiteExecutionStatus } from './TestSuiteExecutionStatus';
/**
 * Test execution summary
 */
export type TestSuiteExecutionSummary = {
    /**
     * execution id
     */
    id: string;
    /**
     * execution name
     */
    name: string;
    /**
     * name of the test suite
     */
    testSuiteName: string;
    status: TestSuiteExecutionStatus;
    /**
     * test suite execution start time
     */
    startTime?: string;
    /**
     * test suite execution end time
     */
    endTime?: string;
    /**
     * test suite execution duration
     */
    duration?: string;
    /**
     * test suite execution duration in ms
     */
    durationMs?: number;
    execution?: Array<TestSuiteBatchStepExecutionSummary>;
    /**
     * test suite and execution labels
     */
    labels?: Record<string, string>;
};


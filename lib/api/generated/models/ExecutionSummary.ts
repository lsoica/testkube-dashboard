/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionStatus } from './ExecutionStatus';
import type { RunningContext } from './RunningContext';
/**
 * Execution summary
 */
export type ExecutionSummary = {
    /**
     * execution id
     */
    id: string;
    /**
     * execution name
     */
    name: string;
    /**
     * execution number
     */
    number?: number;
    /**
     * name of the test
     */
    testName: string;
    /**
     * name of the test
     */
    testNamespace?: string;
    /**
     * the type of test for this execution
     */
    testType: string;
    status: ExecutionStatus;
    /**
     * test execution start time
     */
    startTime?: string;
    /**
     * test execution end time
     */
    endTime?: string;
    /**
     * calculated test duration
     */
    duration?: string;
    /**
     * calculated test duration in ms
     */
    durationMs?: number;
    /**
     * test and execution labels
     */
    labels?: Record<string, string>;
    /**
     * running context for the test execution
     */
    runningContext?: RunningContext;
};


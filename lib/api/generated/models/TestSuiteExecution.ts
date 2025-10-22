/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectRef } from './ObjectRef';
import type { RunningContext } from './RunningContext';
import type { TestSuiteBatchStepExecutionResult } from './TestSuiteBatchStepExecutionResult';
import type { TestSuiteExecutionStatus } from './TestSuiteExecutionStatus';
import type { TestSuiteStepExecutionResultV2 } from './TestSuiteStepExecutionResultV2';
import type { Variables } from './Variables';
/**
 * Test suite executions data
 */
export type TestSuiteExecution = {
    /**
     * execution id
     */
    id: string;
    /**
     * execution name
     */
    name: string;
    /**
     * object name and namespace
     */
    testSuite: ObjectRef;
    status?: TestSuiteExecutionStatus;
    /**
     * Environment variables passed to executor. Deprecated: use Basic Variables instead
     * @deprecated
     */
    envs?: Record<string, string>;
    variables?: Variables;
    /**
     * secret uuid
     */
    readonly secretUUID?: string;
    /**
     * test start time
     */
    startTime?: string;
    /**
     * test end time
     */
    endTime?: string;
    /**
     * test duration
     */
    duration?: string;
    /**
     * test duration in ms
     */
    durationMs?: number;
    /**
     * steps execution results
     */
    stepResults?: Array<TestSuiteStepExecutionResultV2>;
    /**
     * batch steps execution results
     */
    executeStepResults?: Array<TestSuiteBatchStepExecutionResult>;
    /**
     * test suite labels
     */
    labels?: Record<string, string>;
    /**
     * running context for the test suite execution
     */
    runningContext?: RunningContext;
    /**
     * test suite execution name started the test suite execution
     */
    testSuiteExecutionName?: string;
    /**
     * whether webhooks on this execution are disabled
     */
    disableWebhooks?: boolean;
};


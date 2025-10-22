/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuiteBatchStep } from './TestSuiteBatchStep';
import type { TestSuiteStepExecutionResult } from './TestSuiteStepExecutionResult';
/**
 * execution result returned from executor
 */
export type TestSuiteBatchStepExecutionResult = {
    step?: TestSuiteBatchStep;
    execute?: Array<TestSuiteStepExecutionResult>;
    /**
     * step start time
     */
    startTime?: string;
    /**
     * step end time
     */
    endTime?: string;
    /**
     * step duration
     */
    duration?: string;
};


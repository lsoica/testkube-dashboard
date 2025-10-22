/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuiteExecutionStatus } from './TestSuiteExecutionStatus';
/**
 * test suite execution core
 */
export type TestSuiteExecutionCore = {
    /**
     * execution id
     */
    id?: string;
    /**
     * test suite execution start time
     */
    startTime?: string;
    /**
     * test suite execution end time
     */
    endTime?: string;
    status?: TestSuiteExecutionStatus;
};


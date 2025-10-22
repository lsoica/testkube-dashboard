/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuiteBatchStep } from './TestSuiteBatchStep';
import type { TestSuiteExecutionRequest } from './TestSuiteExecutionRequest';
import type { TestSuiteStatus } from './TestSuiteStatus';
export type TestSuite = {
    name: string;
    namespace?: string;
    description?: string;
    /**
     * Run these batch steps before whole suite
     */
    before?: Array<TestSuiteBatchStep>;
    /**
     * Batch steps to run
     */
    steps?: Array<TestSuiteBatchStep>;
    /**
     * Run these batch steps after whole suite
     */
    after?: Array<TestSuiteBatchStep>;
    /**
     * test suite labels
     */
    labels?: Record<string, string>;
    /**
     * schedule to run test suite
     */
    schedule?: string;
    repeats?: number;
    created?: string;
    executionRequest?: TestSuiteExecutionRequest;
    status: TestSuiteStatus;
    /**
     * if test suite is offline and cannot be executed
     */
    readOnly?: boolean;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuiteExecutionRequest } from './TestSuiteExecutionRequest';
import type { TestSuiteStatus } from './TestSuiteStatus';
import type { TestSuiteStepV2 } from './TestSuiteStepV2';
export type TestSuiteV2 = {
    name: string;
    namespace?: string;
    description?: string;
    /**
     * Run this step before whole suite
     */
    before?: Array<TestSuiteStepV2>;
    /**
     * Steps to run
     */
    steps?: Array<TestSuiteStepV2>;
    /**
     * Run this step after whole suite
     */
    after?: Array<TestSuiteStepV2>;
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
};


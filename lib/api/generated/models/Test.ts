/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionRequest } from './ExecutionRequest';
import type { TestContent } from './TestContent';
import type { TestStatus } from './TestStatus';
export type Test = {
    /**
     * test name
     */
    name?: string;
    /**
     * test namespace
     */
    namespace?: string;
    /**
     * test description
     */
    description?: string;
    /**
     * test type
     */
    type?: string;
    /**
     * test content
     */
    content?: TestContent;
    /**
     * reference to test source resource
     */
    source?: string;
    created?: string;
    /**
     * test labels
     */
    labels?: Record<string, string>;
    /**
     * schedule to run test
     */
    schedule?: string;
    /**
     * if test is offline and cannot be executed
     */
    readOnly?: boolean;
    /**
     * list of file paths that will be needed from uploads
     */
    uploads?: Array<string>;
    executionRequest?: ExecutionRequest;
    status?: TestStatus;
};


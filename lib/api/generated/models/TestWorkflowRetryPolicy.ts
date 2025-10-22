/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestWorkflowRetryPolicy = {
    /**
     * how many times at most it should retry
     */
    count: number;
    /**
     * until when it should retry (defaults to "passed")
     */
    until?: string;
};


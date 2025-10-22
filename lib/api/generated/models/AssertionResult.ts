/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * execution result data
 */
export type AssertionResult = {
    name?: string;
    status?: AssertionResult.status;
    errorMessage?: string | null;
};
export namespace AssertionResult {
    export enum status {
        PASSED = 'passed',
        FAILED = 'failed',
    }
}


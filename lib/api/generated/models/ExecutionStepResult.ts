/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssertionResult } from './AssertionResult';
/**
 * execution result data
 */
export type ExecutionStepResult = {
    /**
     * step name
     */
    name: string;
    duration?: string;
    /**
     * execution step status
     */
    status: ExecutionStepResult.status;
    assertionResults?: Array<AssertionResult>;
};
export namespace ExecutionStepResult {
    /**
     * execution step status
     */
    export enum status {
        PASSED = 'passed',
        FAILED = 'failed',
    }
}


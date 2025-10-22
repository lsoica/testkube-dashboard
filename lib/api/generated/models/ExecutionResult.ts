/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionStatus } from './ExecutionStatus';
import type { ExecutionStepResult } from './ExecutionStepResult';
/**
 * execution result returned from executor
 */
export type ExecutionResult = {
    status: ExecutionStatus;
    /**
     * RAW Test execution output, depends of reporter used in particular tool
     */
    output?: string;
    /**
     * output type depends of reporter used in particular tool
     */
    outputType?: ExecutionResult.outputType;
    /**
     * error message when status is error, separate to output as output can be partial in case of error
     */
    errorMessage?: string;
    /**
     * execution steps (for collection of requests)
     */
    steps?: Array<ExecutionStepResult>;
    reports?: {
        junit?: string;
    };
};
export namespace ExecutionResult {
    /**
     * output type depends of reporter used in particular tool
     */
    export enum outputType {
        TEXT_PLAIN = 'text/plain',
        APPLICATION_JUNIT_XML = 'application/junit+xml',
        APPLICATION_JSON = 'application/json',
    }
}


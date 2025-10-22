/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionResult } from './ExecutionResult';
/**
 * CRD based executor data
 */
export type ExecutorOutput = {
    /**
     * One of possible output types
     */
    type: ExecutorOutput.type;
    /**
     * Message/event data passed from executor (like log lines etc)
     */
    content?: string;
    /**
     * Execution result when job is finished
     */
    result?: ExecutionResult;
    /**
     * Timestamp of log
     */
    time?: string;
};
export namespace ExecutorOutput {
    /**
     * One of possible output types
     */
    export enum type {
        ERROR = 'error',
        LOG = 'log',
        EVENT = 'event',
        RESULT = 'result',
    }
}


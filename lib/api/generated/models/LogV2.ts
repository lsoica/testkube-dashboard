/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogV1 } from './LogV1';
/**
 * Log format version 2
 */
export type LogV2 = {
    /**
     * Timestamp of log
     */
    time?: string;
    /**
     * Message/event data passed from executor (like log lines etc)
     */
    content?: string;
    /**
     * One of possible log types
     */
    type?: string;
    /**
     * One of possible log sources
     */
    source: LogV2.source;
    /**
     * indicates a log error
     */
    error?: boolean;
    /**
     * One of possible log versions
     */
    version?: LogV2.version;
    /**
     * additional log details
     */
    metadata?: Record<string, string>;
    /**
     * Old output - for backwards compatibility - will be removed for non-structured logs
     */
    v1?: LogV1;
};
export namespace LogV2 {
    /**
     * One of possible log sources
     */
    export enum source {
        JOB_POD = 'job-pod',
        TEST_SCHEDULER = 'test-scheduler',
        CONTAINER_EXECUTOR = 'container-executor',
        JOB_EXECUTOR = 'job-executor',
    }
    /**
     * One of possible log versions
     */
    export enum version {
        V1 = 'v1',
        V2 = 'v2',
    }
}


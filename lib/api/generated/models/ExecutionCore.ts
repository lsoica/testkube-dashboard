/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionStatus } from './ExecutionStatus';
/**
 * test execution core
 */
export type ExecutionCore = {
    /**
     * execution id
     */
    id?: string;
    /**
     * execution number
     */
    number?: number;
    /**
     * test start time
     */
    startTime?: string;
    /**
     * test end time
     */
    endTime?: string;
    status?: ExecutionStatus;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionsResult } from './ExecutionsResult';
import type { Executor } from './Executor';
/**
 * Executor details with Executor data and additional information like list of executions
 */
export type ExecutorDetails = {
    /**
     * Executor name
     */
    name?: string;
    executor?: Executor;
    executions?: ExecutionsResult;
};


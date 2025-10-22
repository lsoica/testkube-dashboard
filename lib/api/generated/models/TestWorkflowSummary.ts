/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowExecutionHealth } from './TestWorkflowExecutionHealth';
export type TestWorkflowSummary = {
    name?: string;
    namespace?: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
    health?: TestWorkflowExecutionHealth;
};


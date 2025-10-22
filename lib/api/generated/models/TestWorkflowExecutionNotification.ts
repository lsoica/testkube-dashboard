/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowOutput } from './TestWorkflowOutput';
import type { TestWorkflowResult } from './TestWorkflowResult';
export type TestWorkflowExecutionNotification = {
    /**
     * timestamp for the notification if available
     */
    ts?: string;
    result?: TestWorkflowResult;
    /**
     * step reference, if related to some specific step
     */
    ref?: string;
    /**
     * log content, if it's just a log. note, that it includes 30 chars timestamp + space
     */
    log?: string;
    output?: TestWorkflowOutput;
    /**
     * should it be considered temporary only for execution time
     */
    temporary?: boolean;
};


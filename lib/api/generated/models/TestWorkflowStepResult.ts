/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowStepStatus } from './TestWorkflowStepStatus';
export type TestWorkflowStepResult = {
    errorMessage?: string;
    status?: TestWorkflowStepStatus;
    exitCode?: number;
    /**
     * when the container was created
     */
    queuedAt?: string;
    /**
     * when the container was started
     */
    startedAt?: string;
    /**
     * when the container was finished
     */
    finishedAt?: string;
};


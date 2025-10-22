/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowStatus } from './TestWorkflowStatus';
export type TestWorkflowResultSummary = {
    status: TestWorkflowStatus;
    predictedStatus: TestWorkflowStatus;
    /**
     * when the pod was created
     */
    queuedAt?: string;
    /**
     * when the pod has been successfully assigned
     */
    startedAt?: string;
    /**
     * when the pod has been completed
     */
    finishedAt?: string;
    /**
     * Go-formatted (human-readable) duration
     */
    duration?: string;
    /**
     * Go-formatted (human-readable) duration (incl. pause)
     */
    totalDuration?: string;
    /**
     * Duration in milliseconds
     */
    durationMs: number;
    /**
     * Duration in milliseconds (incl. pause)
     */
    totalDurationMs: number;
    /**
     * Pause duration in milliseconds
     */
    pausedMs: number;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowPause } from './TestWorkflowPause';
import type { TestWorkflowStatus } from './TestWorkflowStatus';
import type { TestWorkflowStepResult } from './TestWorkflowStepResult';
export type TestWorkflowResult = {
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
     * Go-formatted (human-readable) total duration (incl. pause)
     */
    totalDuration?: string;
    /**
     * Duration in milliseconds
     */
    durationMs: number;
    /**
     * Pause duration in milliseconds
     */
    pausedMs: number;
    /**
     * Total duration in milliseconds (incl. pause)
     */
    totalDurationMs: number;
    pauses?: Array<TestWorkflowPause>;
    initialization?: TestWorkflowStepResult;
    steps?: Record<string, TestWorkflowStepResult>;
};


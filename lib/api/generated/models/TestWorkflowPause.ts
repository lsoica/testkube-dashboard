/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestWorkflowPause = {
    /**
     * step at which it was paused
     */
    ref: string;
    /**
     * when the pause has started
     */
    pausedAt: string;
    /**
     * when the pause has ended
     */
    resumedAt?: string;
};


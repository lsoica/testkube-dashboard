/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
import type { ExecutionTarget } from './ExecutionTarget';
import type { TestWorkflowConfigValue } from './TestWorkflowConfigValue';
/**
 * cron job configuration
 */
export type TestWorkflowCronJobConfig = {
    /**
     * cron schedule to run a test workflow
     */
    cron: string;
    /**
     * labels to attach to the cron job
     */
    labels?: Record<string, string>;
    /**
     * annotations to attach to the cron job
     */
    annotations?: Record<string, string>;
    config?: TestWorkflowConfigValue;
    target?: ExecutionTarget;
    /**
     * cron timezone
     */
    timezone?: BoxedString;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedInteger } from './BoxedInteger';
export type TestWorkflowJobConfig = {
    /**
     * labels to attach to the job
     */
    labels?: Record<string, string>;
    /**
     * annotations to attach to the job
     */
    annotations?: Record<string, string>;
    /**
     * namespace for execution of test workflow
     */
    namespace?: string;
    activeDeadlineSeconds?: BoxedInteger;
};


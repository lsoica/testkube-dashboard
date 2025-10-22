/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
export type TestWorkflowStepExecuteStrategy = {
    count?: BoxedString;
    maxCount?: BoxedString;
    /**
     * matrix of parameters to spawn instances
     */
    matrix?: Record<string, (string | Array<string>)>;
    /**
     * parameters that should be distributed across sharded instances
     */
    shards?: Record<string, (string | Array<string>)>;
};


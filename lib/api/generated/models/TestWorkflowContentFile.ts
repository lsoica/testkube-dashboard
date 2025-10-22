/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedInteger } from './BoxedInteger';
import type { EnvVarSource } from './EnvVarSource';
export type TestWorkflowContentFile = {
    /**
     * path where the file should be accessible at
     */
    path: string;
    /**
     * plain-text content to put inside
     */
    content?: string;
    contentFrom?: EnvVarSource;
    mode?: BoxedInteger;
};


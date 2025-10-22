/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ExecutionTarget = {
    /**
     * runner labels to match
     */
    match?: Record<string, Array<string>>;
    /**
     * runner labels to NOT match
     */
    not?: Record<string, Array<string>>;
    /**
     * list of runner labels to replicate the executions
     */
    replicate?: Array<string>;
};


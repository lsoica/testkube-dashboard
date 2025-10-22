/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestWorkflowSignature = {
    /**
     * step reference
     */
    ref?: string;
    /**
     * step name
     */
    name?: string;
    /**
     * step category, that may be used as name fallback
     */
    category?: string;
    /**
     * is the step/group meant to be optional
     */
    optional?: boolean;
    /**
     * is the step/group meant to be negative
     */
    negative?: boolean;
    children?: Array<TestWorkflowSignature>;
};


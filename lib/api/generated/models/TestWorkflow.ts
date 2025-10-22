/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowSpec } from './TestWorkflowSpec';
import type { TestWorkflowStatusSummary } from './TestWorkflowStatusSummary';
export type TestWorkflow = {
    /**
     * kubernetes resource name
     */
    name?: string;
    /**
     * kubernetes namespace
     */
    namespace?: string;
    /**
     * human-readable description
     */
    description?: string;
    /**
     * test workflow labels
     */
    labels?: Record<string, string>;
    /**
     * test workflow annotations
     */
    annotations?: Record<string, string>;
    created?: string;
    updated?: string;
    spec?: TestWorkflowSpec;
    /**
     * if test workflow is offline and cannot be executed
     */
    readOnly?: boolean;
    status?: TestWorkflowStatusSummary;
};


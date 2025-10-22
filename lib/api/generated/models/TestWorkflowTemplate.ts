/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowTemplateSpec } from './TestWorkflowTemplateSpec';
export type TestWorkflowTemplate = {
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
    spec?: TestWorkflowTemplateSpec;
};


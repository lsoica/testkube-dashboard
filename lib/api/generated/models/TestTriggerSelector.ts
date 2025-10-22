/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestTriggerSelector = {
    /**
     * kubernetes resource name selector
     */
    name?: string;
    /**
     * kubernetes resource name regex
     */
    nameRegex?: string;
    /**
     * resource namespace
     */
    namespace?: string;
    /**
     * kubernetes resource namespace regex
     */
    namespaceRegex?: string;
    /**
     * label selector for Kubernetes resources
     */
    labelSelector?: Record<string, string>;
};


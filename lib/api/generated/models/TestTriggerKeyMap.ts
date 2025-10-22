/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestTriggerKeyMap = {
    /**
     * list of supported values for resources
     */
    resources: Array<string>;
    /**
     * list of supported values for actions
     */
    actions: Array<string>;
    /**
     * list of supported values for executions
     */
    executions: Array<string>;
    /**
     * mapping between resources and supported events
     */
    events: Record<string, Array<string>>;
    /**
     * list of supported values for conditions
     */
    conditions?: Array<string>;
    /**
     * list of supported values for concurrency policies
     */
    concurrencyPolicies: Array<string>;
};


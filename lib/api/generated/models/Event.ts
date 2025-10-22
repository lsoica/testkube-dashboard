/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventResource } from './EventResource';
import type { EventType } from './EventType';
import type { Execution } from './Execution';
import type { TestSuiteExecution } from './TestSuiteExecution';
import type { TestWorkflowExecution } from './TestWorkflowExecution';
/**
 * Event data
 */
export type Event = {
    /**
     * UUID of event
     */
    id: string;
    /**
     * stream topic
     */
    streamTopic?: string;
    resource: EventResource;
    /**
     * ID of resource
     */
    resourceId: string;
    type: EventType;
    testExecution?: Execution;
    testSuiteExecution?: TestSuiteExecution;
    testWorkflowExecution?: TestWorkflowExecution;
    /**
     * cluster name of event
     */
    clusterName?: string;
    /**
     * environment variables
     */
    envs?: Record<string, string>;
    external?: boolean;
};


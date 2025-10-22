/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowRunningContextActorType } from './TestWorkflowRunningContextActorType';
/**
 * running context actor for test workflow execution
 */
export type TestWorkflowRunningContextActor = {
    /**
     * actor name
     */
    name?: string;
    /**
     * actor email
     */
    email?: string;
    /**
     * test workflow execution id
     */
    executionId?: string;
    /**
     * all test workflow execution ids starting from the root
     */
    executionPath?: string;
    /**
     * reference test workflow execution id
     */
    executionReference?: string;
    type: TestWorkflowRunningContextActorType;
};


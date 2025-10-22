/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutionTarget } from './ExecutionTarget';
import type { TestWorkflowConfigValue } from './TestWorkflowConfigValue';
import type { TestWorkflowTagValue } from './TestWorkflowTagValue';
/**
 * supported action parameters for test triggers
 */
export type TestTriggerActionParameters = {
    config?: TestWorkflowConfigValue;
    tags?: TestWorkflowTagValue;
    target?: ExecutionTarget;
};


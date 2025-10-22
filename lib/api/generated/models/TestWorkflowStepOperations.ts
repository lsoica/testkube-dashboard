/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowStepArtifacts } from './TestWorkflowStepArtifacts';
import type { TestWorkflowStepExecute } from './TestWorkflowStepExecute';
import type { TestWorkflowStepRun } from './TestWorkflowStepRun';
export type TestWorkflowStepOperations = {
    /**
     * delay before the step
     */
    delay?: string;
    /**
     * script to run in a default shell for the container
     */
    shell?: string;
    run?: TestWorkflowStepRun;
    execute?: TestWorkflowStepExecute;
    artifacts?: TestWorkflowStepArtifacts;
};


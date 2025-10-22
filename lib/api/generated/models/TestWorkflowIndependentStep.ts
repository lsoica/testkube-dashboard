/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedString } from './BoxedString';
import type { TestWorkflowContainerConfig } from './TestWorkflowContainerConfig';
import type { TestWorkflowContent } from './TestWorkflowContent';
import type { TestWorkflowIndependentServiceSpec } from './TestWorkflowIndependentServiceSpec';
import type { TestWorkflowIndependentStepParallel } from './TestWorkflowIndependentStepParallel';
import type { TestWorkflowRetryPolicy } from './TestWorkflowRetryPolicy';
import type { TestWorkflowStepArtifacts } from './TestWorkflowStepArtifacts';
import type { TestWorkflowStepExecute } from './TestWorkflowStepExecute';
import type { TestWorkflowStepRun } from './TestWorkflowStepRun';
export type TestWorkflowIndependentStep = {
    /**
     * readable name for the step
     */
    name?: string;
    /**
     * expression to declare under which conditions the step should be run; defaults to "passed", except artifacts where it defaults to "always"
     */
    condition?: string;
    pure?: BoxedBoolean;
    /**
     * should the step be paused initially
     */
    paused?: boolean;
    /**
     * is the step expected to fail
     */
    negative?: boolean;
    /**
     * is the step optional, so the failure won't affect the TestWorkflow result
     */
    optional?: boolean;
    retry?: TestWorkflowRetryPolicy;
    /**
     * maximum time this step may take
     */
    timeout?: string;
    /**
     * delay before the step
     */
    delay?: string;
    content?: TestWorkflowContent;
    services?: Record<string, TestWorkflowIndependentServiceSpec>;
    /**
     * script to run in a default shell for the container
     */
    shell?: string;
    run?: TestWorkflowStepRun;
    workingDir?: BoxedString;
    container?: TestWorkflowContainerConfig;
    execute?: TestWorkflowStepExecute;
    artifacts?: TestWorkflowStepArtifacts;
    parallel?: TestWorkflowIndependentStepParallel;
    /**
     * nested setup steps to run
     */
    setup?: Array<TestWorkflowIndependentStep>;
    /**
     * nested steps to run
     */
    steps?: Array<TestWorkflowIndependentStep>;
};


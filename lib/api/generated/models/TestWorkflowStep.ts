/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedString } from './BoxedString';
import type { TestWorkflowContainerConfig } from './TestWorkflowContainerConfig';
import type { TestWorkflowContent } from './TestWorkflowContent';
import type { TestWorkflowRetryPolicy } from './TestWorkflowRetryPolicy';
import type { TestWorkflowServiceSpec } from './TestWorkflowServiceSpec';
import type { TestWorkflowStepArtifacts } from './TestWorkflowStepArtifacts';
import type { TestWorkflowStepExecute } from './TestWorkflowStepExecute';
import type { TestWorkflowStepParallel } from './TestWorkflowStepParallel';
import type { TestWorkflowStepRun } from './TestWorkflowStepRun';
import type { TestWorkflowTemplateRef } from './TestWorkflowTemplateRef';
export type TestWorkflowStep = {
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
    /**
     * list of TestWorkflowTemplates to use
     */
    use?: Array<TestWorkflowTemplateRef>;
    template?: TestWorkflowTemplateRef;
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
    services?: Record<string, TestWorkflowServiceSpec>;
    /**
     * script to run in a default shell for the container
     */
    shell?: string;
    run?: TestWorkflowStepRun;
    workingDir?: BoxedString;
    container?: TestWorkflowContainerConfig;
    execute?: TestWorkflowStepExecute;
    artifacts?: TestWorkflowStepArtifacts;
    parallel?: TestWorkflowStepParallel;
    /**
     * nested setup steps to run
     */
    setup?: Array<TestWorkflowStep>;
    /**
     * nested steps to run
     */
    steps?: Array<TestWorkflowStep>;
};


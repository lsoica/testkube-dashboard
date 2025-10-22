/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowConcurrencyPolicy } from './TestWorkflowConcurrencyPolicy';
import type { TestWorkflowConfigSchema } from './TestWorkflowConfigSchema';
import type { TestWorkflowContainerConfig } from './TestWorkflowContainerConfig';
import type { TestWorkflowContent } from './TestWorkflowContent';
import type { TestWorkflowEvent } from './TestWorkflowEvent';
import type { TestWorkflowIndependentServiceSpec } from './TestWorkflowIndependentServiceSpec';
import type { TestWorkflowIndependentStep } from './TestWorkflowIndependentStep';
import type { TestWorkflowJobConfig } from './TestWorkflowJobConfig';
import type { TestWorkflowPodConfig } from './TestWorkflowPodConfig';
import type { TestWorkflowPvcConfig } from './TestWorkflowPvcConfig';
import type { TestWorkflowSystem } from './TestWorkflowSystem';
import type { TestWorkflowTagSchema } from './TestWorkflowTagSchema';
export type TestWorkflowTemplateSpec = {
    concurrency?: TestWorkflowConcurrencyPolicy;
    config?: TestWorkflowConfigSchema;
    system?: TestWorkflowSystem;
    content?: TestWorkflowContent;
    services?: Record<string, TestWorkflowIndependentServiceSpec>;
    container?: TestWorkflowContainerConfig;
    job?: TestWorkflowJobConfig;
    pod?: TestWorkflowPodConfig;
    setup?: Array<TestWorkflowIndependentStep>;
    steps?: Array<TestWorkflowIndependentStep>;
    after?: Array<TestWorkflowIndependentStep>;
    events?: Array<TestWorkflowEvent>;
    execution?: TestWorkflowTagSchema;
    pvcs?: Record<string, TestWorkflowPvcConfig>;
};


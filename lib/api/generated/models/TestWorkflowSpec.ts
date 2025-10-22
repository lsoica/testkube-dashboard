/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowConcurrencyPolicy } from './TestWorkflowConcurrencyPolicy';
import type { TestWorkflowConfigSchema } from './TestWorkflowConfigSchema';
import type { TestWorkflowContainerConfig } from './TestWorkflowContainerConfig';
import type { TestWorkflowContent } from './TestWorkflowContent';
import type { TestWorkflowEvent } from './TestWorkflowEvent';
import type { TestWorkflowJobConfig } from './TestWorkflowJobConfig';
import type { TestWorkflowPodConfig } from './TestWorkflowPodConfig';
import type { TestWorkflowPvcConfig } from './TestWorkflowPvcConfig';
import type { TestWorkflowServiceSpec } from './TestWorkflowServiceSpec';
import type { TestWorkflowStep } from './TestWorkflowStep';
import type { TestWorkflowSystem } from './TestWorkflowSystem';
import type { TestWorkflowTagSchema } from './TestWorkflowTagSchema';
import type { TestWorkflowTemplateRef } from './TestWorkflowTemplateRef';
export type TestWorkflowSpec = {
    use?: Array<TestWorkflowTemplateRef>;
    concurrency?: TestWorkflowConcurrencyPolicy;
    config?: TestWorkflowConfigSchema;
    system?: TestWorkflowSystem;
    content?: TestWorkflowContent;
    services?: Record<string, TestWorkflowServiceSpec>;
    container?: TestWorkflowContainerConfig;
    job?: TestWorkflowJobConfig;
    pod?: TestWorkflowPodConfig;
    setup?: Array<TestWorkflowStep>;
    steps?: Array<TestWorkflowStep>;
    after?: Array<TestWorkflowStep>;
    events?: Array<TestWorkflowEvent>;
    execution?: TestWorkflowTagSchema;
    pvcs?: Record<string, TestWorkflowPvcConfig>;
};


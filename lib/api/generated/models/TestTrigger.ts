/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestTriggerActionParameters } from './TestTriggerActionParameters';
import type { TestTriggerActions } from './TestTriggerActions';
import type { TestTriggerConcurrencyPolicies } from './TestTriggerConcurrencyPolicies';
import type { TestTriggerConditionSpec } from './TestTriggerConditionSpec';
import type { TestTriggerExecutions } from './TestTriggerExecutions';
import type { TestTriggerProbeSpec } from './TestTriggerProbeSpec';
import type { TestTriggerResources } from './TestTriggerResources';
import type { TestTriggerSelector } from './TestTriggerSelector';
export type TestTrigger = {
    /**
     * test trigger name
     */
    name?: string;
    /**
     * test trigger namespace
     */
    namespace?: string;
    /**
     * test trigger labels
     */
    labels?: Record<string, string>;
    /**
     * test trigger annotations
     */
    annotations?: Record<string, string>;
    /**
     * label selector for events
     */
    selector?: any;
    resource?: TestTriggerResources;
    resourceSelector?: TestTriggerSelector;
    /**
     * listen for event for selected resource
     */
    event: string;
    conditionSpec?: TestTriggerConditionSpec;
    probeSpec?: TestTriggerProbeSpec;
    action: TestTriggerActions;
    actionParameters?: TestTriggerActionParameters;
    execution: TestTriggerExecutions;
    testSelector: TestTriggerSelector;
    concurrencyPolicy?: TestTriggerConcurrencyPolicies;
    /**
     * whether test trigger is disabled
     */
    disabled?: boolean;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectRef } from './ObjectRef';
import type { TestTrigger } from './TestTrigger';
import type { TestTriggerResources } from './TestTriggerResources';
import type { TestTriggerSelector } from './TestTriggerSelector';
/**
 * test trigger create or update request body
 */
export type TestTriggerUpsertRequest = (TestTrigger & ObjectRef & {
    resource: TestTriggerResources;
    resourceSelector: TestTriggerSelector;
});


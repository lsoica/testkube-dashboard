/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestTriggerConditionStatuses } from './TestTriggerConditionStatuses';
/**
 * supported condition for test triggers
 */
export type TestTriggerCondition = {
    status: TestTriggerConditionStatuses;
    /**
     * test trigger condition
     */
    type: string;
    /**
     * test trigger condition reason
     */
    reason?: string;
    /**
     * duration in seconds in the past from current time when the condition is still valid
     */
    ttl?: number;
};


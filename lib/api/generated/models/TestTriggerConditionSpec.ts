/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestTriggerCondition } from './TestTriggerCondition';
export type TestTriggerConditionSpec = {
    /**
     * list of test trigger conditions
     */
    conditions?: Array<TestTriggerCondition>;
    /**
     * duration in seconds the test trigger waits for conditions, until its stopped
     */
    timeout?: number;
    /**
     * duration in seconds the test trigger waits between condition checks
     */
    delay?: number;
};


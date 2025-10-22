/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestTriggerProbe } from './TestTriggerProbe';
export type TestTriggerProbeSpec = {
    /**
     * list of test trigger probes
     */
    probes?: Array<TestTriggerProbe>;
    /**
     * duration in seconds the test trigger waits for probes, until its stopped
     */
    timeout?: number;
    /**
     * duration in seconds the test trigger waits between probes
     */
    delay?: number;
};


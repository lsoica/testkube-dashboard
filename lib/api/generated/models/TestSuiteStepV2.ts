/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestSuiteStepDelayV2 } from './TestSuiteStepDelayV2';
import type { TestSuiteStepExecuteTestV2 } from './TestSuiteStepExecuteTestV2';
export type TestSuiteStepV2 = {
    stopTestOnFailure: boolean;
    execute?: TestSuiteStepExecuteTestV2;
    delay?: TestSuiteStepDelayV2;
};


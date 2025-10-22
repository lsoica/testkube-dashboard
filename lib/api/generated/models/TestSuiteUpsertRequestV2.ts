/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectRef } from './ObjectRef';
import type { TestSuiteV2 } from './TestSuiteV2';
/**
 * test suite create request body
 */
export type TestSuiteUpsertRequestV2 = (TestSuiteV2 & ObjectRef & {
    /**
     * object kubernetes namespace
     */
    namespace: string;
});


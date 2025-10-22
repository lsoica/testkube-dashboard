/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectRef } from './ObjectRef';
import type { TestSuite } from './TestSuite';
/**
 * test suite create request body
 */
export type TestSuiteUpsertRequest = (TestSuite & ObjectRef & {
    /**
     * object kubernetes namespace
     */
    namespace: string;
});


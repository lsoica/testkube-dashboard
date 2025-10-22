/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Executor } from './Executor';
import type { ObjectRef } from './ObjectRef';
/**
 * executor create request body
 */
export type ExecutorUpsertRequest = (Executor & ObjectRef & {
    /**
     * Types defines what types can be handled by executor e.g. "postman/collection", ":curl/command" etc
     */
    types: Array<string>;
    /**
     * object kubernetes namespace
     */
    namespace: string;
});


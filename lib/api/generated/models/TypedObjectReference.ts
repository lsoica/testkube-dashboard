/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
import type { TypedLocalObjectReference } from './TypedLocalObjectReference';
/**
 * TypedObjectReference contains enough information to let you locate the typed referenced object inside the specified namespace
 */
export type TypedObjectReference = (TypedLocalObjectReference & {
    /**
     * Namespace is the namespace of resource being referenced
     */
    namespace?: BoxedString;
});


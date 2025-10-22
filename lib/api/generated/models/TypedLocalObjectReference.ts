/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
/**
 * TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace
 */
export type TypedLocalObjectReference = {
    /**
     * api group is the group for the resource being referenced
     */
    apiGroup?: BoxedString;
    /**
     * kind is the type of resource being referenced
     */
    kind?: string;
    /**
     * name is the name of resource being referenced
     */
    name?: string;
};


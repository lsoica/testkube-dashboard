/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalObjectReference } from './LocalObjectReference';
/**
 * Reference to env resource
 */
export type EnvReference = {
    reference: LocalObjectReference;
    /**
     * whether we shoud mount resource
     */
    mount?: boolean;
    /**
     * where we shoud mount resource
     */
    mountPath?: string;
    /**
     * whether we shoud map to variables from resource
     */
    mapToVariables?: boolean;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FieldRef } from './FieldRef';
import type { ResourceFieldRef } from './ResourceFieldRef';
/**
 * EnvVarSource represents a source for the value of an EnvVar.
 */
export type EnvVarSource = {
    /**
     * Selects a key of a ConfigMap.
     */
    configMapKeyRef?: {
        /**
         * The key to select.
         */
        key: string;
        /**
         * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?
         */
        name?: string;
        /**
         * Specify whether the ConfigMap or its key must be defined
         */
        optional?: boolean | null;
    };
    fieldRef?: FieldRef;
    resourceFieldRef?: ResourceFieldRef;
    /**
     * Selects a key of a secret in the pod's namespace
     */
    secretKeyRef?: {
        /**
         * The key of the secret to select from.  Must be a valid secret key.
         */
        key: string;
        /**
         * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?
         */
        name?: string;
        /**
         * Specify whether the Secret or its key must be defined
         */
        optional?: boolean | null;
    };
};


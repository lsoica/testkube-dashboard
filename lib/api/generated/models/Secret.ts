/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SecretOwner } from './SecretOwner';
/**
 * Secret with keys
 */
export type Secret = {
    /**
     * secret name
     */
    name: string;
    /**
     * secret namespace
     */
    namespace?: string;
    /**
     * secret type
     */
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    /**
     * is this Secret controlled by Testkube
     */
    controlled: boolean;
    owner?: SecretOwner;
    /**
     * labels associated with the secret
     */
    labels?: Record<string, string>;
    /**
     * secret keys
     */
    keys?: Array<string>;
};


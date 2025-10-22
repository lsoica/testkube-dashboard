/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SecretOwner } from './SecretOwner';
/**
 * Secret input information
 */
export type SecretInput = {
    /**
     * secret name
     */
    name: string;
    /**
     * secret type
     */
    type?: string;
    /**
     * secret namespace
     */
    namespace?: string;
    owner?: SecretOwner;
    /**
     * labels associated with the secret
     */
    labels?: Record<string, string>;
    /**
     * data to store in the secret
     */
    data: Record<string, string>;
};


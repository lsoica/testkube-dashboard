/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SecretOwner } from './SecretOwner';
/**
 * Secret input information to update
 */
export type SecretUpdate = {
    /**
     * secret name
     */
    name?: string;
    owner?: SecretOwner;
    /**
     * labels associated with the secret
     */
    labels?: Record<string, string>;
    /**
     * data to store in the secret
     */
    data?: Record<string, string>;
};


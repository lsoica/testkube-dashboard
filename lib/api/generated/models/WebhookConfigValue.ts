/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
import type { SecretRef } from './SecretRef';
/**
 * configuration value
 */
export type WebhookConfigValue = {
    /**
     * public value to use in webhook template
     */
    value?: BoxedString;
    /**
     * private value stored in secret to use in webhook template
     */
    secret?: SecretRef;
};


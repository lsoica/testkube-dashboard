/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
/**
 * parameter definition
 */
export type WebhookParameterSchema = {
    /**
     * unique parameter name
     */
    name: string;
    /**
     * description for the parameter
     */
    description?: string;
    /**
     * whether parameter is required
     */
    required?: boolean;
    /**
     * example value for the parameter
     */
    example?: string;
    default?: BoxedString;
    /**
     * regular expression to match
     */
    pattern?: string;
};


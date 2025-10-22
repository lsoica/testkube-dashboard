/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedInteger } from './BoxedInteger';
import type { BoxedString } from './BoxedString';
import type { TestWorkflowParameterType } from './TestWorkflowParameterType';
export type TestWorkflowParameterSchema = {
    /**
     * human-readable description for the property
     */
    description?: string;
    type: TestWorkflowParameterType;
    /**
     * list of acceptable values
     */
    enum?: Array<string>;
    /**
     * example value for the parameter
     */
    example?: string;
    default?: BoxedString;
    /**
     * predefined format for the string
     */
    format?: string;
    /**
     * regular expression to match
     */
    pattern?: string;
    minLength?: BoxedInteger;
    maxLength?: BoxedInteger;
    minimum?: BoxedInteger;
    maximum?: BoxedInteger;
    exclusiveMinimum?: BoxedInteger;
    exclusiveMaximum?: BoxedInteger;
    multipleOf?: BoxedInteger;
    /**
     * whether this value should be stored in the secret
     */
    sensitive?: boolean;
};


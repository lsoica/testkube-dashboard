/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { EnvVarSource } from './EnvVarSource';
export type EnvVar = {
    global?: BoxedBoolean;
    name?: string;
    value?: string;
    valueFrom?: EnvVarSource;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigMapRef } from './ConfigMapRef';
import type { SecretRef } from './SecretRef';
import type { VariableType } from './VariableType';
export type Variable = {
    name?: string;
    value?: string;
    type?: VariableType;
    secretRef?: SecretRef;
    configMapRef?: ConfigMapRef;
};


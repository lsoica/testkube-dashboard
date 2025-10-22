/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigMapEnvSource } from './ConfigMapEnvSource';
import type { SecretEnvSource } from './SecretEnvSource';
export type EnvFromSource = {
    prefix?: string;
    configMapRef?: ConfigMapEnvSource;
    secretRef?: SecretEnvSource;
};


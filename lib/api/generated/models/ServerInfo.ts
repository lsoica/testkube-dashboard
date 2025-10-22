/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Features } from './Features';
import type { SecretConfig } from './SecretConfig';
/**
 * Server information with build version, build commit etc.
 */
export type ServerInfo = {
    /**
     * build version
     */
    version: string;
    /**
     * build commit
     */
    commit?: string;
    /**
     * server installaton namespace
     */
    namespace?: string;
    /**
     * cluster id
     */
    clusterId?: string;
    /**
     * currently configured testkube API context
     */
    context?: string;
    /**
     * cloud organization id
     */
    orgId?: string;
    /**
     * cloud env id
     */
    envId?: string;
    /**
     * helm chart version
     */
    helmchartVersion?: string;
    /**
     * dashboard uri
     */
    dashboardUri?: string;
    /**
     * enable secret endpoint to list secrets in namespace
     * @deprecated
     */
    enableSecretEndpoint?: boolean;
    /**
     * disable secret creation for tests and test sources
     * @deprecated
     */
    disableSecretCreation?: boolean;
    secret?: SecretConfig;
    features?: Features;
    /**
     * execution namespaces
     */
    executionNamespaces?: Array<string>;
    /**
     * docker image version
     */
    dockerImageVersion?: string;
};


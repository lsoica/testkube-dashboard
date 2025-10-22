/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactRequest } from './ArtifactRequest';
import type { EnvReference } from './EnvReference';
import type { LocalObjectReference } from './LocalObjectReference';
import type { Variables } from './Variables';
export type TestWorkflowStepExecuteTestExecutionRequest = {
    /**
     * test execution custom name
     */
    name?: string;
    /**
     * test execution labels
     */
    executionLabels?: Record<string, string>;
    /**
     * in case the variables file is too big, it will be uploaded
     */
    isVariablesFileUploaded?: boolean;
    /**
     * variables file content - need to be in format for particular executor (e.g. postman envs file)
     */
    variablesFile?: string;
    variables?: Variables;
    /**
     * test secret uuid
     */
    readonly testSecretUUID?: string;
    /**
     * executor image command
     */
    command?: Array<string>;
    /**
     * additional executor binary arguments
     */
    args?: Array<string>;
    /**
     * usage mode for arguments
     */
    argsMode?: TestWorkflowStepExecuteTestExecutionRequest.argsMode;
    /**
     * container image, executor will run inside this image
     */
    image?: string;
    /**
     * container image pull secrets
     */
    imagePullSecrets?: Array<LocalObjectReference>;
    /**
     * whether to start execution sync or async
     */
    sync?: boolean;
    /**
     * http proxy for executor containers
     */
    httpProxy?: string;
    /**
     * https proxy for executor containers
     */
    httpsProxy?: string;
    /**
     * whether to run test as negative test
     */
    negativeTest?: boolean;
    /**
     * duration in seconds the test may be active, until its stopped
     */
    activeDeadlineSeconds?: number;
    /**
     * configuration parameters for storing test artifacts
     */
    artifactRequest?: ArtifactRequest;
    /**
     * job template extensions
     */
    jobTemplate?: string;
    /**
     * cron job template extensions
     */
    cronJobTemplate?: string;
    /**
     * script to run before test execution
     */
    preRunScript?: string;
    /**
     * script to run after test execution
     */
    postRunScript?: string;
    /**
     * execute post run script before scraping (prebuilt executor only)
     */
    executePostRunScriptBeforeScraping?: boolean;
    /**
     * run scripts using source command (container executor only)
     */
    sourceScripts?: boolean;
    /**
     * scraper template extensions
     */
    scraperTemplate?: string;
    /**
     * pvc template extensions
     */
    pvcTemplate?: string;
    /**
     * config map references
     */
    envConfigMaps?: Array<EnvReference>;
    /**
     * secret references
     */
    envSecrets?: Array<EnvReference>;
    /**
     * namespace for test execution (Pro edition only)
     */
    executionNamespace?: string;
};
export namespace TestWorkflowStepExecuteTestExecutionRequest {
    /**
     * usage mode for arguments
     */
    export enum argsMode {
        APPEND = 'append',
        OVERRIDE = 'override',
        REPLACE = 'replace',
    }
}


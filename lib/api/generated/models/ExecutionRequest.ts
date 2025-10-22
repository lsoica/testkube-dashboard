/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactRequest } from './ArtifactRequest';
import type { EnvReference } from './EnvReference';
import type { LocalObjectReference } from './LocalObjectReference';
import type { PodRequest } from './PodRequest';
import type { RunningContext } from './RunningContext';
import type { TestContentRequest } from './TestContentRequest';
import type { Variables } from './Variables';
/**
 * test execution request body
 */
export type ExecutionRequest = {
    /**
     * execution id
     */
    id?: string;
    /**
     * test execution custom name
     */
    name?: string;
    /**
     * unique test suite name (CRD Test suite name), if it's run as a part of test suite
     */
    testSuiteName?: string;
    /**
     * test execution number
     */
    number?: number;
    /**
     * test execution labels
     */
    executionLabels?: Record<string, string>;
    /**
     * test kubernetes namespace ("testkube" when not set)
     */
    namespace?: string;
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
     * test suite secret uuid, if it's run as a part of test suite
     */
    readonly testSuiteSecretUUID?: string;
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
    args_mode?: ExecutionRequest.args_mode;
    /**
     * container image, executor will run inside this image
     */
    image?: string;
    /**
     * container image pull secrets
     */
    imagePullSecrets?: Array<LocalObjectReference>;
    /**
     * Environment variables passed to executor. Deprecated: use Basic Variables instead
     * @deprecated
     */
    envs?: Record<string, string>;
    /**
     * Execution variables passed to executor from secrets. Deprecated: use Secret Variables instead
     * @deprecated
     */
    secretEnvs?: Record<string, string>;
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
     * whether negativeTest was changed by user
     */
    isNegativeTestChangedOnRun?: boolean;
    /**
     * duration in seconds the test may be active, until its stopped
     */
    activeDeadlineSeconds?: number;
    /**
     * list of file paths that need to be copied into the test from uploads
     */
    uploads?: Array<string>;
    /**
     * minio bucket name to get uploads from
     */
    bucketName?: string;
    /**
     * configuration parameters for storing test artifacts
     */
    artifactRequest?: ArtifactRequest;
    /**
     * job template extensions
     */
    jobTemplate?: string;
    /**
     * name of the template resource
     */
    jobTemplateReference?: string;
    /**
     * cron job template extensions
     */
    cronJobTemplate?: string;
    /**
     * name of the template resource
     */
    cronJobTemplateReference?: string;
    /**
     * adjusting parameters for test content
     */
    contentRequest?: TestContentRequest;
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
     * name of the template resource
     */
    scraperTemplateReference?: string;
    /**
     * pvc template extensions
     */
    pvcTemplate?: string;
    /**
     * name of the template resource
     */
    pvcTemplateReference?: string;
    /**
     * config map references
     */
    envConfigMaps?: Array<EnvReference>;
    /**
     * secret references
     */
    envSecrets?: Array<EnvReference>;
    /**
     * running context for the test execution
     */
    runningContext?: RunningContext;
    /**
     * test execution name started the test execution
     */
    testExecutionName?: string;
    /**
     * execution ids for artifacts to download
     */
    downloadArtifactExecutionIDs?: Array<string>;
    /**
     * test names for artifacts to download from latest executions
     */
    downloadArtifactTestNames?: Array<string>;
    /**
     * configuration parameters for executed slave pods
     */
    slavePodRequest?: PodRequest;
    /**
     * namespace for test execution (Pro edition only)
     */
    executionNamespace?: string;
    /**
     * whether webhooks on this execution are disabled
     */
    disableWebhooks?: boolean;
};
export namespace ExecutionRequest {
    /**
     * usage mode for arguments
     */
    export enum args_mode {
        APPEND = 'append',
        OVERRIDE = 'override',
        REPLACE = 'replace',
    }
}


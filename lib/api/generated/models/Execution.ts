/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactRequest } from './ArtifactRequest';
import type { ExecutionResult } from './ExecutionResult';
import type { PodRequest } from './PodRequest';
import type { RunningContext } from './RunningContext';
import type { TestContent } from './TestContent';
import type { Variables } from './Variables';
/**
 * test execution
 */
export type Execution = {
    /**
     * execution id
     */
    id?: string;
    /**
     * unique test name (CRD Test name)
     */
    testName?: string;
    /**
     * unique test suite name (CRD Test suite name), if it's run as a part of test suite
     */
    testSuiteName?: string;
    /**
     * test namespace
     */
    testNamespace?: string;
    /**
     * test type e.g. postman/collection
     */
    testType?: string;
    /**
     * execution name
     */
    name?: string;
    /**
     * execution number
     */
    number?: number;
    /**
     * Environment variables passed to executor. Deprecated: use Basic Variables instead
     * @deprecated
     */
    envs?: Record<string, string>;
    /**
     * executor image command
     */
    command?: Array<string>;
    /**
     * additional arguments/flags passed to executor binary
     */
    args?: Array<string>;
    /**
     * usage mode for arguments
     */
    args_mode?: Execution.args_mode;
    variables?: Variables;
    /**
     * in case the variables file is too big, it will be uploaded to storage
     */
    isVariablesFileUploaded?: boolean;
    /**
     * variables file content - need to be in format for particular executor (e.g. postman envs file)
     */
    variablesFile?: string;
    /**
     * test secret uuid
     */
    readonly testSecretUUID?: string;
    /**
     * test suite secret uuid, if it's run as a part of test suite
     */
    readonly testSuiteSecretUUID?: string;
    content?: TestContent;
    /**
     * test start time
     */
    startTime?: string;
    /**
     * test end time
     */
    endTime?: string;
    /**
     * test duration
     */
    duration?: string;
    /**
     * test duration in milliseconds
     */
    durationMs?: number;
    /**
     * result get from executor
     */
    executionResult?: ExecutionResult;
    /**
     * test and execution labels
     */
    labels?: Record<string, string>;
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
     * running context for the test execution
     */
    runningContext?: RunningContext;
    /**
     * shell used in container executor
     */
    containerShell?: string;
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
export namespace Execution {
    /**
     * usage mode for arguments
     */
    export enum args_mode {
        APPEND = 'append',
        OVERRIDE = 'override',
        REPLACE = 'replace',
    }
}


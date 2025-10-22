/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RunningContext } from './RunningContext';
import type { TestContentRequest } from './TestContentRequest';
import type { Variables } from './Variables';
/**
 * test suite execution request body
 */
export type TestSuiteExecutionRequest = {
    /**
     * test execution custom name
     */
    name?: string;
    /**
     * test suite execution number
     */
    number?: number;
    /**
     * test kubernetes namespace ("testkube" when not set)
     */
    namespace?: string;
    variables?: Variables;
    /**
     * secret uuid
     */
    readonly secretUUID?: string;
    /**
     * test suite labels
     */
    labels?: Record<string, string>;
    /**
     * execution labels
     */
    executionLabels?: Record<string, string>;
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
     * duration in seconds the test suite may be active, until its stopped
     */
    timeout?: number;
    /**
     * adjusting parameters for test content
     */
    contentRequest?: TestContentRequest;
    /**
     * running context for the test suite execution
     */
    runningContext?: RunningContext;
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
     * number of tests run in parallel
     */
    concurrencyLevel?: number;
    /**
     * test suite execution name started the test suite execution
     */
    testSuiteExecutionName?: string;
    /**
     * whether webhooks on the execution of this test suite are disabled
     */
    disableWebhooks?: boolean;
};


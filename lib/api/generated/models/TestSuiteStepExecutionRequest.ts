/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RunningContext } from './RunningContext';
import type { Variables } from './Variables';
/**
 * test step execution request body
 */
export type TestSuiteStepExecutionRequest = {
    /**
     * test execution labels
     */
    executionLabels?: Record<string, string>;
    variables?: Variables;
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
    args_mode?: TestSuiteStepExecutionRequest.args_mode;
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
     * running context for the test execution
     */
    runningContext?: RunningContext;
    /**
     * whether webhooks on the execution of this step are disabled
     */
    disableWebhooks?: boolean;
};
export namespace TestSuiteStepExecutionRequest {
    /**
     * usage mode for arguments
     */
    export enum args_mode {
        APPEND = 'append',
        OVERRIDE = 'override',
        REPLACE = 'replace',
    }
}


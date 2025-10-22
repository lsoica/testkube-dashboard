/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * running context for test or test suite execution
 */
export type RunningContext = {
    /**
     * One of possible context types
     */
    type: RunningContext.type;
    /**
     * Context value depending from its type
     */
    context?: string;
};
export namespace RunningContext {
    /**
     * One of possible context types
     */
    export enum type {
        USER_CLI = 'userCLI',
        USER_UI = 'userUI',
        TESTSUITE = 'testsuite',
        TESTTRIGGER = 'testtrigger',
        SCHEDULER = 'scheduler',
        TESTWORKFLOW = 'testworkflow',
    }
}


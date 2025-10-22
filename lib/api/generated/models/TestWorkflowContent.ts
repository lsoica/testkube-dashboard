/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowContentFile } from './TestWorkflowContentFile';
import type { TestWorkflowContentGit } from './TestWorkflowContentGit';
import type { TestWorkflowContentTarball } from './TestWorkflowContentTarball';
export type TestWorkflowContent = {
    git?: TestWorkflowContentGit;
    files?: Array<TestWorkflowContentFile>;
    tarball?: Array<TestWorkflowContentTarball>;
};


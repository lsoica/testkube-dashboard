/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowTarballFilePattern } from './TestWorkflowTarballFilePattern';
export type TestWorkflowStepParallelFetch = {
    /**
     * path to fetch files from
     */
    from: string;
    /**
     * path to save the files to
     */
    to?: string;
    files?: TestWorkflowTarballFilePattern;
};


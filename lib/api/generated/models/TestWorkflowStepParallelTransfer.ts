/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { TestWorkflowTarballFilePattern } from './TestWorkflowTarballFilePattern';
export type TestWorkflowStepParallelTransfer = {
    /**
     * path to load the files from
     */
    from: string;
    /**
     * path to save the files to
     */
    to?: string;
    files?: TestWorkflowTarballFilePattern;
    mount?: BoxedBoolean;
};


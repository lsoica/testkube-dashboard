/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
import type { TestWorkflowStepArtifactsCompression } from './TestWorkflowStepArtifactsCompression';
export type TestWorkflowStepArtifacts = {
    workingDir?: BoxedString;
    compress?: TestWorkflowStepArtifactsCompression;
    /**
     * file paths to fetch from the container
     */
    paths: Array<string>;
};


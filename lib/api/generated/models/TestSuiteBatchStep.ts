/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DownloadArtifactOptions } from './DownloadArtifactOptions';
import type { TestSuiteStep } from './TestSuiteStep';
/**
 * set of steps run in parallel
 */
export type TestSuiteBatchStep = {
    stopOnFailure: boolean;
    downloadArtifacts?: DownloadArtifactOptions;
    execute?: Array<TestSuiteStep>;
};


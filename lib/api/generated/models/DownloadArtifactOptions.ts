/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * options to download artifacts from previous steps
 */
export type DownloadArtifactOptions = {
    allPreviousSteps?: boolean;
    /**
     * previous step numbers starting from 1
     */
    previousStepNumbers?: Array<number>;
    /**
     * previous test names
     */
    previousTestNames?: Array<string>;
};


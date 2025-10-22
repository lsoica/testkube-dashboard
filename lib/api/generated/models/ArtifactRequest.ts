/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * artifact request body with test artifacts
 */
export type ArtifactRequest = {
    /**
     * artifact storage class name for container executor
     */
    storageClassName?: string;
    /**
     * artifact volume mount path for container executor
     */
    volumeMountPath?: string;
    /**
     * artifact directories for scraping
     */
    dirs?: Array<string>;
    /**
     * regexp to filter scraped artifacts, single or comma separated
     */
    masks?: Array<string>;
    /**
     * artifact bucket storage
     */
    storageBucket?: string;
    /**
     * don't use a separate folder for execution artifacts
     */
    omitFolderPerExecution?: boolean;
    /**
     * whether to share volume between pods
     */
    sharedBetweenPods?: boolean;
    /**
     * whether to use default storage class name
     */
    useDefaultStorageClassName?: boolean;
    /**
     * run scraper as pod sidecar container
     */
    sidecarScraper?: boolean;
};


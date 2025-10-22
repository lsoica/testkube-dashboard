/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * API server artifact
 */
export type Artifact = {
    /**
     * artifact file path
     */
    name?: string;
    /**
     * file size in bytes
     */
    size?: number;
    /**
     * execution name that produced the artifact
     */
    executionName?: string;
    status?: Artifact.status;
};
export namespace Artifact {
    export enum status {
        READY = 'ready',
        PROCESSING = 'processing',
        FAILED = 'failed',
    }
}


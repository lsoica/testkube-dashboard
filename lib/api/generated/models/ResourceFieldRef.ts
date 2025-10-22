/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
 */
export type ResourceFieldRef = {
    /**
     * Container name: required for volumes, optional for env vars
     */
    containerName?: string;
    divisor?: string;
    /**
     * Required: resource to select
     */
    resource: string;
};


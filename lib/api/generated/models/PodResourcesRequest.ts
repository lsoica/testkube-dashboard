/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceRequest } from './ResourceRequest';
/**
 * pod resources request specification
 */
export type PodResourcesRequest = {
    /**
     * pod resources requests
     */
    requests?: ResourceRequest;
    /**
     * pod resources limits
     */
    limits?: ResourceRequest;
};


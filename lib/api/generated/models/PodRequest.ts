/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PodResourcesRequest } from './PodResourcesRequest';
/**
 * pod request body
 */
export type PodRequest = {
    /**
     * pod resources request parameters
     */
    resources?: PodResourcesRequest;
    /**
     * pod template extensions
     */
    podTemplate?: string;
    /**
     * name of the template resource
     */
    podTemplateReference?: string;
};


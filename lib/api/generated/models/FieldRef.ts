/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
 */
export type FieldRef = {
    /**
     * Version of the schema the FieldPath is written in terms of, defaults to "v1".
     */
    apiVersion?: string;
    /**
     * Path of the field to select in the specified API version.
     */
    fieldPath: string;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
 */
export type AzureFileVolumeSource = {
    /**
     * readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readOnly?: boolean;
    /**
     * secretName is the  name of secret that contains Azure Storage Account Name and Key
     */
    secretName: string;
    /**
     * shareName is the azure share Name
     */
    shareName: string;
};


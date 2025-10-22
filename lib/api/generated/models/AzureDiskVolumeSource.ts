/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
/**
 * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
 */
export type AzureDiskVolumeSource = {
    cachingMode?: BoxedString;
    /**
     * diskName is the Name of the data disk in the blob storage
     */
    diskName: string;
    /**
     * diskURI is the URI of data disk in the blob storage
     */
    diskURI: string;
    fsType?: BoxedString;
    kind?: BoxedString;
    /**
     * readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readOnly?: boolean;
};


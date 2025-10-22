/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedString } from './BoxedString';
import type { LocalObjectReference } from './LocalObjectReference';
/**
 * Represents a source location of a volume to mount, managed by an external CSI driver
 */
export type CSIVolumeSource = {
    /**
     * driver is the name of the CSI driver that handles this volume.
     */
    driver?: string;
    readOnly?: BoxedBoolean;
    fsType?: BoxedString;
    /**
     * volumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver's documentation for supported values.
     */
    volumeAttributes?: Record<string, string>;
    nodePublishSecretRef?: LocalObjectReference;
};


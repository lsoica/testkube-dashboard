/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
import type { LabelSelector } from './LabelSelector';
import type { TestWorkflowResources } from './TestWorkflowResources';
import type { TypedLocalObjectReference } from './TypedLocalObjectReference';
import type { TypedObjectReference } from './TypedObjectReference';
export type TestWorkflowPvcConfig = {
    /**
     * Access mode for claim storage. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes
     */
    accessModes?: Array<string>;
    /**
     * Volume mode indicates the consumption of the volume as either a filesystem or block device. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#volume-mode
     */
    volumeMode?: BoxedString;
    /**
     * Resources required for pvc
     */
    resources?: TestWorkflowResources;
    /**
     * Storage class name specifies the name of a StorageClass. More info: https://kubernetes.io/docs/concepts/storage/storage-classes/
     */
    storageClassName?: BoxedString;
    /**
     * Volume name is used to identify the volume
     */
    volumeName?: string;
    /**
     * Only the volumes whose labels match the selector can be bound to the claim
     */
    selector?: LabelSelector;
    /**
     * Data source field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim)
     */
    dataSource?: TypedLocalObjectReference;
    /**
     * Data source reference specifies the object from which to populate the volume with data, if a non-empty volume is desired
     */
    dataSourceRef?: TypedObjectReference;
    /**
     * Volume attributes class name may be used to set the VolumeAttributesClass used by this claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#volumeattributesclass
     */
    volumeAttributesClassName?: BoxedString;
};


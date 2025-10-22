/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AWSElasticBlockStoreVolumeSource } from './AWSElasticBlockStoreVolumeSource';
import type { AzureDiskVolumeSource } from './AzureDiskVolumeSource';
import type { AzureFileVolumeSource } from './AzureFileVolumeSource';
import type { CephFSVolumeSource } from './CephFSVolumeSource';
import type { ConfigMapVolumeSource } from './ConfigMapVolumeSource';
import type { CSIVolumeSource } from './CSIVolumeSource';
import type { EmptyDirVolumeSource } from './EmptyDirVolumeSource';
import type { GCEPersistentDiskVolumeSource } from './GCEPersistentDiskVolumeSource';
import type { HostPathVolumeSource } from './HostPathVolumeSource';
import type { NFSVolumeSource } from './NFSVolumeSource';
import type { PersistentVolumeClaimVolumeSource } from './PersistentVolumeClaimVolumeSource';
import type { ProjectedVolumeSource } from './ProjectedVolumeSource';
import type { SecretVolumeSource } from './SecretVolumeSource';
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 */
export type Volume = {
    name: string;
    hostPath?: HostPathVolumeSource;
    emptyDir?: EmptyDirVolumeSource;
    gcePersistentDisk?: GCEPersistentDiskVolumeSource;
    awsElasticBlockStore?: AWSElasticBlockStoreVolumeSource;
    secret?: SecretVolumeSource;
    nfs?: NFSVolumeSource;
    persistentVolumeClaim?: PersistentVolumeClaimVolumeSource;
    cephfs?: CephFSVolumeSource;
    azureFile?: AzureFileVolumeSource;
    azureDisk?: AzureDiskVolumeSource;
    configMap?: ConfigMapVolumeSource;
    csi?: CSIVolumeSource;
    projected?: ProjectedVolumeSource;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedString } from './BoxedString';
import type { BoxedStringList } from './BoxedStringList';
import type { EnvFromSource } from './EnvFromSource';
import type { EnvVar } from './EnvVar';
import type { ImagePullPolicy } from './ImagePullPolicy';
import type { SecurityContext } from './SecurityContext';
import type { TestWorkflowResources } from './TestWorkflowResources';
import type { VolumeMount } from './VolumeMount';
export type TestWorkflowStepRun = {
    workingDir?: BoxedString;
    /**
     * image to be used for the container
     */
    image?: string;
    imagePullPolicy?: ImagePullPolicy;
    /**
     * environment variables to append to the container
     */
    env?: Array<EnvVar>;
    /**
     * external environment variables to append to the container
     */
    envFrom?: Array<EnvFromSource>;
    command?: BoxedStringList;
    args?: BoxedStringList;
    shell?: BoxedString;
    resources?: TestWorkflowResources;
    securityContext?: SecurityContext;
    /**
     * volumes to mount to the container
     */
    volumeMounts?: Array<VolumeMount>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Affinity } from './Affinity';
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedInteger } from './BoxedInteger';
import type { BoxedString } from './BoxedString';
import type { HostAlias } from './HostAlias';
import type { LocalObjectReference } from './LocalObjectReference';
import type { PodDNSConfig } from './PodDNSConfig';
import type { PodResourceClaim } from './PodResourceClaim';
import type { PodSchedulingGate } from './PodSchedulingGate';
import type { PodSecurityContext } from './PodSecurityContext';
import type { Toleration } from './Toleration';
import type { TopologySpreadConstraint } from './TopologySpreadConstraint';
import type { Volume } from './Volume';
export type TestWorkflowPodConfig = {
    /**
     * labels to attach to the pod
     */
    labels?: Record<string, string>;
    /**
     * annotations to attach to the pod
     */
    annotations?: Record<string, string>;
    /**
     * secret references for pulling images
     */
    imagePullSecrets?: Array<LocalObjectReference>;
    /**
     * default service account name for the containers
     */
    serviceAccountName?: string;
    /**
     * label selector for node that the pod should land on
     */
    nodeSelector?: Record<string, string>;
    /**
     * volumes to append to the pod
     */
    volumes?: Array<Volume>;
    activeDeadlineSeconds?: BoxedInteger;
    dnsPolicy?: string;
    nodeName?: string;
    securityContext?: PodSecurityContext;
    hostname?: string;
    subdomain?: string;
    affinity?: Affinity;
    tolerations?: Array<Toleration>;
    hostAliases?: Array<HostAlias>;
    priorityClassName?: string;
    priority?: BoxedInteger;
    dnsConfig?: PodDNSConfig;
    preemptionPolicy?: BoxedString;
    topologySpreadConstraints?: Array<TopologySpreadConstraint>;
    schedulingGates?: Array<PodSchedulingGate>;
    resourceClaims?: Array<PodResourceClaim>;
    hostPID?: BoxedBoolean;
};


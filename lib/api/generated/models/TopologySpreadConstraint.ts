/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedInteger } from './BoxedInteger';
import type { BoxedString } from './BoxedString';
import type { LabelSelector } from './LabelSelector';
export type TopologySpreadConstraint = {
    maxSkew?: number;
    topologyKey?: string;
    whenUnsatisfiable?: string;
    labelSelector?: LabelSelector;
    minDomains?: BoxedInteger;
    nodeAffinityPolicy?: BoxedString;
    nodeTaintsPolicy?: BoxedString;
    matchLabelKeys?: Array<string>;
};


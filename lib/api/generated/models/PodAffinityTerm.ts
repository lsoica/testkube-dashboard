/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LabelSelector } from './LabelSelector';
export type PodAffinityTerm = {
    labelSelector?: LabelSelector;
    namespaces?: Array<string>;
    topologyKey?: string;
    namespaceSelector?: LabelSelector;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PodAffinityTerm } from './PodAffinityTerm';
import type { WeightedPodAffinityTerm } from './WeightedPodAffinityTerm';
export type PodAffinity = {
    requiredDuringSchedulingIgnoredDuringExecution?: Array<PodAffinityTerm>;
    preferredDuringSchedulingIgnoredDuringExecution?: Array<WeightedPodAffinityTerm>;
};


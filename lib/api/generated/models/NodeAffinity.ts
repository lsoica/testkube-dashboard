/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NodeSelector } from './NodeSelector';
import type { PreferredSchedulingTerm } from './PreferredSchedulingTerm';
export type NodeAffinity = {
    requiredDuringSchedulingIgnoredDuringExecution?: NodeSelector;
    preferredDuringSchedulingIgnoredDuringExecution?: Array<PreferredSchedulingTerm>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LabelSelectorRequirement } from './LabelSelectorRequirement';
export type LabelSelector = {
    matchLabels?: Record<string, string>;
    matchExpressions?: Array<LabelSelectorRequirement>;
};


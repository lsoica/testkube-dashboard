/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TemplateType } from './TemplateType';
/**
 * Golang based template
 */
export type Template = {
    /**
     * template name for reference
     */
    name: string;
    /**
     * template namespace
     */
    namespace?: string;
    type: TemplateType;
    /**
     * template body to use
     */
    body: string;
    /**
     * template labels
     */
    labels?: Record<string, string>;
};


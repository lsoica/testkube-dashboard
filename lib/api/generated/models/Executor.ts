/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExecutorMeta } from './ExecutorMeta';
import type { LocalObjectReference } from './LocalObjectReference';
import type { SlavesMeta } from './SlavesMeta';
/**
 * CRD based executor data
 */
export type Executor = {
    /**
     * ExecutorType one of "rest" for rest openapi based executors or "job" which will be default runners for testkube soon
     */
    executorType?: string;
    /**
     * Image for kube-job
     */
    image?: string;
    slaves?: SlavesMeta;
    /**
     * container image pull secrets
     */
    imagePullSecrets?: Array<LocalObjectReference>;
    /**
     * executor image command
     */
    command?: Array<string>;
    /**
     * additional executor binary argument
     */
    args?: Array<string>;
    /**
     * Types defines what types can be handled by executor e.g. "postman/collection", ":curl/command" etc
     */
    types?: Array<string>;
    /**
     * URI for rest based executors
     */
    uri?: string;
    /**
     * list of handled content types
     */
    contentTypes?: Array<string>;
    /**
     * Job template to launch executor
     */
    jobTemplate?: string;
    /**
     * name of the template resource
     */
    jobTemplateReference?: string;
    /**
     * executor labels
     */
    labels?: Record<string, string>;
    /**
     * Available executor features
     */
    features?: Array<'artifacts' | 'junit-report'>;
    meta?: ExecutorMeta;
    /**
     * use data dir as working dir for executor
     */
    useDataDirAsWorkingDir?: boolean;
};


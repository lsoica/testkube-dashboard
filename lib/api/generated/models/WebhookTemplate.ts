/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventType } from './EventType';
import type { WebhookConfig } from './WebhookConfig';
import type { WebhookParameterSchema } from './WebhookParameterSchema';
/**
 * CRD based webhook data template
 */
export type WebhookTemplate = {
    name: string;
    namespace?: string;
    uri?: string;
    events?: Array<EventType>;
    /**
     * Labels to filter for tests and test suites
     */
    selector?: string;
    /**
     * will load the generated payload for notification inside the object
     */
    payloadObjectField?: string;
    /**
     * golang based template for notification payload
     */
    payloadTemplate?: string;
    /**
     * name of the template resource
     */
    payloadTemplateReference?: string;
    /**
     * webhook headers (golang template supported)
     */
    headers?: Record<string, string>;
    /**
     * webhook labels
     */
    labels?: Record<string, string>;
    /**
     * webhook annotations
     */
    annotations?: Record<string, string>;
    /**
     * whether webhook is disabled
     */
    disabled?: boolean;
    config?: WebhookConfig;
    parameters?: Array<WebhookParameterSchema>;
};


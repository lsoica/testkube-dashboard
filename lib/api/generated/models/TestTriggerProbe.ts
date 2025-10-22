/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * supported probe for test triggers
 */
export type TestTriggerProbe = {
    /**
     * test trigger condition probe scheme to connect to host, default is http
     */
    scheme?: string;
    /**
     * test trigger condition probe host, default is pod ip or service name
     */
    host?: string;
    /**
     * test trigger condition probe path to check, default is /
     */
    path?: string;
    /**
     * test trigger condition probe port to connect
     */
    port?: number;
    /**
     * test trigger condition probe headers to submit
     */
    headers?: Record<string, string>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestContent } from './TestContent';
/**
 * Test source resource for shared test content
 */
export type TestSource = (TestContent & {
    /**
     * test source name
     */
    name?: string;
    /**
     * test source namespace
     */
    namespace?: string;
    /**
     * test source labels
     */
    labels?: Record<string, string>;
});


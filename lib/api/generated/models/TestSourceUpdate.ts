/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestContent } from './TestContent';
/**
 * Test source resource update for shared test content
 */
export type TestSourceUpdate = (TestContent & {
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
}) | null;


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowReportSummary } from './TestWorkflowReportSummary';
export type TestWorkflowReport = {
    /**
     * step reference
     */
    ref?: string;
    /**
     * report kind/type
     */
    kind?: TestWorkflowReport.kind;
    /**
     * file path to full report in artifact storage
     */
    file?: string;
    summary?: TestWorkflowReportSummary;
};
export namespace TestWorkflowReport {
    /**
     * report kind/type
     */
    export enum kind {
        JUNIT = 'junit',
    }
}


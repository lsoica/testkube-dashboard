/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestWorkflowExecutionConfig } from './TestWorkflowExecutionConfig';
import type { TestWorkflowExecutionResourceAggregationsReport } from './TestWorkflowExecutionResourceAggregationsReport';
import type { TestWorkflowExecutionRuntime } from './TestWorkflowExecutionRuntime';
import type { TestWorkflowReport } from './TestWorkflowReport';
import type { TestWorkflowResultSummary } from './TestWorkflowResultSummary';
import type { TestWorkflowRunningContext } from './TestWorkflowRunningContext';
import type { TestWorkflowSummary } from './TestWorkflowSummary';
import type { TestWorkflowTagValue } from './TestWorkflowTagValue';
export type TestWorkflowExecutionSummary = {
    /**
     * unique execution identifier
     */
    id: string;
    /**
     * identifier for group of correlated executions
     */
    groupId?: string;
    /**
     * identifier of the runner where it has been executed
     */
    runnerId?: string;
    /**
     * execution name
     */
    name: string;
    /**
     * sequence number for the execution
     */
    number?: number;
    /**
     * when the execution has been scheduled to run
     */
    scheduledAt?: string;
    /**
     * when the execution result's status has changed last time (queued, passed, failed)
     */
    statusAt?: string;
    result?: TestWorkflowResultSummary;
    workflow: TestWorkflowSummary;
    tags?: TestWorkflowTagValue;
    /**
     * running context for the test workflow execution (Pro edition only)
     */
    runningContext?: TestWorkflowRunningContext;
    configParams?: TestWorkflowExecutionConfig;
    runtime?: TestWorkflowExecutionRuntime;
    /**
     * generated reports from the steps, like junit
     */
    reports?: Array<TestWorkflowReport>;
    resourceAggregations?: TestWorkflowExecutionResourceAggregationsReport;
};


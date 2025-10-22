/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Artifact } from '../models/Artifact';
import type { Execution } from '../models/Execution';
import type { ExecutionRequest } from '../models/ExecutionRequest';
import type { ExecutionResult } from '../models/ExecutionResult';
import type { ExecutionsMetrics } from '../models/ExecutionsMetrics';
import type { ExecutionsResult } from '../models/ExecutionsResult';
import type { ExecutionStatus } from '../models/ExecutionStatus';
import type { Executor } from '../models/Executor';
import type { ExecutorDetails } from '../models/ExecutorDetails';
import type { ExecutorOutput } from '../models/ExecutorOutput';
import type { ExecutorUpdateRequest } from '../models/ExecutorUpdateRequest';
import type { ExecutorUpsertRequest } from '../models/ExecutorUpsertRequest';
import type { LogV2 } from '../models/LogV2';
import type { Template } from '../models/Template';
import type { TemplateCreateRequest } from '../models/TemplateCreateRequest';
import type { TemplateUpdateRequest } from '../models/TemplateUpdateRequest';
import type { Test } from '../models/Test';
import type { TestSource } from '../models/TestSource';
import type { TestSourceBatchRequest } from '../models/TestSourceBatchRequest';
import type { TestSourceBatchResult } from '../models/TestSourceBatchResult';
import type { TestSourceUpdateRequest } from '../models/TestSourceUpdateRequest';
import type { TestSourceUpsertRequest } from '../models/TestSourceUpsertRequest';
import type { TestSuite } from '../models/TestSuite';
import type { TestSuiteExecution } from '../models/TestSuiteExecution';
import type { TestSuiteExecutionRequest } from '../models/TestSuiteExecutionRequest';
import type { TestSuiteExecutionsResult } from '../models/TestSuiteExecutionsResult';
import type { TestSuiteExecutionStatus } from '../models/TestSuiteExecutionStatus';
import type { TestSuiteUpdateRequest } from '../models/TestSuiteUpdateRequest';
import type { TestSuiteUpsertRequest } from '../models/TestSuiteUpsertRequest';
import type { TestSuiteWithExecution } from '../models/TestSuiteWithExecution';
import type { TestSuiteWithExecutionSummary } from '../models/TestSuiteWithExecutionSummary';
import type { TestTrigger } from '../models/TestTrigger';
import type { TestTriggerUpsertRequest } from '../models/TestTriggerUpsertRequest';
import type { TestUpdateRequest } from '../models/TestUpdateRequest';
import type { TestUpsertRequest } from '../models/TestUpsertRequest';
import type { TestWithExecution } from '../models/TestWithExecution';
import type { TestWithExecutionSummary } from '../models/TestWithExecutionSummary';
import type { TestWorkflow } from '../models/TestWorkflow';
import type { TestWorkflowExecution } from '../models/TestWorkflowExecution';
import type { TestWorkflowExecutionRequest } from '../models/TestWorkflowExecutionRequest';
import type { TestWorkflowExecutionsResult } from '../models/TestWorkflowExecutionsResult';
import type { TestWorkflowRunningContext } from '../models/TestWorkflowRunningContext';
import type { TestWorkflowTemplate } from '../models/TestWorkflowTemplate';
import type { TestWorkflowWithExecution } from '../models/TestWorkflowWithExecution';
import type { TestWorkflowWithExecutionSummary } from '../models/TestWorkflowWithExecutionSummary';
import type { Webhook } from '../models/Webhook';
import type { WebhookCreateRequest } from '../models/WebhookCreateRequest';
import type { WebhookTemplate } from '../models/WebhookTemplate';
import type { WebhookTemplateCreateRequest } from '../models/WebhookTemplateCreateRequest';
import type { WebhookTemplateUpdateRequest } from '../models/WebhookTemplateUpdateRequest';
import type { WebhookUpdateRequest } from '../models/WebhookUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * List test triggers
     * List test triggers from the kubernetes cluster
     * @param namespace
     * @param selector
     * @returns TestTrigger successful list operation
     * @throws ApiError
     */
    public static listTestTriggers(
        namespace: string = 'testkube',
        selector?: string,
    ): CancelablePromise<Array<TestTrigger>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/triggers',
            query: {
                'namespace': namespace,
                'selector': selector,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Create new test trigger
     * Create new test trigger CRD inside a Kubernetes cluster
     * @param requestBody test trigger body
     * @returns TestTrigger successful operation
     * @throws ApiError
     */
    public static createTestTrigger(
        requestBody: TestTriggerUpsertRequest,
    ): CancelablePromise<TestTrigger> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/triggers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test trigger definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Bulk update test triggers
     * Updates test triggers provided as an array in the request body
     * @param requestBody array of test trigger upsert requests
     * @returns TestTrigger successful operation
     * @throws ApiError
     */
    public static bulkUpdateTestTriggers(
        requestBody: Array<TestTriggerUpsertRequest>,
    ): CancelablePromise<Array<TestTrigger>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/triggers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test trigger definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test triggers
     * Deletes all or labeled test triggers
     * @param namespace
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteTestTriggers(
        namespace: string = 'testkube',
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/triggers',
            query: {
                'namespace': namespace,
                'selector': selector,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                404: `test trigger not found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test trigger by ID
     * Get test trigger by ID from CRD in kubernetes cluster
     * @param id unique id of the object
     * @param namespace
     * @returns TestTrigger successful operation
     * @throws ApiError
     */
    public static getTestTriggerById(
        id: string,
        namespace: string = 'testkube',
    ): CancelablePromise<TestTrigger> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/triggers/{id}',
            path: {
                'id': id,
            },
            query: {
                'namespace': namespace,
            },
            errors: {
                404: `test trigger not found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update test trigger
     * Update test trigger
     * @param id unique id of the object
     * @param requestBody test trigger upsert request
     * @param namespace
     * @returns TestTrigger successful operation
     * @throws ApiError
     */
    public static updateTestTrigger(
        id: string,
        requestBody: TestTriggerUpsertRequest,
        namespace: string = 'testkube',
    ): CancelablePromise<TestTrigger> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/triggers/{id}',
            path: {
                'id': id,
            },
            query: {
                'namespace': namespace,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test trigger definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `test trigger not found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test trigger
     * Deletes a test trigger
     * @param id unique id of the object
     * @param namespace
     * @returns void
     * @throws ApiError
     */
    public static deleteTestTrigger(
        id: string,
        namespace: string = 'testkube',
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/triggers/{id}',
            path: {
                'id': id,
            },
            query: {
                'namespace': namespace,
            },
            errors: {
                404: `test trigger not found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Create new test suite
     * Create new test suite action
     * @param requestBody test details body
     * @returns string successful operation
     * @returns TestSuite successful operation
     * @throws ApiError
     */
    public static createTestSuite(
        requestBody: TestSuiteUpsertRequest,
    ): CancelablePromise<string | TestSuite> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-suites',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test suite definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get all test suites
     * Returns array of test suites
     * @param selector
     * @param textSearch text to search in name and test name
     * @returns TestSuite successful operation
     * @throws ApiError
     */
    public static listTestSuites(
        selector?: string,
        textSearch: string = '',
    ): CancelablePromise<Array<TestSuite>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites',
            query: {
                'selector': selector,
                'textSearch': textSearch,
            },
            errors: {
                400: `problem with input for CRD generation`,
                502: `problem with listing test suites from kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test suites
     * Deletes all or labeled test suites
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteTestSuites(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-suites',
            query: {
                'selector': selector,
            },
            errors: {
                404: `test suite not found`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Get test suite by ID
     * Returns test suite with given name
     * @param id unique id of the object
     * @returns TestSuite successful operation
     * @throws ApiError
     */
    public static getTestSuiteById(
        id: string,
    ): CancelablePromise<TestSuite> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `test suite not found`,
                500: `could not get execution result from the database`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update test suite
     * Update test based on test suite content or git based data
     * @param id unique id of the object
     * @param requestBody test suite details body
     * @returns TestSuite successful operation
     * @throws ApiError
     */
    public static updateTestSuite(
        id: string,
        requestBody: TestSuiteUpdateRequest,
    ): CancelablePromise<TestSuite> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/test-suites/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test suite definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `test suite not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test suite
     * Deletes a test suite
     * @param id unique id of the object
     * @param skipDeleteCrd dont delete CRD
     * @returns void
     * @throws ApiError
     */
    public static deleteTestSuite(
        id: string,
        skipDeleteCrd: boolean = false,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-suites/{id}',
            path: {
                'id': id,
            },
            query: {
                'skipDeleteCRD': skipDeleteCrd,
            },
            errors: {
                404: `test suite not found`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Get test suite metrics
     * Gets test suite metrics for given tests executions, with particular execution status and timings
     * @param id unique id of the object
     * @param last last N days to show
     * @param limit limit records count same as pageSize
     * @returns ExecutionsMetrics successful operation
     * @throws ApiError
     */
    public static getTestSuiteMetrics(
        id: string,
        last: number = 7,
        limit: number = 7,
    ): CancelablePromise<ExecutionsMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites/{id}/metrics',
            path: {
                'id': id,
            },
            query: {
                'last': last,
                'limit': limit,
            },
            errors: {
                500: `problem with read information from storage`,
            },
        });
    }
    /**
     * List tests for test suite
     * List available tests for test suite
     * @param id unique id of the object
     * @returns Test successful operation
     * @throws ApiError
     */
    public static listTestSuiteTests(
        id: string,
    ): CancelablePromise<Array<Test>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites/{id}/tests',
            path: {
                'id': id,
            },
            errors: {
                404: `test suite not found`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Abort all executions of a test suite
     * Abort all test executions of a test suite
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static abortTestSuiteExecutions(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-suites/{id}/abort',
            path: {
                'id': id,
            },
            errors: {
                404: `no execution found`,
                500: `problem with aborting test suite execution`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Starts new test suite execution
     * New test suite execution returns new execution details on successful execution start
     * @param id unique id of the object
     * @param requestBody body passed to configure execution
     * @param namespace
     * @param last last N days to show
     * @param testSuiteExecutionName
     * @returns TestSuiteExecutionsResult successful operation
     * @throws ApiError
     */
    public static executeTestSuite(
        id: string,
        requestBody: TestSuiteExecutionRequest,
        namespace: string = 'testkube',
        last: number = 7,
        testSuiteExecutionName?: string,
    ): CancelablePromise<TestSuiteExecutionsResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-suites/{id}/executions',
            path: {
                'id': id,
            },
            query: {
                'namespace': namespace,
                'last': last,
                'testSuiteExecutionName': testSuiteExecutionName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with request body`,
                404: `test suite not found`,
                500: `problem with test suite execution`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get all test suite executions
     * Returns array of all available test suite executions
     * @param id unique id of the object
     * @param pageSize the number of executions to get, setting to 0 will return only totals
     * @param page the page index to start at
     * @param status optional status filter containing multiple values separated by comma
     * @param startDate startDate for filtering in ISO-8601 format, i.e. "yyyy-mm-dd"
     * @param endDate endDate for filtering
     * @returns TestSuiteExecutionsResult successful operation
     * @throws ApiError
     */
    public static listTestSuiteExecutions(
        id: string,
        pageSize: number = 100,
        page?: number,
        status?: TestSuiteExecutionStatus,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<TestSuiteExecutionsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites/{id}/executions',
            path: {
                'id': id,
            },
            query: {
                'pageSize': pageSize,
                'page': page,
                'status': status,
                'startDate': startDate,
                'endDate': endDate,
            },
            errors: {
                500: `problem with getting test suite executions from storage`,
            },
        });
    }
    /**
     * Get test suite execution
     * Returns test suite execution with given executionID
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @returns TestSuiteExecution successful operation
     * @throws ApiError
     */
    public static getTestSuiteExecution(
        id: string,
        executionId: string,
    ): CancelablePromise<TestSuiteExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites/{id}/executions/{executionID}',
            path: {
                'id': id,
                'executionID': executionId,
            },
            errors: {
                404: `test not found`,
                500: `problem with getting test suite executions from storage`,
                502: `problem with communicating with Kubernetes cluster`,
            },
        });
    }
    /**
     * Aborts testsuite execution
     * Aborts testsuite execution with given executionID
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @returns void
     * @throws ApiError
     */
    public static abortTestSuiteExecution(
        id: string,
        executionId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/test-suites/{id}/executions/{executionID}',
            path: {
                'id': id,
                'executionID': executionId,
            },
            errors: {
                404: `test suite not found`,
                500: `problem with read information from storage`,
            },
        });
    }
    /**
     * Get test suite execution artifacts
     * Returns test suite execution artifacts with given executionID
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @returns Artifact successful operation
     * @throws ApiError
     */
    public static getTestSuiteExecutionArtifactsByTestsuite(
        id: string,
        executionId: string,
    ): CancelablePromise<Artifact> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suites/{id}/executions/{executionID}/artifacts',
            path: {
                'id': id,
                'executionID': executionId,
            },
            errors: {
                404: `test suite not found`,
                500: `problem with getting test suite executions from storage`,
            },
        });
    }
    /**
     * Get all test suite with executions
     * Returns array of test suite with executions
     * @param selector
     * @param textSearch text to search in name and test name
     * @param status optional status filter containing multiple values separated by comma
     * @param pageSize the number of executions to get, setting to 0 will return only totals
     * @param page the page index to start at
     * @returns TestSuiteWithExecutionSummary successful operation
     * @throws ApiError
     */
    public static listTestSuiteWithExecutions(
        selector?: string,
        textSearch: string = '',
        status?: TestSuiteExecutionStatus,
        pageSize: number = 100,
        page?: number,
    ): CancelablePromise<Array<TestSuiteWithExecutionSummary>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suite-with-executions',
            query: {
                'selector': selector,
                'textSearch': textSearch,
                'status': status,
                'pageSize': pageSize,
                'page': page,
            },
            errors: {
                400: `problem with input`,
                500: `problem with getting test suite with executions from storage`,
                502: `problem with getting test suite from Kubernetes clusteer`,
            },
        });
    }
    /**
     * Get test suite by ID with execution
     * Returns test suite with given name with execution
     * @param id unique id of the object
     * @returns TestSuiteWithExecution successful operation
     * @throws ApiError
     */
    public static getTestSuiteByIdWithExecution(
        id: string,
    ): CancelablePromise<TestSuiteWithExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suite-with-executions/{id}',
            path: {
                'id': id,
            },
            errors: {
                500: `problem with getting test suite with execution from storage`,
            },
        });
    }
    /**
     * Starts new test suite executions
     * New test suite executions returns new executions details on successful executions start
     * @param requestBody body passed to configure executions
     * @param namespace
     * @param selector
     * @param concurrency
     * @returns TestSuiteExecutionsResult successful operation
     * @throws ApiError
     */
    public static executeTestSuites(
        requestBody: TestSuiteExecutionRequest,
        namespace: string = 'testkube',
        selector?: string,
        concurrency: number = 10,
    ): CancelablePromise<Array<TestSuiteExecutionsResult>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-suite-executions',
            query: {
                'namespace': namespace,
                'selector': selector,
                'concurrency': concurrency,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with request body`,
                500: `problem with test suites executions`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get all test suite executions
     * Returns array of test suite executions
     * @param last last N days to show
     * @param test test namespaced name to filter
     * @param textSearch text to search in name and test name
     * @param pageSize the number of executions to get, setting to 0 will return only totals
     * @param page the page index to start at
     * @param status optional status filter containing multiple values separated by comma
     * @param startDate startDate for filtering in ISO-8601 format, i.e. "yyyy-mm-dd"
     * @param endDate endDate for filtering
     * @param selector
     * @returns TestSuiteExecutionsResult successful operation
     * @throws ApiError
     */
    public static listAllTestSuiteExecutions(
        last: number = 7,
        test: string = '',
        textSearch: string = '',
        pageSize: number = 100,
        page?: number,
        status?: TestSuiteExecutionStatus,
        startDate?: string,
        endDate?: string,
        selector?: string,
    ): CancelablePromise<TestSuiteExecutionsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suite-executions',
            query: {
                'last': last,
                'test': test,
                'textSearch': textSearch,
                'pageSize': pageSize,
                'page': page,
                'status': status,
                'startDate': startDate,
                'endDate': endDate,
                'selector': selector,
            },
            errors: {
                500: `problem with getting test suite executions from storage`,
            },
        });
    }
    /**
     * Get test suite execution by ID
     * Returns test suite execution with given executionID
     * @param executionId unique id of the object execution
     * @param last last N days to show
     * @returns TestSuiteExecution successful operation
     * @throws ApiError
     */
    public static getTestSuiteExecutionById(
        executionId: string,
        last: number = 7,
    ): CancelablePromise<TestSuiteExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suite-executions/{executionID}',
            path: {
                'executionID': executionId,
            },
            query: {
                'last': last,
            },
            errors: {
                500: `problem with getting test suite execution from storage`,
            },
        });
    }
    /**
     * Aborts testsuite execution
     * Aborts testsuite execution with given executionID
     * @param executionId unique id of the object execution
     * @returns void
     * @throws ApiError
     */
    public static abortTestSuiteExecutionById(
        executionId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/test-suite-executions/{executionID}',
            path: {
                'executionID': executionId,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Get test suite execution artifacts
     * Returns test suite execution artifacts with given executionID
     * @param executionId unique id of the object execution
     * @returns Artifact successful operation
     * @throws ApiError
     */
    public static getTestSuiteExecutionArtifacts(
        executionId: string,
    ): CancelablePromise<Artifact> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-suite-executions/{executionID}/artifacts',
            path: {
                'executionID': executionId,
            },
            errors: {
                500: `problem with getting test suite executions from storage`,
            },
        });
    }
    /**
     * Starts new test executions
     * New test executions returns new executions details on successful executions start
     * @param requestBody body passed to configure executions
     * @param namespace
     * @param selector
     * @param executionSelector
     * @param concurrency
     * @returns ExecutionResult successful operation
     * @throws ApiError
     */
    public static executeTests(
        requestBody: ExecutionRequest,
        namespace: string = 'testkube',
        selector?: string,
        executionSelector?: string,
        concurrency: number = 10,
    ): CancelablePromise<Array<ExecutionResult>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/executions',
            query: {
                'namespace': namespace,
                'selector': selector,
                'executionSelector': executionSelector,
                'concurrency': concurrency,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with request body`,
                404: `test not found`,
                500: `problem with test executions`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get all test executions
     * Returns array of test executions
     * @param test test namespaced name to filter
     * @param type object type
     * @param textSearch text to search in name and test name
     * @param pageSize the number of executions to get, setting to 0 will return only totals
     * @param page the page index to start at
     * @param status optional status filter containing multiple values separated by comma
     * @param startDate startDate for filtering in ISO-8601 format, i.e. "yyyy-mm-dd"
     * @param endDate endDate for filtering
     * @param selector
     * @returns ExecutionsResult successful operation
     * @throws ApiError
     */
    public static listExecutions(
        test: string = '',
        type: string = '',
        textSearch: string = '',
        pageSize: number = 100,
        page?: number,
        status?: ExecutionStatus,
        startDate?: string,
        endDate?: string,
        selector?: string,
    ): CancelablePromise<ExecutionsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions',
            query: {
                'test': test,
                'type': type,
                'textSearch': textSearch,
                'pageSize': pageSize,
                'page': page,
                'status': status,
                'startDate': startDate,
                'endDate': endDate,
                'selector': selector,
            },
            errors: {
                404: `execution not found`,
                500: `problem with getting test executions from storage`,
            },
        });
    }
    /**
     * Get test execution by ID
     * Returns execution with given executionID
     * @param executionId unique id of the object execution
     * @returns Execution successful operation
     * @throws ApiError
     */
    public static getExecutionById(
        executionId: string,
    ): CancelablePromise<Execution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions/{executionID}',
            path: {
                'executionID': executionId,
            },
            errors: {
                404: `execution not found`,
                500: `problem with getting test executions from storage`,
                502: `problem with reading secrets from kubernetes cluster`,
            },
        });
    }
    /**
     * Get execution's artifacts by ID
     * Returns artifacts of the given executionID
     * @param id unique id of the object
     * @returns Artifact successful operation
     * @throws ApiError
     */
    public static getExecutionArtifacts(
        id: string,
    ): CancelablePromise<Array<Artifact>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions/{id}/artifacts',
            path: {
                'id': id,
            },
            errors: {
                404: `execution not found`,
                500: `problem with getting execution's artifacts from storage`,
            },
        });
    }
    /**
     * Get execution's logs by ID
     * Returns logs of the given executionID
     * @param id unique id of the object
     * @returns ExecutorOutput successful operation
     * @throws ApiError
     */
    public static getExecutionLogs(
        id: string,
    ): CancelablePromise<Array<ExecutorOutput>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions/{id}/logs',
            path: {
                'id': id,
            },
            errors: {
                500: `problem with getting execution's logs`,
            },
        });
    }
    /**
     * Get execution's logs by ID version 2
     * Returns logs of the given executionID version 2
     * @param id unique id of the object
     * @returns LogV2 successful operation
     * @throws ApiError
     */
    public static getExecutionLogsV2(
        id: string,
    ): CancelablePromise<Array<LogV2>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions/{id}/logs/v2',
            path: {
                'id': id,
            },
            errors: {
                500: `problem with getting execution's logs version 2`,
            },
        });
    }
    /**
     * Download artifact
     * Download the artifact file from the given execution
     * @param id unique id of the object
     * @param filename filename of the object usually used for artifacts
     * @returns binary successful operation
     * @throws ApiError
     */
    public static downloadFile(
        id: string,
        filename: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions/{id}/artifacts/{filename}',
            path: {
                'id': id,
                'filename': filename,
            },
            errors: {
                404: `execution not found`,
                500: `problem with getting artifacts from storage`,
            },
        });
    }
    /**
     * Download artifact archive
     * Download the artifact archive from the given execution
     * @param id unique id of the object
     * @param mask
     * @returns binary successful operation
     * @throws ApiError
     */
    public static downloadArchive(
        id: string,
        mask?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executions/{id}/artifact-archive',
            path: {
                'id': id,
            },
            query: {
                'mask': mask,
            },
            errors: {
                404: `execution not found`,
                500: `problem with getting artifact archive from storage`,
            },
        });
    }
    /**
     * List tests
     * List available tests
     * @param selector
     * @param textSearch text to search in name and test name
     * @returns Test successful operation
     * @throws ApiError
     */
    public static listTests(
        selector?: string,
        textSearch: string = '',
    ): CancelablePromise<Array<Test>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tests',
            query: {
                'selector': selector,
                'textSearch': textSearch,
            },
            errors: {
                400: `invalid parameters`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Create new test
     * Create new test based on file content, uri or git based data
     * @param requestBody test details body
     * @returns string successful operation
     * @returns Test successful operation
     * @throws ApiError
     */
    public static createTest(
        requestBody: TestUpsertRequest,
    ): CancelablePromise<string | Test> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tests',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete tests
     * Deletes all or labeled tests
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteTests(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tests',
            query: {
                'selector': selector,
            },
            errors: {
                404: `no tests found`,
                500: `problem with deleting tests and their executions`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Update test
     * Update test based on test content or git based data
     * @param id unique id of the object
     * @param requestBody test details body
     * @returns Test successful operation
     * @throws ApiError
     */
    public static updateTest(
        id: string,
        requestBody: TestUpdateRequest,
    ): CancelablePromise<Test> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tests/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `test not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test
     * Gets the specified test
     * @param id unique id of the object
     * @returns Test successful operation
     * @throws ApiError
     */
    public static getTest(
        id: string,
    ): CancelablePromise<Test> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tests/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `invalid parameters`,
                404: `test not found`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test
     * Deletes a test
     * @param id unique id of the object
     * @param skipDeleteExecutions dont delete executions
     * @param skipDeleteCrd dont delete CRD
     * @returns void
     * @throws ApiError
     */
    public static deleteTest(
        id: string,
        skipDeleteExecutions: boolean = false,
        skipDeleteCrd: boolean = false,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tests/{id}',
            path: {
                'id': id,
            },
            query: {
                'skipDeleteExecutions': skipDeleteExecutions,
                'skipDeleteCRD': skipDeleteCrd,
            },
            errors: {
                404: `no tests found`,
                500: `problem with deleting test and its executions`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Abort all executions of a test
     * Abort all test executions
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static abortTestExecutions(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tests/{id}/abort',
            path: {
                'id': id,
            },
            errors: {
                404: `no execution found`,
                500: `problem with aborting test execution`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Get test metrics
     * Gets test metrics for given tests executions, with particular execution status and timings
     * @param id unique id of the object
     * @param last last N days to show
     * @param limit limit records count same as pageSize
     * @returns ExecutionsMetrics successful operation
     * @throws ApiError
     */
    public static getTestMetrics(
        id: string,
        last: number = 7,
        limit: number = 7,
    ): CancelablePromise<ExecutionsMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tests/{id}/metrics',
            path: {
                'id': id,
            },
            query: {
                'last': last,
                'limit': limit,
            },
            errors: {
                500: `problem with getting metrics`,
                502: `problem with read information from storage`,
            },
        });
    }
    /**
     * Starts new test execution
     * New test execution returns new execution details on successful execution start
     * @param id unique id of the object
     * @param requestBody body passed to configure execution
     * @param namespace
     * @param testExecutionName
     * @returns ExecutionResult successful operation
     * @throws ApiError
     */
    public static executeTest(
        id: string,
        requestBody: ExecutionRequest,
        namespace: string = 'testkube',
        testExecutionName?: string,
    ): CancelablePromise<ExecutionResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tests/{id}/executions',
            path: {
                'id': id,
            },
            query: {
                'namespace': namespace,
                'testExecutionName': testExecutionName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with request body`,
                404: `test not found`,
                500: `problem with test execution`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get all test executions
     * Returns array of all available test executions
     * @param id unique id of the object
     * @param last last N days to show
     * @param pageSize the number of executions to get, setting to 0 will return only totals
     * @param page the page index to start at
     * @param status optional status filter containing multiple values separated by comma
     * @param startDate startDate for filtering in ISO-8601 format, i.e. "yyyy-mm-dd"
     * @param endDate endDate for filtering
     * @returns ExecutionsResult successful operation
     * @throws ApiError
     */
    public static listTestExecutions(
        id: string,
        last: number = 7,
        pageSize: number = 100,
        page?: number,
        status?: ExecutionStatus,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<ExecutionsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tests/{id}/executions',
            path: {
                'id': id,
            },
            query: {
                'last': last,
                'pageSize': pageSize,
                'page': page,
                'status': status,
                'startDate': startDate,
                'endDate': endDate,
            },
            errors: {
                404: `test or execution not found`,
                500: `problem with getting test executions from storage`,
            },
        });
    }
    /**
     * Get test execution
     * Returns execution with given executionID
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @returns Execution successful operation
     * @throws ApiError
     */
    public static getTestExecution(
        id: string,
        executionId: string,
    ): CancelablePromise<Execution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tests/{id}/executions/{executionID}',
            path: {
                'id': id,
                'executionID': executionId,
            },
            errors: {
                404: `execution not found`,
                500: `problem with getting test executions from storage`,
                502: `problem with reading secrets from kubernetes cluster`,
            },
        });
    }
    /**
     * Aborts execution
     * Aborts execution with given executionID
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @returns void
     * @throws ApiError
     */
    public static abortExecution(
        id: string,
        executionId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tests/{id}/executions/{executionID}',
            path: {
                'id': id,
                'executionID': executionId,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * List test with executions
     * List available test with executions
     * @param selector
     * @param textSearch text to search in name and test name
     * @param status optional status filter containing multiple values separated by comma
     * @param pageSize the number of executions to get, setting to 0 will return only totals
     * @param page the page index to start at
     * @returns TestWithExecutionSummary successful operation
     * @throws ApiError
     */
    public static listTestWithExecutions(
        selector?: string,
        textSearch: string = '',
        status?: ExecutionStatus,
        pageSize: number = 100,
        page?: number,
    ): CancelablePromise<Array<TestWithExecutionSummary>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-with-executions',
            query: {
                'selector': selector,
                'textSearch': textSearch,
                'status': status,
                'pageSize': pageSize,
                'page': page,
            },
            errors: {
                400: `invalid parameters`,
                500: `problem with getting tests and their executions`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Get test with execution
     * Gets the specified test with execution
     * @param id unique id of the object
     * @returns TestWithExecution successful operation
     * @throws ApiError
     */
    public static getTestWithExecution(
        id: string,
    ): CancelablePromise<TestWithExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-with-executions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `invalid parameters`,
                404: `no tests found`,
                500: `problem with getting tests and their executions`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * List executors
     * List executors available in cluster
     * @param selector
     * @returns Executor successful operation
     * @throws ApiError
     */
    public static listExecutors(
        selector?: string,
    ): CancelablePromise<Array<Executor>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executors',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with input for CRD generation`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Create new executor
     * Create new executor based on variables passed in request
     * @param requestBody executor request body data
     * @returns string successful operation
     * @returns ExecutorDetails successful operation
     * @throws ApiError
     */
    public static createExecutor(
        requestBody: ExecutorUpsertRequest,
    ): CancelablePromise<string | ExecutorDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/executors',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with executor definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete executors
     * Deletes labeled executors
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteExecutors(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/executors',
            query: {
                'selector': selector,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Delete executor
     * Deletes executor by its name
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static deleteExecutor(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/executors/{id}',
            path: {
                'id': id,
            },
            errors: {
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get executor details
     * Returns executors data with executions passed to executor
     * @param id unique id of the object
     * @returns ExecutorDetails successful operation
     * @throws ApiError
     */
    public static getExecutor(
        id: string,
    ): CancelablePromise<ExecutorDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executors/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with input for CRD generation`,
                500: `problem with getting executor data`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update executor
     * Update new executor based on variables passed in request
     * @param id unique id of the object
     * @param requestBody executor request body data
     * @returns ExecutorDetails successful operation
     * @throws ApiError
     */
    public static updateExecutor(
        id: string,
        requestBody: ExecutorUpdateRequest,
    ): CancelablePromise<ExecutorDetails> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/executors/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with executor definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `executor not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get executor details by type
     * Returns executors data with executions passed to executor
     * @param testType test type of the executor
     * @returns ExecutorDetails successful operation
     * @throws ApiError
     */
    public static getExecutorByType(
        testType: string,
    ): CancelablePromise<ExecutorDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/executor-by-types',
            query: {
                'testType': testType,
            },
            errors: {
                400: `problem with input for CRD generation`,
                500: `problem with getting executor data`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List webhooks
     * List webhooks available in cluster
     * @param selector
     * @returns Webhook successful operation
     * @throws ApiError
     */
    public static listWebhooks(
        selector?: string,
    ): CancelablePromise<Array<Webhook>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhooks',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with input for CRD generation`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Create new webhook
     * Create new webhook based on variables passed in request
     * @param requestBody webhook request body data
     * @returns string successful operation
     * @returns Webhook successful operation
     * @throws ApiError
     */
    public static createWebhook(
        requestBody: WebhookCreateRequest,
    ): CancelablePromise<string | Webhook> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhooks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with webhook definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete webhooks
     * Deletes labeled webhooks
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteWebhooks(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/webhooks',
            query: {
                'selector': selector,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Delete webhook
     * Deletes webhook by its name
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static deleteWebhook(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/webhooks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `webhook not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get webhook details
     * Returns webhook
     * @param id unique id of the object
     * @returns Webhook successful operation
     * @throws ApiError
     */
    public static getWebhook(
        id: string,
    ): CancelablePromise<Webhook> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhooks/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with input for CRD generation`,
                404: `webhook not found`,
                500: `problem with getting webhook data`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update new webhook
     * Update new webhook based on variables passed in request
     * @param id unique id of the object
     * @param requestBody webhook request body data
     * @returns Webhook successful operation
     * @throws ApiError
     */
    public static updateWebhook(
        id: string,
        requestBody: WebhookUpdateRequest,
    ): CancelablePromise<Webhook> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/webhooks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with webhook definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `webhook not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List webhook templates
     * List webhook templates available in cluster
     * @param selector
     * @returns WebhookTemplate successful operation
     * @throws ApiError
     */
    public static listWebhookTemplates(
        selector?: string,
    ): CancelablePromise<Array<WebhookTemplate>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhook-templates',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with input for CRD generation`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Create new webhook template
     * Create new webhook template based on variables passed in request
     * @param requestBody webhook template request body data
     * @returns string successful operation
     * @returns WebhookTemplate successful operation
     * @throws ApiError
     */
    public static createWebhookTemplate(
        requestBody: WebhookTemplateCreateRequest,
    ): CancelablePromise<string | WebhookTemplate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhook-templates',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with webhook template definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete webhook templates
     * Deletes labeled webhook templates
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteWebhookTemplates(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/webhook-templates',
            query: {
                'selector': selector,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Delete webhook template
     * Deletes webhook template by its name
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static deleteWebhookTemplate(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/webhook-templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `webhook template not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get webhook template details
     * Returns webhook template
     * @param id unique id of the object
     * @returns WebhookTemplate successful operation
     * @throws ApiError
     */
    public static getWebhookTemplate(
        id: string,
    ): CancelablePromise<WebhookTemplate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/webhook-templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with input for CRD generation`,
                404: `webhook template not found`,
                500: `problem with getting webhook template data`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update new webhook template
     * Update new webhook template based on variables passed in request
     * @param id unique id of the object
     * @param requestBody webhook template request body data
     * @returns WebhookTemplate successful operation
     * @throws ApiError
     */
    public static updateWebhookTemplate(
        id: string,
        requestBody: WebhookTemplateUpdateRequest,
    ): CancelablePromise<WebhookTemplate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/webhook-templates/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with webhook template definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `webhook template not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List templates
     * List templates available in cluster
     * @param selector
     * @returns Template successful operation
     * @throws ApiError
     */
    public static listTemplates(
        selector?: string,
    ): CancelablePromise<Array<Template>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templates',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with input for CRD generation`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Create new template
     * Create new template based on variables passed in request
     * @param requestBody template request body data
     * @returns string successful operation
     * @returns Template successful operation
     * @throws ApiError
     */
    public static createTemplate(
        requestBody: TemplateCreateRequest,
    ): CancelablePromise<string | Template> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/templates',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with template definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete templates
     * Deletes labeled templates
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteTemplates(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/templates',
            query: {
                'selector': selector,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Delete template
     * Deletes template by its name
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static deleteTemplate(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `template not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get template details
     * Returns template
     * @param id unique id of the object
     * @returns Template successful operation
     * @throws ApiError
     */
    public static getTemplate(
        id: string,
    ): CancelablePromise<Template> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with input for CRD generation`,
                404: `template not found`,
                500: `problem with getting template data`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update new template
     * Update new template based on variables passed in request
     * @param id unique id of the object
     * @param requestBody template request body data
     * @returns Template successful operation
     * @throws ApiError
     */
    public static updateTemplate(
        id: string,
        requestBody: TemplateUpdateRequest,
    ): CancelablePromise<Template> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/templates/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with template definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `template not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test sources
     * List test sources available in cluster
     * @param selector
     * @returns TestSource successful operation
     * @throws ApiError
     */
    public static listTestSources(
        selector?: string,
    ): CancelablePromise<Array<TestSource>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-sources',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with input for CRD generation`,
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Create new test source
     * Create new test source based on variables passed in request
     * @param requestBody test source request body data
     * @returns string successful operation
     * @returns TestSource successful operation
     * @throws ApiError
     */
    public static createTestSource(
        requestBody: TestSourceUpsertRequest,
    ): CancelablePromise<string | TestSource> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-sources',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test source definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Process test source batch (create, update, delete)
     * Process test source batch based on variables passed in request
     * @param requestBody test source batch request body data
     * @returns TestSourceBatchResult successful operation
     * @throws ApiError
     */
    public static processTestSourceBatch(
        requestBody: TestSourceBatchRequest,
    ): CancelablePromise<TestSourceBatchResult> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/test-sources',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test source definition - probably some bad input occurs (invalid JSON body or similar)`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test sources
     * Deletes labeled test sources
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteTestSources(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-sources',
            query: {
                'selector': selector,
            },
            errors: {
                502: `problem with read information from kubernetes cluster`,
            },
        });
    }
    /**
     * Update test source
     * Update test source based on test content or git based data
     * @param id unique id of the object
     * @param requestBody test source body
     * @returns TestSource successful operation
     * @throws ApiError
     */
    public static updateTestSource(
        id: string,
        requestBody: TestSourceUpdateRequest,
    ): CancelablePromise<TestSource> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/test-sources/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with test source definition - probably some bad input occurs (invalid JSON body or similar)`,
                404: `test source not found`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test source
     * Deletes test source by its name
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static deleteTestSource(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-sources/{id}',
            path: {
                'id': id,
            },
            errors: {
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test source data
     * Returns test sources data
     * @param id unique id of the object
     * @returns TestSource successful operation
     * @throws ApiError
     */
    public static getTestSource(
        id: string,
    ): CancelablePromise<TestSource> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-sources/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with input for CRD generation`,
                404: `test source not found`,
                500: `problem with getting test source data`,
                502: `problem with communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflows
     * List test workflows from the kubernetes cluster
     * @param selector
     * @returns TestWorkflow successful list operation
     * @throws ApiError
     */
    public static listTestWorkflows(
        selector?: string,
    ): CancelablePromise<Array<TestWorkflow>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflows',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test workflows
     * Delete test workflows from the kubernetes cluster
     * @param selector
     * @param testWorkflowNames
     * @returns void
     * @throws ApiError
     */
    public static deleteTestWorkflows(
        selector?: string,
        testWorkflowNames?: Array<string>,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-workflows',
            query: {
                'selector': selector,
                'testWorkflowNames': testWorkflowNames,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Create test workflow
     * Create test workflow in the kubernetes cluster
     * @param requestBody test workflow body
     * @returns TestWorkflow successful creation
     * @throws ApiError
     */
    public static createTestWorkflow(
        requestBody: TestWorkflow,
    ): CancelablePromise<Array<TestWorkflow>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflows',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Validate test workflow
     * Validate test workflow specification against CRD schema
     * @param requestBody test workflow body
     * @returns void
     * @throws ApiError
     */
    public static validateTestWorkflow(
        requestBody: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test-workflows',
            body: requestBody,
            mediaType: 'text/yaml',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflow executions
     * List test workflow executions
     * @param id unique id of the object
     * @param tagSelector
     * @param actorName
     * @param actorType
     * @returns TestWorkflowExecutionsResult successful list operation
     * @throws ApiError
     */
    public static listTestWorkflowExecutionsByTestWorkflow(
        id: string,
        tagSelector?: string,
        actorName?: string,
        actorType?: string,
    ): CancelablePromise<Array<TestWorkflowExecutionsResult>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflows/{id}/executions',
            path: {
                'id': id,
            },
            query: {
                'tagSelector': tagSelector,
                'actorName': actorName,
                'actorType': actorType,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Execute test workflow
     * Execute test workflow in the kubernetes cluster
     * @param id unique id of the object
     * @param requestBody test workflow execution request
     * @param testWorkflowExecutionName
     * @returns TestWorkflowExecution successful execution
     * @throws ApiError
     */
    public static executeTestWorkflow(
        id: string,
        requestBody: TestWorkflowExecutionRequest,
        testWorkflowExecutionName?: string,
    ): CancelablePromise<Array<TestWorkflowExecution>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflows/{id}/executions',
            path: {
                'id': id,
            },
            query: {
                'testWorkflowExecutionName': testWorkflowExecutionName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflow execution tags
     * List test workflow execution tags for all executed test workflows
     * @param id unique id of the object
     * @returns string successful list operation
     * @throws ApiError
     */
    public static listTestWorkflowTagsByTestWorkflow(
        id: string,
    ): CancelablePromise<Record<string, Array<string>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflows/{id}/tags',
            path: {
                'id': id,
            },
            errors: {
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow metrics
     * Get metrics of test workflow executions
     * @param id unique id of the object
     * @returns ExecutionsMetrics successful list operation
     * @throws ApiError
     */
    public static getTestWorkflowMetrics(
        id: string,
    ): CancelablePromise<ExecutionsMetrics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflows/{id}/metrics',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow execution
     * Get test workflow execution details
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @returns TestWorkflowExecution successful list operation
     * @throws ApiError
     */
    public static getTestWorkflowExecutionByTestWorkflow(
        id: string,
        executionId: string,
    ): CancelablePromise<TestWorkflowExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflows/{id}/executions/{executionID}',
            path: {
                'id': id,
                'executionID': executionId,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Abort test workflow execution
     * Abort test workflow execution
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @param forceAgent force cancellation using agent
     * @returns void
     * @throws ApiError
     */
    public static abortTestWorkflowExecutionByTestWorkflow(
        id: string,
        executionId: string,
        forceAgent: boolean = false,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflows/{id}/executions/{executionID}/abort',
            path: {
                'id': id,
                'executionID': executionId,
            },
            query: {
                'forceAgent': forceAgent,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Rerun test workflow execution
     * Rerun test workflow execution
     * @param id unique id of the object
     * @param executionId unique id of the object execution
     * @param requestBody test workflow running context
     * @returns TestWorkflowExecution successful execution
     * @throws ApiError
     */
    public static rerunTestWorkflowExecutionByTestWorkflow(
        id: string,
        executionId: string,
        requestBody: TestWorkflowRunningContext,
    ): CancelablePromise<TestWorkflowExecution> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflows/{id}/executions/{executionID}/rerun',
            path: {
                'id': id,
                'executionID': executionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Abort all test workflow executions
     * Abort all test workflow executions
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static abortAllTestWorkflowExecutions(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflows/{id}/abort',
            path: {
                'id': id,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow details
     * Get test workflow details from the kubernetes cluster
     * @param id unique id of the object
     * @returns TestWorkflow successful operation
     * @throws ApiError
     */
    public static getTestWorkflow(
        id: string,
    ): CancelablePromise<TestWorkflow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflows/{id}',
            path: {
                'id': id,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update test workflow details
     * Update test workflow details in the kubernetes cluster
     * @param id unique id of the object
     * @param requestBody test workflow body
     * @returns TestWorkflow successful operation
     * @throws ApiError
     */
    public static updateTestWorkflow(
        id: string,
        requestBody: TestWorkflow,
    ): CancelablePromise<TestWorkflow> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test-workflows/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test workflow
     * Delete test workflow from the kubernetes cluster
     * @param id unique id of the object
     * @param skipDeleteExecutions dont delete executions
     * @param skipDeleteCrd dont delete CRD
     * @returns void
     * @throws ApiError
     */
    public static deleteTestWorkflow(
        id: string,
        skipDeleteExecutions: boolean = false,
        skipDeleteCrd: boolean = false,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-workflows/{id}',
            path: {
                'id': id,
            },
            query: {
                'skipDeleteExecutions': skipDeleteExecutions,
                'skipDeleteCRD': skipDeleteCrd,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflows with latest execution
     * List test workflows from the kubernetes cluster with latest execution
     * @param selector
     * @returns TestWorkflowWithExecutionSummary successful list operation
     * @throws ApiError
     */
    public static listTestWorkflowWithExecutions(
        selector?: string,
    ): CancelablePromise<Array<TestWorkflowWithExecutionSummary>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-with-executions',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow details with latest execution
     * Get test workflow details from the kubernetes cluster with latest execution
     * @param id unique id of the object
     * @returns TestWorkflowWithExecution successful operation
     * @throws ApiError
     */
    public static getTestWorkflowWithExecution(
        id: string,
    ): CancelablePromise<TestWorkflowWithExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-with-executions/{id}',
            path: {
                'id': id,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflow execution tags
     * List test workflow execution tags for all executed test workflows
     * @param id unique id of the object
     * @returns string successful operation
     * @throws ApiError
     */
    public static listTestWorkflowWithExecutionTags(
        id: string,
    ): CancelablePromise<Record<string, Array<string>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-with-executions/{id}/tags',
            path: {
                'id': id,
            },
            errors: {
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Execute test workflows
     * Execute test workflows in the kubernetes cluster
     * @param requestBody test workflow execution request
     * @param selector
     * @param concurrency
     * @returns TestWorkflowExecution successful execution
     * @throws ApiError
     */
    public static executeTestWorkflows(
        requestBody: TestWorkflowExecutionRequest,
        selector?: string,
        concurrency: number = 10,
    ): CancelablePromise<Array<TestWorkflowExecution>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflow-executions',
            query: {
                'selector': selector,
                'concurrency': concurrency,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflow executions
     * List test workflow executions
     * @param id unique id of the object
     * @param tagSelector
     * @param actorName
     * @param actorType
     * @returns TestWorkflowExecutionsResult successful list operation
     * @throws ApiError
     */
    public static listTestWorkflowExecutions(
        id: string,
        tagSelector?: string,
        actorName?: string,
        actorType?: string,
    ): CancelablePromise<Array<TestWorkflowExecutionsResult>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-executions',
            path: {
                'id': id,
            },
            query: {
                'tagSelector': tagSelector,
                'actorName': actorName,
                'actorType': actorType,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow execution
     * Get test workflow execution details
     * @param executionId unique id of the object execution
     * @returns TestWorkflowExecution successful list operation
     * @throws ApiError
     */
    public static getTestWorkflowExecution(
        executionId: string,
    ): CancelablePromise<Array<TestWorkflowExecution>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-executions/{executionID}',
            path: {
                'executionID': executionId,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow execution's artifacts by ID
     * Returns artifacts of the given executionID
     * @param executionId unique id of the object execution
     * @returns Artifact successful operation
     * @throws ApiError
     */
    public static getTestWorkflowExecutionArtifacts(
        executionId: string,
    ): CancelablePromise<Array<Artifact>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-executions/{executionID}/artifacts',
            path: {
                'executionID': executionId,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `execution not found`,
                500: `problem with getting execution's artifacts from storage`,
            },
        });
    }
    /**
     * Download test workflow artifact
     * Download the artifact file from the given execution
     * @param executionId unique id of the object execution
     * @param filename filename of the object usually used for artifacts
     * @returns binary successful operation
     * @throws ApiError
     */
    public static downloadTestWorkflowArtifact(
        executionId: string,
        filename: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-executions/{executionID}/artifacts/{filename}',
            path: {
                'executionID': executionId,
                'filename': filename,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `execution not found`,
                500: `problem with getting artifacts from storage`,
            },
        });
    }
    /**
     * Download test workflow artifact archive
     * Download the artifact archive from the given execution
     * @param executionId unique id of the object execution
     * @param mask
     * @returns binary successful operation
     * @throws ApiError
     */
    public static downloadTestWorkflowArtifactArchive(
        executionId: string,
        mask?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-executions/{executionID}/artifact-archive',
            path: {
                'executionID': executionId,
            },
            query: {
                'mask': mask,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `execution not found`,
                500: `problem with getting artifact archive from storage`,
            },
        });
    }
    /**
     * Abort test workflow execution
     * Abort test workflow execution
     * @param executionId unique id of the object execution
     * @param forceAgent force cancellation using agent
     * @returns void
     * @throws ApiError
     */
    public static abortTestWorkflowExecution(
        executionId: string,
        forceAgent: boolean = false,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflow-executions/{executionID}/abort',
            path: {
                'executionID': executionId,
            },
            query: {
                'forceAgent': forceAgent,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Rerun test workflow execution
     * Rerun test workflow execution
     * @param executionId unique id of the object execution
     * @param requestBody test workflow running context
     * @returns TestWorkflowExecution successful execution
     * @throws ApiError
     */
    public static rerunTestWorkflowExecution(
        executionId: string,
        requestBody: TestWorkflowRunningContext,
    ): CancelablePromise<TestWorkflowExecution> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflow-executions/{executionID}/rerun',
            path: {
                'executionID': executionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * List test workflow templates
     * List test workflow templates from the kubernetes cluster
     * @param selector
     * @returns TestWorkflowTemplate successful list operation
     * @throws ApiError
     */
    public static listTestWorkflowTemplates(
        selector?: string,
    ): CancelablePromise<Array<TestWorkflowTemplate>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-templates',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test workflow templates
     * Delete test workflow templates from the kubernetes cluster
     * @param selector
     * @returns void
     * @throws ApiError
     */
    public static deleteTestWorkflowTemplates(
        selector?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-workflow-templates',
            query: {
                'selector': selector,
            },
            errors: {
                400: `problem with selector parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Create test workflow template
     * Create test workflow template in the kubernetes cluster
     * @param requestBody test workflow template body
     * @returns TestWorkflowTemplate successful creation
     * @throws ApiError
     */
    public static createTestWorkflowTemplate(
        requestBody: TestWorkflowTemplate,
    ): CancelablePromise<Array<TestWorkflowTemplate>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test-workflow-templates',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                402: `missing Pro subscription for a commercial feature`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Validate test workflow template
     * Validate test workflow template specification against CRD schema
     * @param requestBody test workflow template body
     * @returns void
     * @throws ApiError
     */
    public static validateTestWorkflowTemplate(
        requestBody: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test-workflow-templates',
            body: requestBody,
            mediaType: 'text/yaml',
            errors: {
                400: `problem with body parsing - probably some bad input occurs`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Get test workflow template details
     * Get test workflow template details from the kubernetes cluster
     * @param id unique id of the object
     * @returns TestWorkflowTemplate successful operation
     * @throws ApiError
     */
    public static getTestWorkflowTemplate(
        id: string,
    ): CancelablePromise<TestWorkflowTemplate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test-workflow-templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Update test workflow template details
     * Update test workflow template details in the kubernetes cluster
     * @param id unique id of the object
     * @param requestBody test workflow template body
     * @returns TestWorkflowTemplate successful operation
     * @throws ApiError
     */
    public static updateTestWorkflowTemplate(
        id: string,
        requestBody: TestWorkflowTemplate,
    ): CancelablePromise<TestWorkflowTemplate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test-workflow-templates/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
    /**
     * Delete test workflow template
     * Delete test workflow template from the kubernetes cluster
     * @param id unique id of the object
     * @returns void
     * @throws ApiError
     */
    public static deleteTestWorkflowTemplate(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test-workflow-templates/{id}',
            path: {
                'id': id,
            },
            errors: {
                402: `missing Pro subscription for a commercial feature`,
                404: `the resource has not been found`,
                502: `problem communicating with kubernetes cluster`,
            },
        });
    }
}

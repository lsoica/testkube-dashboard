/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TestWorkflowExecutionHealth = {
    /**
     * Recency-weighted fraction of executions that passed (value between 0.0 and 1.0).
     *
     */
    passRate: number;
    /**
     * Fraction of status changes among consecutive executions without recency weighting
     * (value between 0.0 and 1.0).
     *
     */
    flipRate: number;
    /**
     * Combined health score, computed as passRate * (1 - flipRate)
     * (value between 0.0 and 1.0).
     *
     */
    overallHealth: number;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * problem response in case of error
 */
export type Problem = {
    /**
     * Type contains a URI that identifies the problem type.
     */
    type?: string;
    /**
     * Title is a short, human-readable summary of the problem type. This title SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
     */
    title?: string;
    /**
     * HTTP status code for this occurrence of the problem.
     */
    status?: number;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */
    detail?: string;
    /**
     * A URI that identifies the specific occurrence of the problem. This URI may or may not yield further information if de-referenced.
     */
    instance?: string;
};


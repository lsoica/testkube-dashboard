/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * repository parameters for tests in git repositories
 */
export type RepositoryParameters = {
    /**
     * branch/tag name for checkout
     */
    branch?: string;
    /**
     * commit id (sha) for checkout
     */
    commit?: string;
    /**
     * if needed we can checkout particular path (dir or file) in case of BIG/mono repositories
     */
    path?: string;
    /**
     * if provided we checkout the whole repository and run test from this directory
     */
    workingDir?: string;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SecretConfig = {
    /**
     * prefix for the secrets created via Testkube
     */
    prefix: string;
    /**
     * allow to list secrets created via Testkube
     */
    list: boolean;
    /**
     * allow to list all secrets
     */
    listAll: boolean;
    /**
     * allow to create a new secret via Testkube
     */
    create: boolean;
    /**
     * allow to modify a secret created via Testkube
     */
    modify: boolean;
    /**
     * allow to delete a secret created via Testkube
     */
    delete: boolean;
    /**
     * allow to automatically create secrets via Testkube for sensitive credentials
     */
    autoCreate: boolean;
};


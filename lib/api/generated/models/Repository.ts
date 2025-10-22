/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SecretRef } from './SecretRef';
/**
 * repository representation for tests in git repositories
 */
export type Repository = {
    /**
     * VCS repository type
     */
    type: Repository.type;
    /**
     * uri of content file or git directory
     */
    uri: string;
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
     * git auth username for private repositories
     */
    username?: string;
    /**
     * git auth token for private repositories
     */
    token?: string;
    usernameSecret?: SecretRef;
    tokenSecret?: SecretRef;
    /**
     * secret with certificate for private repositories. Should contain one key ending with .crt such as "mycorp.crt", whose value is the certificate file content, suitable for git config http.sslCAInfo
     */
    certificateSecret?: string;
    /**
     * if provided we checkout the whole repository and run test from this directory
     */
    workingDir?: string;
    /**
     * auth type for git requests
     */
    authType?: Repository.authType;
};
export namespace Repository {
    /**
     * VCS repository type
     */
    export enum type {
        GIT = 'git',
    }
    /**
     * auth type for git requests
     */
    export enum authType {
        BASIC = 'basic',
        HEADER = 'header',
    }
}


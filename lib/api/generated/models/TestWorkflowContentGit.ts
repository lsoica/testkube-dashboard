/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentGitAuthType } from './ContentGitAuthType';
import type { EnvVarSource } from './EnvVarSource';
export type TestWorkflowContentGit = {
    /**
     * uri for the Git repository
     */
    uri?: string;
    /**
     * branch, commit or a tag name to fetch
     */
    revision?: string;
    /**
     * plain text username to fetch with
     */
    username?: string;
    usernameFrom?: EnvVarSource;
    /**
     * plain text token to fetch with
     */
    token?: string;
    tokenFrom?: EnvVarSource;
    /**
     * plain text SSH private key to fetch with
     */
    sshKey?: string;
    sshKeyFrom?: EnvVarSource;
    authType?: ContentGitAuthType;
    /**
     * where to mount the fetched repository contents (defaults to "repo" directory in the data volume)
     */
    mountPath?: string;
    /**
     * enable cone mode for sparse checkout with paths
     */
    cone?: boolean;
    /**
     * paths to fetch for the sparse checkout
     */
    paths?: Array<string>;
};


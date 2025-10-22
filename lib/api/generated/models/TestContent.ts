/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Repository } from './Repository';
export type TestContent = {
    /**
     * type of sources a runner can get data from.
     * string: String content (e.g. Postman JSON file).
     * file-uri: content stored on the webserver.
     * git-file: the file stored in the Git repo in the given repository.path field (Deprecated: use git instead).
     * git-dir: the entire git repo or git subdirectory depending on the  repository.path field (Testkube does a shadow clone and sparse checkout to limit IOs in the case of monorepos). (Deprecated: use git instead).
     * git: automatically provisions either a file, directory or whole git repository depending on the repository.path field.
     *
     */
    type?: TestContent.type;
    repository?: Repository;
    /**
     * test content data as string
     */
    data?: string;
    /**
     * test content
     */
    uri?: string;
};
export namespace TestContent {
    /**
     * type of sources a runner can get data from.
     * string: String content (e.g. Postman JSON file).
     * file-uri: content stored on the webserver.
     * git-file: the file stored in the Git repo in the given repository.path field (Deprecated: use git instead).
     * git-dir: the entire git repo or git subdirectory depending on the  repository.path field (Testkube does a shadow clone and sparse checkout to limit IOs in the case of monorepos). (Deprecated: use git instead).
     * git: automatically provisions either a file, directory or whole git repository depending on the repository.path field.
     *
     */
    export enum type {
        STRING = 'string',
        FILE_URI = 'file-uri',
        GIT_FILE = 'git-file',
        GIT_DIR = 'git-dir',
        GIT = 'git',
    }
}


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ExecAction = {
    /**
     * Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     */
    command?: Array<string>;
};


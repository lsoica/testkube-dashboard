/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedInteger } from './BoxedInteger';
/**
 * configMap represents a configMap that should populate this volume
 */
export type ConfigMapVolumeSource = {
    defaultMode?: BoxedInteger;
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
     */
    items?: Array<{
        /**
         * key is the key to project.
         */
        key: string;
        mode?: BoxedInteger;
        /**
         * path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
         */
        path: string;
    }>;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names TODO: Add other useful fields. apiVersion, kind, uid?
     */
    name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     */
    optional?: boolean;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedInteger } from './BoxedInteger';
import type { BoxedString } from './BoxedString';
import type { FieldRef } from './FieldRef';
import type { LabelSelector } from './LabelSelector';
import type { ResourceFieldRef } from './ResourceFieldRef';
/**
 * Represents a projected volume source
 */
export type ProjectedVolumeSource = {
    defaultMode?: BoxedInteger;
    /**
     * sources is the list of volume projections. Each entry in this list handles one source.
     */
    sources?: Array<{
        /**
         * ClusterTrustBundle allows a pod to access the `.spec.trustBundle` field of ClusterTrustBundle objects in an auto-updating file.
         */
        clusterTrustBundle?: {
            labelSelector?: LabelSelector;
            name?: BoxedString;
            optional?: BoxedBoolean;
            /**
             * Relative path from the volume root to write the bundle.
             */
            path: string;
            signerName?: BoxedString;
        };
        /**
         * configMap information about the configMap data to project
         */
        configMap?: {
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
            optional?: BoxedBoolean;
        };
        /**
         * downwardAPI information about the downwardAPI data to project
         */
        downwardAPI?: {
            /**
             * Items is a list of DownwardAPIVolume file
             */
            items?: Array<{
                fieldRef?: FieldRef;
                mode?: BoxedInteger;
                /**
                 * path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
                 */
                path: string;
                resourceFieldRef?: ResourceFieldRef;
            }>;
        };
        /**
         * secret information about the secret data to project
         */
        secret?: {
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
            optional?: BoxedBoolean;
        };
        /**
         * serviceAccountToken is information about the serviceAccountToken data to project
         */
        serviceAccountToken?: {
            /**
             * audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.
             */
            audience?: string;
            expirationSeconds?: BoxedInteger;
            /**
             * path is the path relative to the mount point of the file to project the token into.
             */
            path: string;
        };
    }>;
};


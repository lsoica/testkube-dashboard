/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedInteger } from './BoxedInteger';
export type SecurityContext = {
    privileged?: BoxedBoolean;
    runAsUser?: BoxedInteger;
    runAsGroup?: BoxedInteger;
    runAsNonRoot?: BoxedBoolean;
    readOnlyRootFilesystem?: BoxedBoolean;
    allowPrivilegeEscalation?: BoxedBoolean;
};


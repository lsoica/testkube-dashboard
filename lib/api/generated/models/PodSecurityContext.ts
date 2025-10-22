/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppArmorProfile } from './AppArmorProfile';
import type { BoxedBoolean } from './BoxedBoolean';
import type { BoxedInteger } from './BoxedInteger';
import type { BoxedString } from './BoxedString';
import type { SeccompProfile } from './SeccompProfile';
import type { SELinuxOptions } from './SELinuxOptions';
import type { Sysctl } from './Sysctl';
import type { WindowsSecurityContextOptions } from './WindowsSecurityContextOptions';
export type PodSecurityContext = {
    seLinuxOptions?: SELinuxOptions;
    windowsOptions?: WindowsSecurityContextOptions;
    runAsUser?: BoxedInteger;
    runAsGroup?: BoxedInteger;
    runAsNonRoot?: BoxedBoolean;
    supplementalGroups?: Array<number>;
    supplementalGroupsPolicy?: BoxedString;
    fsGroup?: BoxedInteger;
    sysctls?: Array<Sysctl>;
    fsGroupChangePolicy?: BoxedString;
    seccompProfile?: SeccompProfile;
    appArmorProfile?: AppArmorProfile;
    seLinuxChangePolicy?: BoxedString;
};


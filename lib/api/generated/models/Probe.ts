/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxedInteger } from './BoxedInteger';
import type { ExecAction } from './ExecAction';
import type { GRPCAction } from './GRPCAction';
import type { HTTPGetAction } from './HTTPGetAction';
import type { TCPSocketAction } from './TCPSocketAction';
/**
 * Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
 */
export type Probe = {
    initialDelaySeconds?: number;
    timeoutSeconds?: number;
    periodSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
    terminationGracePeriodSeconds?: BoxedInteger;
    exec?: ExecAction;
    httpGet?: HTTPGetAction;
    tcpSocket?: TCPSocketAction;
    grpc?: GRPCAction;
};


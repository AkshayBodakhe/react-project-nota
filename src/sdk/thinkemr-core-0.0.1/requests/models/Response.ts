/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Response = {
    date?: string;
    code?: Response.code;
    message?: Record<string, any>;
    data?: Record<string, any>;
    errors?: Record<string, string>;
    path?: string;
    requestId?: string;
    version?: string;
};

export namespace Response {

    export enum code {
        INTERNAL_ERROR = 'INTERNAL_ERROR',
        ACCESS_DENIED = 'ACCESS_DENIED',
        USER_NOT_FOUND = 'USER_NOT_FOUND',
        USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
        BAD_REQUEST = 'BAD_REQUEST',
        NOT_FOUND = 'NOT_FOUND',
        CREATED = 'CREATED',
        SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
        UNAUTHORIZED = 'UNAUTHORIZED',
        DB_ERROR = 'DB_ERROR',
        IAM_ERROR = 'IAM_ERROR',
        AWS_ERROR = 'AWS_ERROR',
        ENTITY = 'ENTITY',
        OK = 'OK',
        UPDATED = 'UPDATED',
        UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
    }


}


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';
import type { Roles } from '../models/Roles';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoleControllerService {

    /**
     * @param requestBody
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static updateRole(
        requestBody: Roles,
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/role/update',
            query: {
                'providerGroupUuid': providerGroupUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static addRole(
        requestBody: Roles,
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/role/add',
            query: {
                'providerGroupUuid': providerGroupUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getRoleByUuid(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/role/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteRole(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/role/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllRolesWithDefault(
        providerGroupUuid?: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/role/get/all',
            query: {
                'providerGroupUuid': providerGroupUuid,
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param searchString
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllRolesExceptDefaults(
        providerGroupUuid?: string,
        searchString?: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/role/all',
            query: {
                'providerGroupUuid': providerGroupUuid,
                'searchString': searchString,
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

}

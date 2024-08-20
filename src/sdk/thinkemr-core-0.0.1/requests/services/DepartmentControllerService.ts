/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Department } from '../models/Department';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DepartmentControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateDepartment(
        requestBody: Department,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/department',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addDepartment(
        requestBody: Department,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/department',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @param active
     * @returns Response OK
     * @throws ApiError
     */
    public static updateStatus4(
        uuid: string,
        active: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/department/{uuid}/active/{active}',
            path: {
                'uuid': uuid,
                'active': active,
            },
        });
    }

    /**
     * @param locationId
     * @param departmentId
     * @returns Response OK
     * @throws ApiError
     */
    public static addLocationDepartment(
        locationId: string,
        departmentId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/department/location/{locationId}/{departmentId}',
            path: {
                'locationId': locationId,
                'departmentId': departmentId,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewDepartments(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/department/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param locationId
     * @param departmentName
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static searchLocationDepartment(
        locationId: string,
        departmentName?: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/department/location/{locationId}',
            path: {
                'locationId': locationId,
            },
            query: {
                'departmentName': departmentName,
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param locationId
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getLocationDepartment(
        locationId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/department/location/{locationId}/department',
            path: {
                'locationId': locationId,
            },
            query: {
                'page': page,
                'size': size,
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
    public static getAllDepartmentAdmins(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/department/department-admins/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllSearchDepartments(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/department/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'status': status,
            },
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OpenTask } from '../models/OpenTask';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TasksControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateTask(
        requestBody: OpenTask,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/task',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createTask(
        requestBody: OpenTask,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/task',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param taskUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewTask(
        taskUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/task/{taskUuid}',
            path: {
                'taskUuid': taskUuid,
            },
        });
    }

    /**
     * @param taskUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteTask(
        taskUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/task/{taskUuid}',
            path: {
                'taskUuid': taskUuid,
            },
        });
    }

    /**
     * @param providerUuid
     * @param patientName
     * @param priority
     * @param dueDate
     * @param status
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProviderTask(
        providerUuid: string,
        patientName?: string,
        priority?: 'LOW' | 'MEDIUM' | 'HIGH',
        dueDate?: 'CURRENT' | 'LAST_7_DAY' | 'DUE_TOMORROW' | 'NEXT_7_DAYS' | 'NEXT_30_DAYS' | 'NEXT_60_DAYS' | 'NEXT_90_DAYS' | 'FUTURE',
        status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETE' | 'INCOMPLETE',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/task/provider/{providerUuid}',
            path: {
                'providerUuid': providerUuid,
            },
            query: {
                'patientName': patientName,
                'priority': priority,
                'dueDate': dueDate,
                'status': status,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getOpenTaskCount(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/task/count/{providerUuid}',
            path: {
                'providerUuid': providerUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param patientName
     * @param priority
     * @param dueDate
     * @param status
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllTask(
        providerGroupUuid: string,
        patientName?: string,
        priority?: 'LOW' | 'MEDIUM' | 'HIGH',
        dueDate?: 'CURRENT' | 'LAST_7_DAY' | 'DUE_TOMORROW' | 'NEXT_7_DAYS' | 'NEXT_30_DAYS' | 'NEXT_60_DAYS' | 'NEXT_90_DAYS' | 'FUTURE',
        status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETE' | 'INCOMPLETE',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/task/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'patientName': patientName,
                'priority': priority,
                'dueDate': dueDate,
                'status': status,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

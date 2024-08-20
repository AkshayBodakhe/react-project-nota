/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Macros } from '../models/Macros';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MacrosControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateMacros(
        requestBody: Macros,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/macros',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createMacros(
        requestBody: Macros,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/macros',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param macrosUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getMacros(
        macrosUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/macros/{macrosUuid}',
            path: {
                'macrosUuid': macrosUuid,
            },
        });
    }

    /**
     * @param macrosUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteMacros(
        macrosUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/macros/{macrosUuid}',
            path: {
                'macrosUuid': macrosUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllMacros(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/macros/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

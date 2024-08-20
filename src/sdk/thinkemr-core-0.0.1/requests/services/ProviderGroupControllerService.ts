/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProviderGroup } from '../models/ProviderGroup';
import type { Response } from '../models/Response';
import type { Speciality } from '../models/Speciality';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProviderGroupControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateProviderGroup(
        requestBody: ProviderGroup,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/provider-group',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createProviderGroup(
        requestBody: ProviderGroup,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/provider-group',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static syncDatabaseSchema(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/provider-group/{uuid}/sync',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param uuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updateStatus(
        uuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/provider-group/{uuid}/active/{status}',
            path: {
                'uuid': uuid,
                'status': status,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addSpecialities(
        requestBody: Speciality,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/add/speciality',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupById(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/auth/{uuid}',
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
    public static getProviderGroupById1(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider-group/{uuid}',
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
    public static deleteProviderGroup(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/provider-group/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param year
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProviderGroupStats(
        year?: number,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider-group/stats-graph',
            query: {
                'year': year,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param status
     * @param state
     * @param portalName
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProviderGroups(
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        status?: boolean,
        state?: string,
        portalName?: 'NAVALAGLOBAL' | 'NAVALACARE' | 'PATIENT',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider-group/all',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'status': status,
                'state': state,
                'portalName': portalName,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllSpecialities(
        page?: number,
        size?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/get/specialities',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllLanguages(
        page?: number,
        size?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/get/languages',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllCurrencies(
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/get/currencies',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllCountries(
        page?: number,
        size?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/get/countries',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param subdomain
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupBySubdomain(
        subdomain: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/auth/subdomain/{subdomain}',
            path: {
                'subdomain': subdomain,
            },
        });
    }

    /**
     * @param subdomain
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupBySubdomain1(
        subdomain: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/subdomain/{subdomain}',
            path: {
                'subdomain': subdomain,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllAuthProviderGroups(
        page: number,
        size: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/auth/all',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getStates(
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/all/states',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Provider } from '../models/Provider';
import type { ProviderRating } from '../models/ProviderRating';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProviderControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateProvider(
        requestBody: Provider,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/provider',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createProvider(
        requestBody: Provider,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/provider',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updateProviderStatus(
        uuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/provider/{uuid}/active/{status}',
            path: {
                'uuid': uuid,
                'status': status,
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
    public static getProviderByRating(
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/rating',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addProviderRating(
        requestBody: ProviderRating,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/provider/rating',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderByUuid(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/{uuid}',
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
    public static archiveProvider(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/provider/{uuid}',
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
    public static getProviderByUserId(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/user/{uuid}',
            path: {
                'uuid': uuid,
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
    public static getAllStatusProvider(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/status/{providerGroupUuid}',
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

    /**
     * @param providerGroupUuid
     * @param searchBy
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupProviders(
        providerGroupUuid: string,
        searchBy?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/provider-group/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'searchBy': searchBy,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupProvidersCount(
        providerGroupUuid: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/provider-group/count/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getLocationsForProvider(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/locations/provider/{providerUuid}',
            path: {
                'providerUuid': providerUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getRecentlyConsultedProvider(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/consulted/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param searchBy
     * @param sourceId
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProviders(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
        searchBy?: string,
        sourceId?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'searchBy': searchBy,
                'sourceId': sourceId,
            },
        });
    }

}

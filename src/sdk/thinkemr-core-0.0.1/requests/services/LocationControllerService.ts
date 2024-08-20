/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from '../models/Location';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocationControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateLocation(
        requestBody: Location,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/location',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addLocation(
        requestBody: Location,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/location',
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
    public static updateStatus2(
        uuid: string,
        active: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/location/{uuid}/active/{active}',
            path: {
                'uuid': uuid,
                'active': active,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getLocationByLocationId(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/location/{uuid}',
            path: {
                'uuid': uuid,
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
    public static getAllLocations(
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
            url: '/api/master/location/all/{providerGroupUuid}',
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

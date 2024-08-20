/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Availability } from '../models/Availability';
import type { AvailabilityByDate } from '../models/AvailabilityByDate';
import type { AvailabilityRequest } from '../models/AvailabilityRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AvailabilityControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static editAvailability(
        requestBody: Availability,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/availability',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static save(
        requestBody: Availability,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/availability',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addAvailabilityByDate(
        requestBody: AvailabilityByDate,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/availability/by_date',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static getAvailabilities(
        requestBody: AvailabilityRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/availability/all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param availabilityType
     * @param providerUserUuid
     * @param locationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getByLocationUuid(
        availabilityType: 'IN_PERSON' | 'VIRTUAL',
        providerUserUuid?: string,
        locationUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/availability/config',
            query: {
                'availabilityType': availabilityType,
                'providerUserUuid': providerUserUuid,
                'locationUuid': locationUuid,
            },
        });
    }

}

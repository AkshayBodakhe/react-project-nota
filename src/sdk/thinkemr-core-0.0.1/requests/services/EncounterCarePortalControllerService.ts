/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EncounterDetailsRequestAndResponseCarePortal } from '../models/EncounterDetailsRequestAndResponseCarePortal';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EncounterCarePortalControllerService {

    /**
     * @param encounterUuid
     * @param emailId
     * @returns Response OK
     * @throws ApiError
     */
    public static shareEncounterDetails1(
        encounterUuid: string,
        emailId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter-care/share/encounter/{encounterUuid}/{emailId}',
            path: {
                'encounterUuid': encounterUuid,
                'emailId': emailId,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addEncounterDetails1(
        requestBody: EncounterDetailsRequestAndResponseCarePortal,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter-care/details',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param encounterUuid
     * @returns string OK
     * @throws ApiError
     */
    public static printEncounterDetails1(
        encounterUuid: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter-care/print/{encounterUuid}',
            path: {
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getEncounterDetails1(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter-care/details/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param appointmentId
     * @returns Response OK
     * @throws ApiError
     */
    public static getEncounterDetailsByAppointment1(
        appointmentId: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter-care/appointment/{appointmentId}',
            path: {
                'appointmentId': appointmentId,
            },
        });
    }

}

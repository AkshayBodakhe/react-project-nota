/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientPastSurgicalHistory } from '../models/PatientPastSurgicalHistory';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientSurgicalHistoryControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateSurgicalHistory(
        requestBody: PatientPastSurgicalHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/surgical-history/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addSurgicalHistory(
        requestBody: PatientPastSurgicalHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/surgical-history/patient',
            body: requestBody,
            mediaType: 'application/json',
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
    public static viewSurgicalHistory(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/surgical-history/patient/{patientUuid}',
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
     * @param historyId
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteMedicalHistory(
        historyId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/surgical-history/patient/surgical-history/{historyId}',
            path: {
                'historyId': historyId,
            },
        });
    }

}

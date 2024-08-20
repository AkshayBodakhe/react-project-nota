/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachPatientFlagRequest } from '../models/AttachPatientFlagRequest';
import type { PatientFlags } from '../models/PatientFlags';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientFlagsControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientFlags(
        requestBody: PatientFlags,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient-flags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createPatientFlags(
        requestBody: PatientFlags,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient-flags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static attachPatientFlags(
        requestBody: AttachPatientFlagRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient-flags/attach',
            body: requestBody,
            mediaType: 'application/json',
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
    public static getAllPatientFlags(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-flags/all/{providerGroupUuid}',
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
     * @param patientFlagsUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deletePatientFlags(
        patientFlagsUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient-flags/{patientFlagsUuid}',
            path: {
                'patientFlagsUuid': patientFlagsUuid,
            },
        });
    }

}

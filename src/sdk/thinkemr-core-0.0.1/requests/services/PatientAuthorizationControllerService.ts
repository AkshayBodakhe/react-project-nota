/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientAuthorization } from '../models/PatientAuthorization';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientAuthorizationControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientAuthorization(
        requestBody: PatientAuthorization,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance/authorization',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createPatientAuthorization(
        requestBody: PatientAuthorization,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/insurance/authorization',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientAuthorizationUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientAuthorizationStatus(
        patientAuthorizationUuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance/authorization/{patientAuthorizationUuid}/active/{status}',
            path: {
                'patientAuthorizationUuid': patientAuthorizationUuid,
                'status': status,
            },
        });
    }

    /**
     * @param patientAuthorizationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientAuthorization(
        patientAuthorizationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance/authorization/{patientAuthorizationUuid}',
            path: {
                'patientAuthorizationUuid': patientAuthorizationUuid,
            },
        });
    }

    /**
     * @param patientAuthorizationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deletePatientAuthorization(
        patientAuthorizationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/insurance/authorization/{patientAuthorizationUuid}',
            path: {
                'patientAuthorizationUuid': patientAuthorizationUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientAuthorizations(
        patientUuid: string,
        page: number,
        size: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance/authorization/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }

}

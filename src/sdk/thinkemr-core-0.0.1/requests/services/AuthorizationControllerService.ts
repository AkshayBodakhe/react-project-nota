/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientAuthorization } from '../models/PatientAuthorization';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthorizationControllerService {

    /**
     * @param patientUuid
     * @param authorizationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewAuthorizationDetails(
        patientUuid: string,
        authorizationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/authorization/patient/{patientUuid}/insurance/authorization/{authorizationUuid}',
            path: {
                'patientUuid': patientUuid,
                'authorizationUuid': authorizationUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param authorizationUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateAuthorizationForPatient(
        patientUuid: string,
        authorizationUuid: string,
        requestBody: PatientAuthorization,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/authorization/patient/{patientUuid}/insurance/authorization/{authorizationUuid}',
            path: {
                'patientUuid': patientUuid,
                'authorizationUuid': authorizationUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param authorizationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveAuthorization(
        patientUuid: string,
        authorizationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/authorization/patient/{patientUuid}/insurance/authorization/{authorizationUuid}',
            path: {
                'patientUuid': patientUuid,
                'authorizationUuid': authorizationUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param authorizationUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static activateAuthorizationForPatient(
        patientUuid: string,
        authorizationUuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/authorization/patient/{patientUuid}/insurance/authorization/{authorizationUuid}/active/{status}',
            path: {
                'patientUuid': patientUuid,
                'authorizationUuid': authorizationUuid,
                'status': status,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAuthorizationListForPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/authorization/patient/{patientUuid}/insurance/authorization',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addAuthorizationForPatient(
        patientUuid: string,
        requestBody: PatientAuthorization,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/authorization/patient/{patientUuid}/insurance/authorization',
            path: {
                'patientUuid': patientUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}

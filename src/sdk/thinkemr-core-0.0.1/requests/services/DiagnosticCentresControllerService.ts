/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiagnosticCentre } from '../models/DiagnosticCentre';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiagnosticCentresControllerService {

    /**
     * @param diagnosticCentreUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewDiagnosticCenter(
        diagnosticCentreUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/diagnostic-centre/{diagnosticCentreUuid}',
            path: {
                'diagnosticCentreUuid': diagnosticCentreUuid,
            },
        });
    }

    /**
     * @param diagnosticCentreUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateDiagnosticCenter(
        diagnosticCentreUuid: string,
        requestBody: DiagnosticCentre,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/diagnostic-centre/{diagnosticCentreUuid}',
            path: {
                'diagnosticCentreUuid': diagnosticCentreUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param diagnosticCentreUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveDiagnosticCenter(
        diagnosticCentreUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/diagnostic-centre/{diagnosticCentreUuid}',
            path: {
                'diagnosticCentreUuid': diagnosticCentreUuid,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addDiagnosticCenter(
        requestBody: DiagnosticCentre,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/diagnostic-centre',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @param type
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static listDiagnosticCenter(
        providerGroupUuid: string,
        type: 'LAB' | 'RADIOLOGY',
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/diagnostic-centre/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'type': type,
                'page': page,
                'size': size,
            },
        });
    }

}

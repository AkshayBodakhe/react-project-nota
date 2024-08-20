/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientImageResult } from '../models/PatientImageResult';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientImageResultControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateImageResults(
        requestBody: PatientImageResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/image-results',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addImageResults(
        requestBody: PatientImageResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/image-results',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientImageResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientImageResults(
        patientImageResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-results/{patientImageResultUuid}',
            path: {
                'patientImageResultUuid': patientImageResultUuid,
            },
        });
    }

    /**
     * @param patientImageResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deletePatientImageResults(
        patientImageResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient/image-results/{patientImageResultUuid}',
            path: {
                'patientImageResultUuid': patientImageResultUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientsImageResults(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-results/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

    /**
     * @param patientUuid
     * @param exportType
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns any OK
     * @throws ApiError
     */
    public static downloadPatientImageResultsList(
        patientUuid: string,
        exportType: 'CSV' | 'PDF',
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-results/download/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'exportType': exportType,
            },
        });
    }

}

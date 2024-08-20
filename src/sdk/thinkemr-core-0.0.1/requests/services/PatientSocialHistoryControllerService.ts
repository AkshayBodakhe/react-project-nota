/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientSocialHistory } from '../models/PatientSocialHistory';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientSocialHistoryControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientSocialHistory(
        requestBody: PatientSocialHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/social-history',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createPatientSocialHistory(
        requestBody: PatientSocialHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/social-history',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientSocialHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientSocialHistory(
        patientSocialHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/social-history/{patientSocialHistoryUuid}',
            path: {
                'patientSocialHistoryUuid': patientSocialHistoryUuid,
            },
        });
    }

    /**
     * @param patientSocialHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deletePatientSocialHistory(
        patientSocialHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/social-history/{patientSocialHistoryUuid}',
            path: {
                'patientSocialHistoryUuid': patientSocialHistoryUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param socialHistoryType
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllPatientSocialHistory(
        patientUuid: string,
        socialHistoryType: 'EDUCATION_LEVEL' | 'FINANCIAL_STRAIN' | 'EXPOSURE_TO_VIOLENCE' | 'TOBACCO_USE' | 'ALCOHOL_USE' | 'PHYSICAL_ACTIVITY' | 'STRESS' | 'SEXUAL_ORIENTATION' | 'NUTRITION_HISTORY' | 'SOCIAL_HISTORY',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/social-history/all/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'socialHistoryType': socialHistoryType,
            },
        });
    }

}

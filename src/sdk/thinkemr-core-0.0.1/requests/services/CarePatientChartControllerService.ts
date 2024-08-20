/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarePatientChart } from '../models/CarePatientChart';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CarePatientChartControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateCarePatientChart(
        requestBody: CarePatientChart,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/care-patient-chart',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createCarePatientChart(
        requestBody: CarePatientChart,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/care-patient-chart',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param emailId
     * @returns Response OK
     * @throws ApiError
     */
    public static sharePatientDetails1(
        patientUuid: string,
        emailId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/care-patient-chart/share/{patientUuid}/{emailId}',
            path: {
                'patientUuid': patientUuid,
                'emailId': emailId,
            },
        });
    }

    /**
     * @param carePatientChartUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getCarePatientChart(
        carePatientChartUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/care-patient-chart/{carePatientChartUuid}',
            path: {
                'carePatientChartUuid': carePatientChartUuid,
            },
        });
    }

    /**
     * @param carePatientChartUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteCarePatientChart(
        carePatientChartUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/care-patient-chart/{carePatientChartUuid}',
            path: {
                'carePatientChartUuid': carePatientChartUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns string OK
     * @throws ApiError
     */
    public static printPatientDetails1(
        patientUuid: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/care-patient-chart/print/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param carePatientChartingType
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param socialAndEnvironmentalSupportType
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllCarePatientChart(
        patientUuid: string,
        carePatientChartingType: 'ADHERENCE_TO_TREATMENT' | 'STI_TESTING_AND_HISTORY' | 'SUBSTANCE_ABUSE_HISTORY' | 'RISK_BEHAVIOR_SCREENING' | 'SOCIAL_AND_ENVIRONMENTAL_SUPPORT' | 'FAMILY_PLANNING' | 'REFERRALS_FOR_SERVICES' | 'HIV_AIDS_AND_OTHER_STDS_EDUCATION' | 'OTHERS',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
        socialAndEnvironmentalSupportType?: 'HOUSING' | 'EMPLOYMENT_SOURCES_OF_INCOME' | 'EMOTIONAL_SUPPORT' | 'FOOD_ASSISTANCE' | 'TRANSPORTATION' | 'SUPPORT_GROUPS_FAMILY' | 'HISTORY_OF_INCARCERATION',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/care-patient-chart/all/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'carePatientChartingType': carePatientChartingType,
                'socialAndEnvironmentalSupportType': socialAndEnvironmentalSupportType,
            },
        });
    }

}

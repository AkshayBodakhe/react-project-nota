/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalyticsControllerService {

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static viewStatusForProvider(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/analytics/view-status/provider-group',
        });
    }

    /**
     * @param providerGroupUuid
     * @param year
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProviderPatientStats(
        providerGroupUuid?: string,
        year?: number,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/analytics/provider-patient/stats-graph',
            query: {
                'providerGroupUuid': providerGroupUuid,
                'year': year,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getCounts(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/analytics/provider-group',
        });
    }

    /**
     * @param providerGroupAdminUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewStatus(
        providerGroupAdminUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/analytics/provider-group/{providerGroupAdminUuid}',
            path: {
                'providerGroupAdminUuid': providerGroupAdminUuid,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getTotalAnalyticsCount(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/analytics/count',
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppStatusForGroup(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/analytics/analytics/appointment',
        });
    }

}

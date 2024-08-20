/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeeSchedule } from '../models/FeeSchedule';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FeeScheduleControllerService {

    /**
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllFeeScheduleForProvider(
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/fee-schedule',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'status': status,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static editFeeSchedule(
        requestBody: FeeSchedule,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/fee-schedule',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addFeeScheduleForProvider(
        requestBody: FeeSchedule,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/fee-schedule',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param feeScheduleUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static activateFeeSchedule(
        feeScheduleUuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/fee-schedule/{feeScheduleUuid}/active/{status}',
            path: {
                'feeScheduleUuid': feeScheduleUuid,
                'status': status,
            },
        });
    }

    /**
     * @param feeScheduleUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getFeeScheduleDetails(
        feeScheduleUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/fee-schedule/{fee-schedule-uuid}',
            path: {
                'fee-schedule-uuid': feeScheduleUuid,
            },
        });
    }

    /**
     * @param feeScheduleUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveFeeSchedule(
        feeScheduleUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/fee-schedule/{fee-schedule-uuid}',
            path: {
                'fee-schedule-uuid': feeScheduleUuid,
            },
        });
    }

}

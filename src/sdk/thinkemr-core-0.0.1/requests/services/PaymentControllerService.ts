/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PaymentControllerService {

    /**
     * @param appointmentUuid
     * @param amount
     * @param paymentMode
     * @param paymentCardUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static makeCharge(
        appointmentUuid: string,
        amount: number,
        paymentMode: 'WALLET' | 'CARD' | 'CASH' | 'NET_BANKING',
        paymentCardUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/payment/charge/{appointmentUuid}',
            path: {
                'appointmentUuid': appointmentUuid,
            },
            query: {
                'paymentCardUuid': paymentCardUuid,
                'amount': amount,
                'paymentMode': paymentMode,
            },
        });
    }

    /**
     * @param patientUuid
     * @param startDate
     * @param endDate
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getPaymentHistory(
        patientUuid: string,
        startDate?: string,
        endDate?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/payment/history/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'startDate': startDate,
                'endDate': endDate,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

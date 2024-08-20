/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DuePaymentControllerService {

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getSummaryOfAccountReceivable(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/due-payment/summary',
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getDuePaymentPatientList(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/due-payment/patient',
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getInsuranceDuePayment(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/due-payment/insurance',
        });
    }

}

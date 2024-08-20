/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientPayment } from '../models/PatientPayment';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientPaymentControllerService {

    /**
     * @param patientUuid
     * @param paymentUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static editPayment(
        patientUuid: string,
        paymentUuid: string,
        requestBody: PatientPayment,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient-payment/patient/{patientUuid}/payment/{paymentUuid}',
            path: {
                'patientUuid': patientUuid,
                'paymentUuid': paymentUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPayment(
        uuid: string,
        requestBody: PatientPayment,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient-payment/patient/{uuid}/payment',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param patientPaymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewAdjustPaymentForPatient(
        patientUuid: string,
        patientPaymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-payment/patient/{patientUuid}/payment/{patientPaymentUuid}/regulate',
            path: {
                'patientUuid': patientUuid,
                'patientPaymentUuid': patientPaymentUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param patientPaymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static adjustPaymentForPatient(
        patientUuid: string,
        patientPaymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient-payment/patient/{patientUuid}/payment/{patientPaymentUuid}/regulate',
            path: {
                'patientUuid': patientUuid,
                'patientPaymentUuid': patientPaymentUuid,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getPaymentsForProviderGroup(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-payment/payment',
        });
    }

    /**
     * @param paymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPaymentDetails(
        paymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-payment/payment/{paymentUuid}',
            path: {
                'paymentUuid': paymentUuid,
            },
        });
    }

    /**
     * @param paymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static discardPayment(
        paymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient-payment/payment/{paymentUuid}',
            path: {
                'paymentUuid': paymentUuid,
            },
        });
    }

    /**
     * @param paymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static previewPaymentReceipt(
        paymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-payment/payment/{paymentUuid}/receipt',
            path: {
                'paymentUuid': paymentUuid,
            },
        });
    }

    /**
     * @param paymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static downloadPaymentReceipt(
        paymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-payment/payment/{paymentUuid}/receipt/download',
            path: {
                'paymentUuid': paymentUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPaymentsForPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-payment/patient/{patientUuid}/payment',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

}

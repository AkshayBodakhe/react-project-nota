/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InsuranceClaim } from '../models/InsuranceClaim';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InsuranceClaimControllerService {

    /**
     * @param insuranceClaimUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewInsuranceClaim(
        insuranceClaimUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance-claim/insurance-claim/{insuranceClaimUuid}',
            path: {
                'insuranceClaimUuid': insuranceClaimUuid,
            },
        });
    }

    /**
     * @param insuranceClaimUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateInsuranceClaim(
        insuranceClaimUuid: string,
        requestBody: InsuranceClaim,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance-claim/insurance-claim/{insuranceClaimUuid}',
            path: {
                'insuranceClaimUuid': insuranceClaimUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param insuranceClaimUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveInsuranceClaim(
        insuranceClaimUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/insurance-claim/insurance-claim/{insuranceClaimUuid}',
            path: {
                'insuranceClaimUuid': insuranceClaimUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param patientPaymentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewAdjustPaymentForInsurance(
        patientUuid: string,
        patientPaymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance-claim/patient/{patientUuid}/payment/{patientPaymentUuid}/regulate',
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
    public static adjustPaymentForInsurance(
        patientUuid: string,
        patientPaymentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/insurance-claim/patient/{patientUuid}/payment/{patientPaymentUuid}/regulate',
            path: {
                'patientUuid': patientUuid,
                'patientPaymentUuid': patientPaymentUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getInsuranceClaimOfPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance-claim/patient/{patientUuid}/insurance-claim',
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
    public static addInsuranceClaim(
        patientUuid: string,
        requestBody: InsuranceClaim,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/insurance-claim/patient/{patientUuid}/insurance-claim',
            path: {
                'patientUuid': patientUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param insuranceClaimUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static previewInsuranceClaim(
        insuranceClaimUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance-claim/insurance-claim/{insuranceClaimUuid}/preview',
            path: {
                'insuranceClaimUuid': insuranceClaimUuid,
            },
        });
    }

    /**
     * @param insuranceClaimUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static downloadInsuranceClaim(
        insuranceClaimUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance-claim/insurance-claim/{insuranceClaimUuid}/download',
            path: {
                'insuranceClaimUuid': insuranceClaimUuid,
            },
        });
    }

}

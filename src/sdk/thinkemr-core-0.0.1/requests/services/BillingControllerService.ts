/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';
import type { Superbill } from '../models/Superbill';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BillingControllerService {

    /**
     * @param superbillUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static editSuperbill(
        superbillUuid: string,
        requestBody: Superbill,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/billing/bill/{superbillUuid}',
            path: {
                'superbillUuid': superbillUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllSuperbillsForPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/billing/patient/{patientUuid}/bill',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static addEncounterForSuperBill(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/billing/patient/{patientUuid}/bill',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllSuperBills(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/billing/bill',
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConsentForm } from '../models/ConsentForm';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConsentFormControllerService {

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllConsentFormsForProvider(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/consent-form',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static editConsentForm(
        requestBody: ConsentForm,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/consent-form',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addConsentFormForProvider(
        requestBody: ConsentForm,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/consent-form',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param consentFormUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateConfiguration(
        consentFormUuid: string,
        requestBody: ConsentForm,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/consent-form/{consent-form-uuid}/configure',
            path: {
                'consent-form-uuid': consentFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param consentFormUuid
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getSignedConsentFormOfPatient(
        consentFormUuid: string,
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/consent-form/{consent-form-uuid}/patient/{patient-uuid}',
            path: {
                'consent-form-uuid': consentFormUuid,
                'patient-uuid': patientUuid,
            },
        });
    }

    /**
     * @param consentFormUuid
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static sendReminderForConsentFormToPatient(
        consentFormUuid: string,
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/consent-form/{consent-form-uuid}/patient/{patient-uuid}',
            path: {
                'consent-form-uuid': consentFormUuid,
                'patient-uuid': patientUuid,
            },
        });
    }

    /**
     * @param consentFormUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getConsentForm(
        consentFormUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/consent-form/{consent-form-uuid}',
            path: {
                'consent-form-uuid': consentFormUuid,
            },
        });
    }

    /**
     * @param consentFormUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveConsentForm(
        consentFormUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/consent-form/{consent-form-uuid}',
            path: {
                'consent-form-uuid': consentFormUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllSignedConsentFormsOfPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/consent-form/patient/{patient-uuid}',
            path: {
                'patient-uuid': patientUuid,
            },
        });
    }

}

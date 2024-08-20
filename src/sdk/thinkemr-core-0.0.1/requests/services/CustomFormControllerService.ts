/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomFormRequest } from '../models/CustomFormRequest';
import type { DuplicateCustomFormRequest } from '../models/DuplicateCustomFormRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CustomFormControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateCustomForm(
        requestBody: CustomFormRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/custom-form',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createCustomForm(
        requestBody: CustomFormRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/custom-form',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @param consentFormUuid
     * @param title
     * @param mandatory
     * @param assignedByDefault
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateConsentForm(
        providerGroupUuid: string,
        consentFormUuid: string,
        title: string,
        mandatory?: boolean,
        assignedByDefault?: boolean,
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/custom-form/consent-form/{consentFormUuid}',
            path: {
                'consentFormUuid': consentFormUuid,
            },
            query: {
                'providerGroupUuid': providerGroupUuid,
                'title': title,
                'mandatory': mandatory,
                'assignedByDefault': assignedByDefault,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createDuplicateIntakeForm(
        requestBody: DuplicateCustomFormRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/custom-form/duplicate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @param title
     * @param mandatory
     * @param assignedByDefault
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static uploadConsentForm(
        providerGroupUuid: string,
        title: string,
        mandatory?: boolean,
        assignedByDefault?: boolean,
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/custom-form/consent-form',
            query: {
                'providerGroupUuid': providerGroupUuid,
                'title': title,
                'mandatory': mandatory,
                'assignedByDefault': assignedByDefault,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param type
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getCustomForm(
        type: 'INTAKE_FORM' | 'CONSENT_FORM' | 'VISIT_NOTE',
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/custom-form/{type}/{uuid}',
            path: {
                'type': type,
                'uuid': uuid,
            },
        });
    }

    /**
     * @param type
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteCustomForm(
        type: 'INTAKE_FORM' | 'CONSENT_FORM' | 'VISIT_NOTE',
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/custom-form/{type}/{uuid}',
            path: {
                'type': type,
                'uuid': uuid,
            },
        });
    }

    /**
     * @param type
     * @param providerGroupUuid
     * @param title
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllCustomForms(
        type: 'INTAKE_FORM' | 'CONSENT_FORM' | 'VISIT_NOTE',
        providerGroupUuid: string,
        title?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/custom-form/all/{type}/{providerGroupUuid}',
            path: {
                'type': type,
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'title': title,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

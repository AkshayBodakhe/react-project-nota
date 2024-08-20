/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomTemplateRequest } from '../models/CustomTemplateRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CustomTemplateControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateCustomTemplate(
        requestBody: CustomTemplateRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/custom-template',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createCustomTemplate(
        requestBody: CustomTemplateRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/custom-template',
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
    public static getCustomTemplate(
        type: 'VISIT_NOTE' | 'CUSTOM_QUESTIONNAIRE' | 'REVIEW_OF_SYSTEM' | 'PHYSICAL_EXAM',
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/custom-template/{type}/{uuid}',
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
    public static deleteCustomTemplate(
        type: 'VISIT_NOTE' | 'CUSTOM_QUESTIONNAIRE' | 'REVIEW_OF_SYSTEM' | 'PHYSICAL_EXAM',
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/custom-template/{type}/{uuid}',
            path: {
                'type': type,
                'uuid': uuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param type
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllCustomTemplate(
        providerGroupUuid: string,
        type: 'VISIT_NOTE' | 'CUSTOM_QUESTIONNAIRE' | 'REVIEW_OF_SYSTEM' | 'PHYSICAL_EXAM',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/custom-template/all/{type}/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
                'type': type,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

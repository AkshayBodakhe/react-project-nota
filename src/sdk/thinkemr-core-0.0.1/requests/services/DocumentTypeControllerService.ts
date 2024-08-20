/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentTypes } from '../models/DocumentTypes';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DocumentTypeControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateDocumentType(
        requestBody: DocumentTypes,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/document-type',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addDocumentType(
        requestBody: DocumentTypes,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/document-type',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllDocumentType(
        page?: number,
        size?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/document-type/get/all',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteDocumentType(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/document-type/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

}

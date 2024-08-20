/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactDirectory } from '../models/ContactDirectory';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContactDirectoryControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateContactDirectory(
        requestBody: ContactDirectory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/contact-directory',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createContactDirectory(
        requestBody: ContactDirectory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/contact-directory',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @param contactType
     * @param searchString
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllContactDirectory(
        providerGroupUuid: string,
        contactType?: 'INSURANCE_PAYER' | 'LAB' | 'CLINIC' | 'VENDOR' | 'PHARMACY' | 'RADIOLOGY' | 'PROVIDER' | 'PATIENT' | 'OTHER',
        searchString?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/contact-directory/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'contactType': contactType,
                'searchString': searchString,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param contactDirectoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteContactDirectory(
        contactDirectoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/contact-directory/{contactDirectoryUuid}',
            path: {
                'contactDirectoryUuid': contactDirectoryUuid,
            },
        });
    }

}

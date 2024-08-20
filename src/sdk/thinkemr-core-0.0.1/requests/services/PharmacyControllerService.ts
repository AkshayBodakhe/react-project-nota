/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PharmacyStore } from '../models/PharmacyStore';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PharmacyControllerService {

    /**
     * @param pharmacyStoreUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPharmacyDetails(
        pharmacyStoreUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/pharmacy/{pharmacyStoreUuid}',
            path: {
                'pharmacyStoreUuid': pharmacyStoreUuid,
            },
        });
    }

    /**
     * @param pharmacyStoreUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePharmacy(
        pharmacyStoreUuid: string,
        requestBody: PharmacyStore,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/pharmacy/{pharmacyStoreUuid}',
            path: {
                'pharmacyStoreUuid': pharmacyStoreUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param pharmacyStoreUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePharmacy(
        pharmacyStoreUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/pharmacy/{pharmacyStoreUuid}',
            path: {
                'pharmacyStoreUuid': pharmacyStoreUuid,
            },
        });
    }

    /**
     * @param pharmacyStoreUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static activatePharmacy(
        pharmacyStoreUuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/pharmacy/{pharmacyStoreUuid}/active/{status}',
            path: {
                'pharmacyStoreUuid': pharmacyStoreUuid,
                'status': status,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPharmacy(
        requestBody: PharmacyStore,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/pharmacy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getPharmacyForProviderGroup(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/pharmacy/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

}

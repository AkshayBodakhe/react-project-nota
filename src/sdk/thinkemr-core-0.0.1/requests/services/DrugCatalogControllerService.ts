/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DrugCatalog } from '../models/DrugCatalog';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DrugCatalogControllerService {

    /**
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllDrugs(
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/drug-catalog',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'ProviderGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateDrugCatalog(
        requestBody: DrugCatalog,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/drug-catalog',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addDrugCatalog(
        requestBody: DrugCatalog,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/drug-catalog',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updateStatus3(
        uuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/drug-catalog/{uuid}/active/{status}',
            path: {
                'uuid': uuid,
                'status': status,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewDrugCatalog(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/drug-catalog/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteDrugCatalog(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/drug-catalog/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

}

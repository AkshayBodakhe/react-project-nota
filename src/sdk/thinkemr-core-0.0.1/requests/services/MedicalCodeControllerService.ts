/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillingCodes } from '../models/BillingCodes';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MedicalCodeControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateBillingCodes(
        requestBody: BillingCodes,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/medical-code',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addBillingCodes(
        requestBody: BillingCodes,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/medical-code',
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
    public static updateStatus1(
        uuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/medical-code/{uuid}/active/{status}',
            path: {
                'uuid': uuid,
                'status': status,
            },
        });
    }

    /**
     * @param codeType
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param providerGroupUuid
     * @param searchString
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllMedicalCodes(
        codeType: 'CPT' | 'HCPCS' | 'LOINC' | 'ICD' | 'PATIENT' | 'PROVIDER' | 'DRUG',
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        providerGroupUuid?: string,
        searchString?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medical-code/{code-type}',
            path: {
                'code-type': codeType,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'ProviderGroupUuid': providerGroupUuid,
                'searchString': searchString,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getBillingCodes(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medical-code/by/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param codeType
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProcedureCodes(
        codeType?: 'HCPCS' | 'CPT',
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medical-code/all/procedural-code',
            query: {
                'codeType': codeType,
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteBillingCodes(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/medical-code/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

}

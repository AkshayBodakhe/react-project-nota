/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MigrationControllerService {

    /**
     * @param category
     * @param title
     * @param formData
     * @param providerGroupUuid
     * @param locationUuid
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static uploadFile(
        category: 'CPT' | 'HCPCS' | 'LOINC' | 'ICD' | 'PATIENT' | 'PROVIDER' | 'DRUG',
        title: string,
        formData: {
            file: Blob;
        },
        providerGroupUuid?: string,
        locationUuid?: string,
        providerUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/data-import/{category}/upload',
            path: {
                'category': category,
            },
            query: {
                'provider-group-uuid': providerGroupUuid,
                'locationUuid': locationUuid,
                'providerUuid': providerUuid,
                'title': title,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param category
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAuditLog(
        category: 'CPT' | 'HCPCS' | 'LOINC' | 'ICD' | 'PATIENT' | 'PROVIDER' | 'DRUG',
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/{category}/history',
            path: {
                'category': category,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @param category
     * @param sourceId
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getViewRecords(
        category: 'CPT' | 'HCPCS' | 'LOINC' | 'ICD' | 'PATIENT' | 'PROVIDER' | 'DRUG',
        sourceId: number,
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/view-record/{category}/auditlog-id/{sourceId}',
            path: {
                'category': category,
                'sourceId': sourceId,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @param category
     * @returns binary OK
     * @throws ApiError
     */
    public static downloadTemplate(
        category: 'CPT' | 'HCPCS' | 'LOINC' | 'ICD' | 'PATIENT' | 'PROVIDER' | 'DRUG',
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/sample/{category}',
            path: {
                'category': category,
            },
        });
    }

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
    public static getViewProviderRecords(
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
        searchString?: string,
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/provider-data',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

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
    public static getViewPatientRecords(
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
        searchString?: string,
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/patient-data',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getDataEntity(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/latest',
        });
    }

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
    public static getDataImportRecords(
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
        searchString?: string,
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/data-import/all/latest',
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

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageOrderSet } from '../models/ImageOrderSet';
import type { PatientImageOrder } from '../models/PatientImageOrder';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientImageOrderControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientImageOrder(
        requestBody: PatientImageOrder,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/image-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientImageOrder(
        requestBody: PatientImageOrder,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/image-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param imageOrderUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updateMarkAsCompleted1(
        imageOrderUuid: string,
        status: 'RECEIVE' | 'SEND' | 'DRAFT' | 'COMPLETE',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/image-order/{imageOrderUuid}/status/{status}',
            path: {
                'imageOrderUuid': imageOrderUuid,
                'status': status,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addImageOrderSet(
        requestBody: ImageOrderSet,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/image-order/order-set',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param imageOrderUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewImageOrder(
        imageOrderUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-order/{imageOrderUuid}',
            path: {
                'imageOrderUuid': imageOrderUuid,
            },
        });
    }

    /**
     * @param imageOrderUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteImageOrder(
        imageOrderUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient/image-order/{imageOrderUuid}',
            path: {
                'imageOrderUuid': imageOrderUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllImageOrders(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-order/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllOrderStudies(
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-order/order-studies',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllImageCenters(
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/image-order/all/image-center',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

}

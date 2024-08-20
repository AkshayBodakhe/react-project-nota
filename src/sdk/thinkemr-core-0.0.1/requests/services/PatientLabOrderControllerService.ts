/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderSet } from '../models/OrderSet';
import type { PatientLabOrder } from '../models/PatientLabOrder';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientLabOrderControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientLabOrder(
        requestBody: PatientLabOrder,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/lab-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientLabOrder(
        requestBody: PatientLabOrder,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/lab-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientLabOrderUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updateMarkAsCompleted(
        patientLabOrderUuid: string,
        status: 'RECEIVE' | 'SEND' | 'DRAFT' | 'COMPLETE',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/lab-order/{patientLabOrderUuid}/status/{status}',
            path: {
                'patientLabOrderUuid': patientLabOrderUuid,
                'status': status,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addOrderSet(
        requestBody: OrderSet,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/lab-order/order-set',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientLabOrderUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientLabOrder(
        patientLabOrderUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/lab-order/{patientLabOrderUuid}',
            path: {
                'patientLabOrderUuid': patientLabOrderUuid,
            },
        });
    }

    /**
     * @param patientLabOrderUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deletePatientLabOrder(
        patientLabOrderUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient/lab-order/{patientLabOrderUuid}',
            path: {
                'patientLabOrderUuid': patientLabOrderUuid,
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
    public static getAllLabOrders(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/lab-order/all/{patientUuid}',
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
    public static getAllTests(
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/lab-order/all-tests',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

}

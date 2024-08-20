/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookAppointmentRequest } from '../models/BookAppointmentRequest';
import type { Notification } from '../models/Notification';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationsControllerService {

    /**
     * @param notificationId
     * @returns Response OK
     * @throws ApiError
     */
    public static markNotificationAsSeen(
        notificationId: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/notification/seen/{notificationId}',
            path: {
                'notificationId': notificationId,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addNotifications(
        requestBody: Notification,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns Response OK
     * @throws ApiError
     */
    public static rejectAppointmentRequest(
        id: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification/reject/request/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static acceptAppointmentRequest(
        id: number,
        requestBody: BookAppointmentRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification/accept/request/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getUnseenProviderNotificationsCount(
        providerGroupUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/unseen/count/provider/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getUnseenPatientNotificationsCount(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/unseen/count/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderNotifications(
        providerGroupUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/provider/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientNotifications(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

}

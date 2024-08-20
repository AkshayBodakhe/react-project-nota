/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProviderNotificationsControllerService {

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewProviderNotification(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider-notification/provider/{providerUuid}/notification-setting',
            path: {
                'providerUuid': providerUuid,
            },
        });
    }

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static updateProviderNotification(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/provider-notification/provider/{providerUuid}/notification-setting',
            path: {
                'providerUuid': providerUuid,
            },
        });
    }

}

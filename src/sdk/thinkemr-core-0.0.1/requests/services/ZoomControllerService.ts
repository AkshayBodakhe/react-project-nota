/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';
import type { SseEmitter } from '../models/SseEmitter';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ZoomControllerService {

    /**
     * @param appointmentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAuthToken(
        appointmentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/token/{appointmentUuid}',
            path: {
                'appointmentUuid': appointmentUuid,
            },
        });
    }

    /**
     * @param eventKey
     * @returns SseEmitter OK
     * @throws ApiError
     */
    public static subscribe(
        eventKey: string,
    ): CancelablePromise<SseEmitter> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/event/subscribe/{eventKey}',
            path: {
                'eventKey': eventKey,
            },
        });
    }

    /**
     * @param eventKey
     * @returns Response OK
     * @throws ApiError
     */
    public static emit(
        eventKey: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/event/emit/{eventKey}',
            path: {
                'eventKey': eventKey,
            },
        });
    }

}

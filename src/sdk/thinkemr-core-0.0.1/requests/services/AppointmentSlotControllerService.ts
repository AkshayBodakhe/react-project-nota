/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppointmentSlotControllerService {

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static fetchProviderAppointmentSlots(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/provider/{providerUuid}/appointment-slots',
            path: {
                'providerUuid': providerUuid,
            },
        });
    }

}

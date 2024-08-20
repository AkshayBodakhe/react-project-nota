/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EprescriptionControllerService {

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static sendPrescriptionToPatient(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/eprescription/patient/{patientUuid}/encounter/{encounterUuid}/prescription/send',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getEprescriptionPreview(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/eprescription/patient/{patientUuid}/encounter/{encounterUuid}/prescription',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static downloadEprescription(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/eprescription/patient/{patientUuid}/encounter/{encounterUuid}/prescription/download',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

}

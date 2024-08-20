/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientPermission } from '../models/PatientPermission';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientPortalAccessControllerService {

    /**
     * @param patientUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientPortalAccess(
        patientUuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient-portal-access/patient/{patientUuid}/active/{status}',
            path: {
                'patientUuid': patientUuid,
                'status': status,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientPortalPermission(
        requestBody: PatientPermission,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient-portal-access/patient/permissions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientPortalPermissions(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-portal-access/patient/{patientUuid}/permissions',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

}

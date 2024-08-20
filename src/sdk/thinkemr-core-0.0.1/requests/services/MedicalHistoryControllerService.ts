/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakePatientMedicalHistory } from '../models/IntakePatientMedicalHistory';
import type { PatientPastMedicalHistory } from '../models/PatientPastMedicalHistory';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MedicalHistoryControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateMedicalHistory(
        requestBody: PatientPastMedicalHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/medical-history/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addMedicalHistory(
        requestBody: PatientPastMedicalHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/medical-history/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addIntakeMedicalHistory(
        intakeFormUuid: string,
        requestBody: IntakePatientMedicalHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/medical-history/intake/{intakeFormUuid}/medical-history',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static viewMedicalHistory(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medical-history/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param intakeMedicalHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeMedicalHistory(
        intakeMedicalHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medical-history/intake/{intakeMedicalHistoryUuid}/medical-history',
            path: {
                'intakeMedicalHistoryUuid': intakeMedicalHistoryUuid,
            },
        });
    }

    /**
     * @param historyId
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteMedicalHistory1(
        historyId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/medical-history/patient/medical-history/{historyId}',
            path: {
                'historyId': historyId,
            },
        });
    }

}

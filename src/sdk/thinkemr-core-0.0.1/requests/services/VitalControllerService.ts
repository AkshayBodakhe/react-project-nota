/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientVital } from '../models/PatientVital';
import type { PatientVitalRequest } from '../models/PatientVitalRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VitalControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientVitals(
        requestBody: Array<PatientVital>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/vital/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientVitals(
        requestBody: PatientVitalRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/vital/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeVitals(
        patientUuid: string,
        intakeFormUuid: string,
        intakeVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/patient/{patientUuid}/intake/{intakeFormUuid}/vital/{intakeVitalUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeVitalUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeVitals(
        patientUuid: string,
        intakeFormUuid: string,
        intakeVitalUuid: string,
        requestBody: PatientVital,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/vital/patient/{patientUuid}/intake/{intakeFormUuid}/vital/{intakeVitalUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeVitals(
        patientUuid: string,
        intakeFormUuid: string,
        intakeVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/vital/patient/{patientUuid}/intake/{intakeFormUuid}/vital/{intakeVitalUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeVitalsForPatient(
        intakeFormUuid: string,
        intakeVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/intake/{intakeFormUuid}/vital/{intakeVitalUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeVitalUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeVitalsForPatient(
        intakeFormUuid: string,
        intakeVitalUuid: string,
        requestBody: PatientVital,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/vital/intake/{intakeFormUuid}/vital/{intakeVitalUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeVitalsForPatient(
        intakeFormUuid: string,
        intakeVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/vital/intake/{intakeFormUuid}/vital/{intakeVitalUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientIntakeVitals(
        patientUuid: string,
        intakeFormUuid: string,
        requestBody: PatientVital,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/vital/patient/{patientUuid}/intake/{intakeFormUuid}/vital',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
            },
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
    public static addPatientIntakeVitalsForPatient(
        intakeFormUuid: string,
        requestBody: PatientVital,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/vital/intake/{intakeFormUuid}/vital',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientVitals(
        patientVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/{patientVitalUuid}',
            path: {
                'patientVitalUuid': patientVitalUuid,
            },
        });
    }

    /**
     * @param patientVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientVitals(
        patientVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/vital/{patientVitalUuid}',
            path: {
                'patientVitalUuid': patientVitalUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientVitalRecordsByPatientId(
        patientUuid: string,
        page: number,
        size: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/patient/{patientUuid}/vitals',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param name
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientsVital(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
        name?: 'TEMPERATURE' | 'BLOOD_PRESSURE' | 'HEART_RATE' | 'RESPIRATION_RATE' | 'OXYGEN_SATURATION' | 'HEIGHT' | 'WEIGHT' | 'BMI',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/patient/{patientUuid}/vital',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'name': name,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientsIntakeVital(
        patientUuid: string,
        intakeVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/patient/{patientUuid}/intake/{intakeVitalUuid}/vital',
            path: {
                'patientUuid': patientUuid,
                'intakeVitalUuid': intakeVitalUuid,
            },
        });
    }

    /**
     * @param intakeVitalUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientsIntakeVitalForPatient(
        intakeVitalUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vital/intake/{intakeVitalUuid}/vital',
            path: {
                'intakeVitalUuid': intakeVitalUuid,
            },
        });
    }

}

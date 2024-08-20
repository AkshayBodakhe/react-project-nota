/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakePatientFamilyHistory } from '../models/IntakePatientFamilyHistory';
import type { PatientFamilyHistory } from '../models/PatientFamilyHistory';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FamilyHistoryControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientsFamilyHistory(
        requestBody: PatientFamilyHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/family-history/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientsFamilyHistory(
        requestBody: PatientFamilyHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/family-history/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeFamilyHistory(
        patientUuid: string,
        intakeFormUuid: string,
        intakeFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-history/patient/{patientUuid}/intake/{intakeFormUuid}/family-history/{intakeFamilyHistoryUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeFamilyHistoryUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeFamilyHistory(
        patientUuid: string,
        intakeFormUuid: string,
        intakeFamilyHistoryUuid: string,
        requestBody: IntakePatientFamilyHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/family-history/patient/{patientUuid}/intake/{intakeFormUuid}/family-history/{intakeFamilyHistoryUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeFamilyHistory(
        patientUuid: string,
        intakeFormUuid: string,
        intakeFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/family-history/patient/{patientUuid}/intake/{intakeFormUuid}/family-history/{intakeFamilyHistoryUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeFamilyHistoryForPatient(
        intakeFormUuid: string,
        intakeFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-history/intake/{intakeFormUuid}/family-history/{intakeFamilyHistoryUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeFamilyHistoryUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeFamilyHistoryForPatient(
        intakeFormUuid: string,
        intakeFamilyHistoryUuid: string,
        requestBody: IntakePatientFamilyHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/family-history/intake/{intakeFormUuid}/family-history/{intakeFamilyHistoryUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeFamilyHistoryForPatient(
        intakeFormUuid: string,
        intakeFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/family-history/intake/{intakeFormUuid}/family-history/{intakeFamilyHistoryUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
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
    public static addPatientsIntakeFamilyHistory(
        patientUuid: string,
        intakeFormUuid: string,
        requestBody: IntakePatientFamilyHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/family-history/patient/{patientUuid}/intake/{intakeFormUuid}/family-history',
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
    public static addPatientsIntakeFamilyHistoryForPatient(
        intakeFormUuid: string,
        requestBody: IntakePatientFamilyHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/family-history/intake/{intakeFormUuid}/family-history',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeFamilyHistory(
        patientUuid: string,
        intakeFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-history/patient/{patientUuid}/intake/{intakeFamilyHistoryUuid}/family-history',
            path: {
                'patientUuid': patientUuid,
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
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
    public static getPatientFamilyHistory(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-history/patient/{patientUuid}/family-history',
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
     * @param patientFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientFamilyHistory(
        patientFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-history/patient/family-history/{patientFamilyHistoryUuid}',
            path: {
                'patientFamilyHistoryUuid': patientFamilyHistoryUuid,
            },
        });
    }

    /**
     * @param patientFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientFamilyHistory(
        patientFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/family-history/patient/family-history/{patientFamilyHistoryUuid}',
            path: {
                'patientFamilyHistoryUuid': patientFamilyHistoryUuid,
            },
        });
    }

    /**
     * @param intakeFamilyHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeFamilyHistoryForPatient(
        intakeFamilyHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-history/intake/{intakeFamilyHistoryUuid}/family-history',
            path: {
                'intakeFamilyHistoryUuid': intakeFamilyHistoryUuid,
            },
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatientLabResult } from '../models/PatientLabResult';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientLabResultsControllerService {

    /**
     * @param uuid
     * @param intakeFormUuid
     * @param labResultUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeLabResults(
        uuid: string,
        intakeFormUuid: string,
        labResultUuid: string,
        requestBody: PatientLabResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/results/patient/{uuid}/intake/{intakeFormUuid}/lab-result/{labResultUuid}',
            path: {
                'uuid': uuid,
                'intakeFormUuid': intakeFormUuid,
                'labResultUuid': labResultUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientLabResults(
        requestBody: PatientLabResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/results/patient/lab-result',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addLabResults(
        requestBody: PatientLabResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/results/patient/lab-result',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param labResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeLabResultsForPatients(
        intakeFormUuid: string,
        labResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/intake/{intakeFormUuid}/lab-result/{labResultUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'labResultUuid': labResultUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param labResultUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeLabResultsForPatient(
        intakeFormUuid: string,
        labResultUuid: string,
        requestBody: PatientLabResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/results/intake/{intakeFormUuid}/lab-result/{labResultUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'labResultUuid': labResultUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param labResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveIntakeLabResultsForPatient(
        intakeFormUuid: string,
        labResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/results/intake/{intakeFormUuid}/lab-result/{labResultUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'labResultUuid': labResultUuid,
            },
        });
    }

    /**
     * @param uuid
     * @param intakeFormUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeLabResults(
        uuid: string,
        intakeFormUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/patient/{uuid}/intake/{intakeFormUuid}/lab-result',
            path: {
                'uuid': uuid,
                'intakeFormUuid': intakeFormUuid,
            },
        });
    }

    /**
     * @param uuid
     * @param intakeFormUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addIntakeLabResults(
        uuid: string,
        intakeFormUuid: string,
        requestBody: PatientLabResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/results/patient/{uuid}/intake/{intakeFormUuid}/lab-result',
            path: {
                'uuid': uuid,
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeLabResultsForPatient(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/intake/{uuid}/lab-result',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param uuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addIntakeLabResultsForPatient(
        uuid: string,
        requestBody: PatientLabResult,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/results/intake/{uuid}/lab-result',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    public static getPatientsLabResults(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/patient/{patientUuid}/lab-result',
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
     * @param patientUuid
     * @param intakeFormUuid
     * @param labResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeLabResults(
        patientUuid: string,
        intakeFormUuid: string,
        labResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/patient/{patientUuid}/intake/{intakeFormUuid}/lab-result/{labResultUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'labResultUuid': labResultUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param labResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveIntakeLabResults(
        patientUuid: string,
        intakeFormUuid: string,
        labResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/results/patient/{patientUuid}/intake/{intakeFormUuid}/lab-result/{labResultUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'labResultUuid': labResultUuid,
            },
        });
    }

    /**
     * @param patientLabResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientLabResults(
        patientLabResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/patient/lab-result/{patientLabResultUuid}',
            path: {
                'patientLabResultUuid': patientLabResultUuid,
            },
        });
    }

    /**
     * @param patientLabResultUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveLabResults(
        patientLabResultUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/results/patient/lab-result/{patientLabResultUuid}',
            path: {
                'patientLabResultUuid': patientLabResultUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param exportType
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns any OK
     * @throws ApiError
     */
    public static downloadPatientLabResultsList(
        patientUuid: string,
        exportType: 'CSV' | 'PDF',
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/results/download/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'exportType': exportType,
            },
        });
    }

}

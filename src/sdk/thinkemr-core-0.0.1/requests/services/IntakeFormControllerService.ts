/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakeForm } from '../models/IntakeForm';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IntakeFormControllerService {

    /**
     * @param patientId
     * @param intakeFormId
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeFormDetailsProvider(
        patientId: string,
        intakeFormId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/{patientId}/intake-form/{intakeFormId}',
            path: {
                'patientId': patientId,
                'intakeFormId': intakeFormId,
            },
        });
    }

    /**
     * @param patientId
     * @param intakeFormId
     * @returns Response OK
     * @throws ApiError
     */
    public static updateIntakeFormForProvider(
        patientId: string,
        intakeFormId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/{patientId}/intake-form/{intakeFormId}',
            path: {
                'patientId': patientId,
                'intakeFormId': intakeFormId,
            },
        });
    }

    /**
     * @param patientId
     * @param intakeFormId
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveIntakeFormForProvider(
        patientId: string,
        intakeFormId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient/{patientId}/intake-form/{intakeFormId}',
            path: {
                'patientId': patientId,
                'intakeFormId': intakeFormId,
            },
        });
    }

    /**
     * @param intakeFormId
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeFormDetailsPatient(
        intakeFormId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/intake-form/{intakeFormId}',
            path: {
                'intakeFormId': intakeFormId,
            },
        });
    }

    /**
     * @param intakeFormId
     * @returns Response OK
     * @throws ApiError
     */
    public static updateIntakeFormForPatient(
        intakeFormId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/intake-form/{intakeFormId}',
            path: {
                'intakeFormId': intakeFormId,
            },
        });
    }

    /**
     * @param patientId
     * @returns Response OK
     * @throws ApiError
     */
    public static getIntakeFormsForProvider(
        patientId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/{patientId}/intake-form',
            path: {
                'patientId': patientId,
            },
        });
    }

    /**
     * @param patientId
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static fillIntakeFormForProvider(
        patientId: string,
        requestBody: IntakeForm,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/{patientId}/intake-form',
            path: {
                'patientId': patientId,
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
    public static fillIntakeFormForPatient(
        requestBody: IntakeForm,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/intake-form',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientId
     * @returns Response OK
     * @throws ApiError
     */
    public static loadPreviousIntakeForm(
        patientId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/{patientId}/intake-form/last-completed',
            path: {
                'patientId': patientId,
            },
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
    public static getAllQuestionnaire(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/questionnaire/{patientUuid}',
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
     * @param appointmentUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllPatientIntakeForms(
        appointmentUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/intake-form/{appointmentUuid}',
            path: {
                'appointmentUuid': appointmentUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param appointmentUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllAppointmentIntakeForms(
        appointmentUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/intake-form/{appointmentUuid}',
            path: {
                'appointmentUuid': appointmentUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

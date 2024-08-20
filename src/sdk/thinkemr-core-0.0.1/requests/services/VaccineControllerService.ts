/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakeVaccine } from '../models/IntakeVaccine';
import type { PatientVaccine } from '../models/PatientVaccine';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VaccineControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientVaccine(
        requestBody: PatientVaccine,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/vaccine/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientVaccine(
        requestBody: PatientVaccine,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/vaccine/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeAllergyOfVaccine(
        patientUuid: string,
        intakeFormUuid: string,
        intakeVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine/patient/{patientUuid}/intake/{intakeFormUuid}/vaccine/{intakeVaccineUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeVaccineUuid': intakeVaccineUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeVaccineUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeVaccine(
        patientUuid: string,
        intakeFormUuid: string,
        intakeVaccineUuid: string,
        requestBody: IntakeVaccine,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/vaccine/patient/{patientUuid}/intake/{intakeFormUuid}/vaccine/{intakeVaccineUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeVaccineUuid': intakeVaccineUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeVaccineForProvider(
        patientUuid: string,
        intakeFormUuid: string,
        intakeVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/vaccine/patient/{patientUuid}/intake/{intakeFormUuid}/vaccine/{intakeVaccineUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeVaccineUuid': intakeVaccineUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeAllergyOfVaccineForPatient(
        intakeFormUuid: string,
        intakeVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine/intake/{intakeFormUuid}/vaccine/{intakeVaccineUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeVaccineUuid': intakeVaccineUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeVaccineUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeVaccineForPatient(
        intakeFormUuid: string,
        intakeVaccineUuid: string,
        requestBody: IntakeVaccine,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/vaccine/intake/{intakeFormUuid}/vaccine/{intakeVaccineUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeVaccineUuid': intakeVaccineUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeVaccineForPatient(
        intakeFormUuid: string,
        intakeVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/vaccine/intake/{intakeFormUuid}/vaccine/{intakeVaccineUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeVaccineUuid': intakeVaccineUuid,
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
    public static addPatientIntakeVaccine(
        patientUuid: string,
        intakeFormUuid: string,
        requestBody: IntakeVaccine,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/vaccine/patient/{patientUuid}/intake/{intakeFormUuid}/vaccine',
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
    public static addPatientIntakeVaccineForPatient(
        intakeFormUuid: string,
        requestBody: IntakeVaccine,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/vaccine/intake/{intakeFormUuid}/vaccine',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllVaccines(
        page?: number,
        size?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param uuid
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientVaccineDetails(
        uuid: string,
        page: number,
        size: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine/patient/{uuid}/vaccine',
            path: {
                'uuid': uuid,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param uuid
     * @param intakeVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeVaccineDetails(
        uuid: string,
        intakeVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine/patient/{uuid}/intake/{intakeVaccineUuid}/vaccine',
            path: {
                'uuid': uuid,
                'intakeVaccineUuid': intakeVaccineUuid,
            },
        });
    }

    /**
     * @param patientVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientVaccine(
        patientVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine/patient/{patientVaccineUuid}',
            path: {
                'patientVaccineUuid': patientVaccineUuid,
            },
        });
    }

    /**
     * @param patientVaccineUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientVaccine(
        patientVaccineUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/vaccine/patient/{patientVaccineUuid}',
            path: {
                'patientVaccineUuid': patientVaccineUuid,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeVaccineDetailsForPatient(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/vaccine/intake/{uuid}/vaccine',
            path: {
                'uuid': uuid,
            },
        });
    }

}

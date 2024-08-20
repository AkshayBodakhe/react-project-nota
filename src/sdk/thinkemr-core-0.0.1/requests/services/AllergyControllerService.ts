/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakeAllergy } from '../models/IntakeAllergy';
import type { PatientAllergy } from '../models/PatientAllergy';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AllergyControllerService {

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllAllergies(
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientAllergies(
        requestBody: PatientAllergy,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/allergy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientAllergies(
        requestBody: PatientAllergy,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/allergy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeUuid
     * @param patientAllergyUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeAllergiesForProvider(
        patientUuid: string,
        intakeUuid: string,
        patientAllergyUuid: string,
        requestBody: PatientAllergy,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/allergy/patient/{patientUuid}/intake/{intakeUuid}/allergy/{patientAllergyUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeUuid': intakeUuid,
                'patientAllergyUuid': patientAllergyUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeUuid
     * @param patientAllergyUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeAllergiesForProvider(
        patientUuid: string,
        intakeUuid: string,
        patientAllergyUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/allergy/patient/{patientUuid}/intake/{intakeUuid}/allergy/{patientAllergyUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeUuid': intakeUuid,
                'patientAllergyUuid': patientAllergyUuid,
            },
        });
    }

    /**
     * @param intakeUuid
     * @param patientAllergyUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeAllergiesForPatient(
        intakeUuid: string,
        patientAllergyUuid: string,
        requestBody: PatientAllergy,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/allergy/intake/{intakeUuid}/allergy/{patientAllergyUuid}',
            path: {
                'intakeUuid': intakeUuid,
                'patientAllergyUuid': patientAllergyUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeUuid
     * @param patientAllergyUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeAllergiesForPatient(
        intakeUuid: string,
        patientAllergyUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/allergy/intake/{intakeUuid}/allergy/{patientAllergyUuid}',
            path: {
                'intakeUuid': intakeUuid,
                'patientAllergyUuid': patientAllergyUuid,
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
    public static addPatientIntakeAllergies(
        patientUuid: string,
        intakeFormUuid: string,
        requestBody: IntakeAllergy,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/allergy/patient/{patientUuid}/intake/{intakeFormUuid}/allergy',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getIntakeAllergiesForPatient(
        intakeUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/intake/{intakeUuid}/allergy',
            path: {
                'intakeUuid': intakeUuid,
            },
        });
    }

    /**
     * @param intakeUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientIntakeAllergies1(
        intakeUuid: string,
        requestBody: IntakeAllergy,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/allergy/intake/{intakeUuid}/allergy',
            path: {
                'intakeUuid': intakeUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientAllergyUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewAllergy(
        patientAllergyUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/{patientAllergyUuid}',
            path: {
                'patientAllergyUuid': patientAllergyUuid,
            },
        });
    }

    /**
     * @param patientAllergyUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientAllergies(
        patientAllergyUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/allergy/{patientAllergyUuid}',
            path: {
                'patientAllergyUuid': patientAllergyUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeUuid
     * @param intakeAllergyUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeAllergiesForProvider(
        patientUuid: string,
        intakeUuid: string,
        intakeAllergyUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/patient/{patientUuid}/intake/{intakeUuid}/allergy/{intakeAllergyUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeUuid': intakeUuid,
                'intakeAllergyUuid': intakeAllergyUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeAllergyUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeAllergies(
        patientUuid: string,
        intakeAllergyUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/patient/{patientUuid}/intake/{intakeAllergyUuid}/allergy',
            path: {
                'patientUuid': patientUuid,
                'intakeAllergyUuid': intakeAllergyUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param page
     * @param size
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientAllergies(
        patientUuid: string,
        page: number,
        size: number,
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/patient/{patientUuid}/allergy',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'status': status,
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeAllergiesForPatient(
        intakeFormUuid: string,
        intakeUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/intake/{intakeFormUuid}/allergy/{intakeUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeUuid': intakeUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param exportType
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param searchString
     * @param severity
     * @returns any OK
     * @throws ApiError
     */
    public static downloadAllergiesClinicalReport(
        providerGroupUuid: string,
        exportType: 'CSV' | 'PDF',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
        searchString?: string,
        severity?: 'MILD' | 'HIGH' | 'MODERATE',
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/download/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'searchString': searchString,
                'severity': severity,
                'exportType': exportType,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param searchString
     * @param severity
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllergiesClinicalReport(
        providerGroupUuid: string,
        searchString?: string,
        severity?: 'MILD' | 'HIGH' | 'MODERATE',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/allergy/clinical-report',
            query: {
                'providerGroupUuid': providerGroupUuid,
                'searchString': searchString,
                'severity': severity,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

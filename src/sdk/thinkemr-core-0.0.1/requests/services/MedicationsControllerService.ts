/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakeMedication } from '../models/IntakeMedication';
import type { Pageable } from '../models/Pageable';
import type { PatientMedication } from '../models/PatientMedication';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MedicationsControllerService {

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeMedication(
        patientUuid: string,
        intakeFormUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeFormUuid}/medication/{intakeMedicationUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeMedicationUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeMedication(
        patientUuid: string,
        intakeFormUuid: string,
        intakeMedicationUuid: string,
        requestBody: IntakeMedication,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeFormUuid}/medication/{intakeMedicationUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeMedication(
        patientUuid: string,
        intakeFormUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeFormUuid}/medication/{intakeMedicationUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientMedication(
        requestBody: PatientMedication,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/medications/patient/medication',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientMedication(
        requestBody: PatientMedication,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/medications/patient/medication',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeMedicationForPatient(
        intakeFormUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/intake/{intakeFormUuid}/medication/{intakeMedicationUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeMedicationUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeMedicationForPatient(
        intakeFormUuid: string,
        intakeMedicationUuid: string,
        requestBody: IntakeMedication,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/medications/intake/{intakeFormUuid}/medication/{intakeMedicationUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeMedicationForPatient(
        intakeFormUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/medications/intake/{intakeFormUuid}/medication/{intakeMedicationUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
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
    public static addPatientIntakeMedication(
        patientUuid: string,
        intakeFormUuid: string,
        requestBody: IntakeMedication,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeFormUuid}/medication',
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
    public static addPatientIntakeMedicationForPatient(
        intakeFormUuid: string,
        requestBody: IntakeMedication,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/medications/intake/{intakeFormUuid}/medication',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerUuid
     * @param searchString
     * @param startInstant
     * @param endInstant
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getMedicationReport(
        providerUuid?: string,
        searchString?: string,
        startInstant?: string,
        endInstant?: string,
        page?: number,
        size: number = 10,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/search',
            query: {
                'providerUuid': providerUuid,
                'searchString': searchString,
                'startInstant': startInstant,
                'endInstant': endInstant,
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param patientUuid
     * @param pageable
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientMedications(
        patientUuid: string,
        pageable: Pageable,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/medication',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'pageable': pageable,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientPastMedication(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/medication/past',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientCurrentMedication(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/medication/current',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeMedications(
        patientUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeMedicationUuid}/medication',
            path: {
                'patientUuid': patientUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientPastIntakeMedication(
        patientUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeMedicationUuid}/medication/past',
            path: {
                'patientUuid': patientUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientCurrentIntakeMedication(
        patientUuid: string,
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/{patientUuid}/intake/{intakeMedicationUuid}/medication/current',
            path: {
                'patientUuid': patientUuid,
                'intakeMedicationUuid': intakeMedicationUuid,
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
    public static getPatientPastMedications(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/past/{patientUuid}',
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
     * @param patientMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientMedication(
        patientMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/medication/{patientMedicationUuid}',
            path: {
                'patientMedicationUuid': patientMedicationUuid,
            },
        });
    }

    /**
     * @param patientMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientMedication(
        patientMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/medications/patient/medication/{patientMedicationUuid}',
            path: {
                'patientMedicationUuid': patientMedicationUuid,
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
    public static getPatientCurrentMedications(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/patient/current/{patientUuid}',
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
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeMedicationsForPatient(
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/intake/{intakeMedicationUuid}/medication',
            path: {
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientPastIntakeMedicationForPatient(
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/intake/{intakeMedicationUuid}/medication/past',
            path: {
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param intakeMedicationUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientCurrentIntakeMedicationForPatient(
        intakeMedicationUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/intake/{intakeMedicationUuid}/medication/current',
            path: {
                'intakeMedicationUuid': intakeMedicationUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param exportType
     * @param searchString
     * @param startInstant
     * @param endInstant
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns any OK
     * @throws ApiError
     */
    public static downloadPatientMedicationsClinicalReport(
        providerGroupUuid: string,
        exportType: 'CSV' | 'PDF',
        searchString?: string,
        startInstant?: string,
        endInstant?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/download/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'searchString': searchString,
                'startInstant': startInstant,
                'endInstant': endInstant,
                'page': page,
                'size': size,
                'sort': sort,
                'exportType': exportType,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param searchString
     * @param startInstant
     * @param endInstant
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientMedicationsReport(
        providerGroupUuid: string,
        searchString?: string,
        startInstant?: string,
        endInstant?: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/medications/clinical-report',
            query: {
                'providerGroupUuid': providerGroupUuid,
                'searchString': searchString,
                'startInstant': startInstant,
                'endInstant': endInstant,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

}

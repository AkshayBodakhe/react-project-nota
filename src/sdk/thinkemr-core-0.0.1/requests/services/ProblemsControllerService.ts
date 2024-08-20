/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntakeProblem } from '../models/IntakeProblem';
import type { PatientProblem } from '../models/PatientProblem';
import type { Problem } from '../models/Problem';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProblemsControllerService {

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewProblemsCatalog(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/problem/{uuid}',
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
    public static editProblemsCatalog(
        uuid: string,
        requestBody: Problem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/problems/problem/{uuid}',
            path: {
                'uuid': uuid,
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
    public static archiveProblemsCatalog(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/problems/problem/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientProblem(
        requestBody: PatientProblem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/problems/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientProblems(
        requestBody: PatientProblem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/problems/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeProblemsForProvider(
        patientUuid: string,
        intakeFormUuid: string,
        requestBody: IntakeProblem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/problems/patient/{patientUuid}/intake/{intakeFormUuid}/problem',
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
     * @param intakeProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeProblemsForPatients(
        intakeFormUuid: string,
        intakeProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/intake/{intakeFormUuid}/problem/{intakeProblemUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeProblemUuid': intakeProblemUuid,
            },
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeProblemUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientIntakeProblemsForPatient(
        intakeFormUuid: string,
        intakeProblemUuid: string,
        requestBody: IntakeProblem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/problems/intake/{intakeFormUuid}/problem/{intakeProblemUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeProblemUuid': intakeProblemUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeFormUuid
     * @param intakeProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeProblemsForPatients(
        intakeFormUuid: string,
        intakeProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/problems/intake/{intakeFormUuid}/problem/{intakeProblemUuid}',
            path: {
                'intakeFormUuid': intakeFormUuid,
                'intakeProblemUuid': intakeProblemUuid,
            },
        });
    }

    /**
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllProblemsCatalog(
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/problem',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addProblemsCatalog(
        requestBody: Problem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/problems/problem',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @param intakeFormUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatientIntakeProblems(
        uuid: string,
        intakeFormUuid: string,
        requestBody: IntakeProblem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/problems/patient/{uuid}/intake/{intakeFormUuid}/problem',
            path: {
                'uuid': uuid,
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
    public static addPatientIntakeProblemsForPatient(
        intakeFormUuid: string,
        requestBody: IntakeProblem,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/problems/intake/{intakeFormUuid}/problem',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    public static getPatientProblems(
        patientUuid: string,
        page: number,
        size: number,
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/patient/{patientUuid}/problem',
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
     * @param patientUuid
     * @param intakeProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeProblems(
        patientUuid: string,
        intakeProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/patient/{patientUuid}/intake/{intakeProblemUuid}/problem',
            path: {
                'patientUuid': patientUuid,
                'intakeProblemUuid': intakeProblemUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientIntakeProblems(
        patientUuid: string,
        intakeFormUuid: string,
        intakeProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/patient/{patientUuid}/intake/{intakeFormUuid}/problem/{intakeProblemUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeProblemUuid': intakeProblemUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param intakeFormUuid
     * @param intakeProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientIntakeProblemsForProvider(
        patientUuid: string,
        intakeFormUuid: string,
        intakeProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/problems/patient/{patientUuid}/intake/{intakeFormUuid}/problem/{intakeProblemUuid}',
            path: {
                'patientUuid': patientUuid,
                'intakeFormUuid': intakeFormUuid,
                'intakeProblemUuid': intakeProblemUuid,
            },
        });
    }

    /**
     * @param patientProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientProblems(
        patientProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/patient/{patientProblemUuid}',
            path: {
                'patientProblemUuid': patientProblemUuid,
            },
        });
    }

    /**
     * @param patientProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientProblems(
        patientProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/problems/patient/{patientProblemUuid}',
            path: {
                'patientProblemUuid': patientProblemUuid,
            },
        });
    }

    /**
     * @param intakeProblemUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientIntakeProblemsForPatients(
        intakeProblemUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/problems/intake/{intakeProblemUuid}/problem',
            path: {
                'intakeProblemUuid': intakeProblemUuid,
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
    public static downloadPatientProblemsClinicalReport(
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
            url: '/api/master/problems/download/{providerGroupUuid}',
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
    public static getPatientProblemsReports(
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
            url: '/api/master/problems/clinical-report',
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

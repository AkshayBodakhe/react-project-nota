/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Patient } from '../models/Patient';
import type { PatientClinicalRequest } from '../models/PatientClinicalRequest';
import type { PaymentCard } from '../models/PaymentCard';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatient(
        requestBody: Patient,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addPatient(
        requestBody: Patient,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static activatePatient(
        patientUuid: string,
        status: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/{patientUuid}/active/{status}',
            path: {
                'patientUuid': patientUuid,
                'status': status,
            },
        });
    }

    /**
     * @param customerId
     * @param cardId
     * @returns Response OK
     * @throws ApiError
     */
    public static removeCard(
        customerId: string,
        cardId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/remove-card',
            query: {
                'customerId': customerId,
                'cardId': cardId,
            },
        });
    }

    /**
     * @param patientUuid
     * @param active
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientAccess(
        patientUuid: string,
        active: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/access/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
            query: {
                'active': active,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static acceptTermsAndConditions(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/patient/accept-terms-conditions',
        });
    }

    /**
     * @param patientUuid
     * @param emailId
     * @returns Response OK
     * @throws ApiError
     */
    public static sharePatientDetails(
        patientUuid: string,
        emailId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/share/{patientUuid}/{emailId}',
            path: {
                'patientUuid': patientUuid,
                'emailId': emailId,
            },
        });
    }

    /**
     * @param requestBody
     * @param page
     * @param size
     * @param sortBy
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientsClinicalReport(
        requestBody: PatientClinicalRequest,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/clinical-report',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param exportType
     * @param requestBody
     * @param page
     * @param size
     * @param sortBy
     * @returns any OK
     * @throws ApiError
     */
    public static downloadPatientClinicalReport(
        exportType: 'CSV' | 'PDF',
        requestBody: PatientClinicalRequest,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/clinical-report/download',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'exportType': exportType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addCard(
        patientUuid: string,
        requestBody: PaymentCard,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient/add-card',
            query: {
                'patientUuid': patientUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/{patientUuid}',
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
    public static archivePatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param dateOfService
     * @param ageFrom
     * @param ageTo
     * @param gender
     * @param preferredLanguage
     * @param demographicsRecorded
     * @param patientName
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static searchPatients(
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        dateOfService?: string,
        ageFrom?: number,
        ageTo?: number,
        gender?: string,
        preferredLanguage?: string,
        demographicsRecorded?: string,
        patientName?: string,
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/reports/search',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'dateOfService': dateOfService,
                'ageFrom': ageFrom,
                'ageTo': ageTo,
                'gender': gender,
                'preferredLanguage': preferredLanguage,
                'demographicsRecorded': demographicsRecorded,
                'patientName': patientName,
                'status': status,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param status
     * @param sourceId
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatients(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        status?: boolean,
        sourceId?: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/provider-group/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'status': status,
                'sourceId': sourceId,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static printPatientList(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/print',
        });
    }

    /**
     * @param patientUuid
     * @returns string OK
     * @throws ApiError
     */
    public static printPatientDetails(
        patientUuid: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/print/{patientUuid}',
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
    public static getCards(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/payment-card/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param providerGroupUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getTimelineForPatient(
        patientUuid: string,
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/patient/timeline/{providerGroupUuid}/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param locationUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static viewLocationPatient(
        locationUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/location/{locationUuid}/patient',
            path: {
                'locationUuid': locationUuid,
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
     * @param providerGroupUuid
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupUuidPatients(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/list/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'status': status,
            },
        });
    }

    /**
     * @param exportType
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param dateOfService
     * @param ageFrom
     * @param ageTo
     * @param gender
     * @param preferredLanguage
     * @param demographicsRecorded
     * @param patientName
     * @param status
     * @returns any OK
     * @throws ApiError
     */
    public static exportPatientReport(
        exportType: 'CSV' | 'PDF',
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        dateOfService?: string,
        ageFrom?: number,
        ageTo?: number,
        gender?: string,
        preferredLanguage?: string,
        demographicsRecorded?: string,
        patientName?: string,
        status?: boolean,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/export-report',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'dateOfService': dateOfService,
                'ageFrom': ageFrom,
                'ageTo': ageTo,
                'gender': gender,
                'preferredLanguage': preferredLanguage,
                'demographicsRecorded': demographicsRecorded,
                'patientName': patientName,
                'status': status,
                'exportType': exportType,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param exportType
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param status
     * @param sourceId
     * @returns any OK
     * @throws ApiError
     */
    public static downloadPatientList(
        providerGroupUuid: string,
        exportType: 'CSV' | 'PDF',
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        status?: boolean,
        sourceId?: number,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/download/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'status': status,
                'sourceId': sourceId,
                'exportType': exportType,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getDefaultConsentForm(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/default-consent-form',
        });
    }

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderPatientCount(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/count',
            query: {
                'providerUuid': providerUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupPatientCount(
        providerGroupUuid: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient/count/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }

}

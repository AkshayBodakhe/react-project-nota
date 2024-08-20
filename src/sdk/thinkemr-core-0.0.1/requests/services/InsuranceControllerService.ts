/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Insurance } from '../models/Insurance';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InsuranceControllerService {

    /**
     * @param insuranceUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateInsuranceForPatient(
        insuranceUuid: string,
        requestBody: Insurance,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance/{insuranceUuid}',
            path: {
                'insuranceUuid': insuranceUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param insuranceUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientInsuranceForPatient(
        insuranceUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/insurance/{insuranceUuid}',
            path: {
                'insuranceUuid': insuranceUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static setPrimaryInsuranceForPatient(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance/set-primary/{patientUuid}',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param insuranceUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static setPrimaryInsurancePatient(
        patientUuid: string,
        insuranceUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance/set-primary/patient/{patientUuid}/insurance/{insuranceUuid}',
            path: {
                'patientUuid': patientUuid,
                'insuranceUuid': insuranceUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param insuranceUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientInsurance(
        patientUuid: string,
        insuranceUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance/patient/{patientUuid}/insurance/{insuranceUuid}',
            path: {
                'patientUuid': patientUuid,
                'insuranceUuid': insuranceUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param insuranceUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updatePatientInsurance(
        patientUuid: string,
        insuranceUuid: string,
        requestBody: Insurance,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/insurance/patient/{patientUuid}/insurance/{insuranceUuid}',
            path: {
                'patientUuid': patientUuid,
                'insuranceUuid': insuranceUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param insuranceUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archivePatientInsurance(
        patientUuid: string,
        insuranceUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/insurance/patient/{patientUuid}/insurance/{insuranceUuid}',
            path: {
                'patientUuid': patientUuid,
                'insuranceUuid': insuranceUuid,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static viewPatientInsuranceForPatient(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addInsuranceForPatient(
        requestBody: Insurance,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/insurance',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientInsurance(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance/patient/{patientUuid}/insurance',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addInsurance(
        patientUuid: string,
        requestBody: Insurance,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/insurance/patient/{patientUuid}/insurance',
            path: {
                'patientUuid': patientUuid,
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
    public static getInsurancePayer(
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance/payers',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllLicensedStates(
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/insurance/all/licensed-states',
            query: {
                'page': page,
                'size': size,
            },
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EducationLevel } from '../models/EducationLevel';
import type { IntakePatientSocialHistory } from '../models/IntakePatientSocialHistory';
import type { PatientSocialHistory } from '../models/PatientSocialHistory';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SocialHistoryControllerService {

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getSocialHistory(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/social-history/patient/patient/{patientUuid}/social-history',
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
    public static addSocialHistory(
        patientUuid: string,
        requestBody: PatientSocialHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/social-history/patient/patient/{patientUuid}/social-history',
            path: {
                'patientUuid': patientUuid,
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
    public static addEducationalLevel(
        requestBody: EducationLevel,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/social-history/patient/patient/educational-level',
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
    public static addIntakeSocialHistory(
        intakeFormUuid: string,
        requestBody: IntakePatientSocialHistory,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/social-history/patient/intake/{intakeFormUuid}/social-history',
            path: {
                'intakeFormUuid': intakeFormUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param intakeSocialHistoryUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getIntakeSocialHistory(
        intakeSocialHistoryUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/social-history/patient/intake/{intakeSocialHistoryUuid}/social-history',
            path: {
                'intakeSocialHistoryUuid': intakeSocialHistoryUuid,
            },
        });
    }

}

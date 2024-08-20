/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IntakeFormTemplateControllerService {

    /**
     * @param intakeFormTemplateId
     * @returns Response OK
     * @throws ApiError
     */
    public static viewIntakeFormTemplate(
        intakeFormTemplateId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/intake-form/template/{intakeFormTemplateId}',
            path: {
                'intakeFormTemplateId': intakeFormTemplateId,
            },
        });
    }

    /**
     * @param intakeFormTemplateId
     * @returns Response OK
     * @throws ApiError
     */
    public static updateIntakeFormTemplate(
        intakeFormTemplateId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/intake-form/template/{intakeFormTemplateId}',
            path: {
                'intakeFormTemplateId': intakeFormTemplateId,
            },
        });
    }

    /**
     * @param intakeFormTemplateId
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveIntakeFormTemplate(
        intakeFormTemplateId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/intake-form/template/{intakeFormTemplateId}',
            path: {
                'intakeFormTemplateId': intakeFormTemplateId,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllIntakeFormTemplates(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/intake-form/template',
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static addIntakeFormTemplate(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/intake-form/template',
        });
    }

}

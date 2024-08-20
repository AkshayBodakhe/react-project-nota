/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ForgotPasswordEmailRequest } from '../models/ForgotPasswordEmailRequest';
import type { Response } from '../models/Response';
import type { SetPasswordEmailRequest } from '../models/SetPasswordEmailRequest';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EmailControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendEmailForSetPassword1(
        requestBody: SetPasswordEmailRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification/email/set-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendOtpForPassword(
        requestBody: User,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification/email/otp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendInvitationEmail(
        requestBody: User,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification/email/invite',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendEmailForForgotPassword(
        requestBody: ForgotPasswordEmailRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/notification/email/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param otp
     * @param email
     * @returns Response OK
     * @throws ApiError
     */
    public static verifyEmail(
        otp: number,
        email: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/verify',
            query: {
                'otp': otp,
                'email': email,
            },
        });
    }

    /**
     * @param otpId
     * @param otp
     * @returns Response OK
     * @throws ApiError
     */
    public static verifyOtpForPassword(
        otpId: string,
        otp: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/verify-otp',
            query: {
                'otpId': otpId,
                'otp': otp,
            },
        });
    }

    /**
     * @param otpId
     * @returns Response OK
     * @throws ApiError
     */
    public static verifyOtpId(
        otpId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/verify-otp-id',
            query: {
                'otpId': otpId,
            },
        });
    }

    /**
     * @param linkId
     * @param userId
     * @returns Response OK
     * @throws ApiError
     */
    public static verifyLinkForPassword1(
        linkId: string,
        userId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/verify-link',
            query: {
                'linkId': linkId,
                'userId': userId,
            },
        });
    }

    /**
     * @param email
     * @returns Response OK
     * @throws ApiError
     */
    public static recipientEmail(
        email: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/send-recipient',
            query: {
                'email': email,
            },
        });
    }

    /**
     * @param email
     * @returns Response OK
     * @throws ApiError
     */
    public static inviteeEmail(
        email: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/send-invitee',
            query: {
                'email': email,
            },
        });
    }

    /**
     * @param linkId
     * @returns Response OK
     * @throws ApiError
     */
    public static expireLinkForPassword(
        linkId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/notification/email/expire-link',
            query: {
                'linkId': linkId,
            },
        });
    }

}

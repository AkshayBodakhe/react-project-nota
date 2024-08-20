/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthRequest } from '../models/AuthRequest';
import type { LogoutRequest } from '../models/LogoutRequest';
import type { PasswordChangeRequest } from '../models/PasswordChangeRequest';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import type { Response } from '../models/Response';
import type { SendEmailForgotPasswordRequest } from '../models/SendEmailForgotPasswordRequest';
import type { SetPasswordEmailRequest } from '../models/SetPasswordEmailRequest';
import type { SetPasswordRequest } from '../models/SetPasswordRequest';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateUser(
        requestBody: User,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addUser(
        requestBody: User,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param email
     * @param active
     * @returns Response OK
     * @throws ApiError
     */
    public static activateUser(
        email: string,
        active: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/user/{email}/active/{active}',
            path: {
                'email': email,
                'active': active,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static setPassword(
        requestBody: SetPasswordRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/set-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static resetPassword(
        requestBody: ResetPasswordRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendEmailForSetPassword(
        requestBody: SetPasswordEmailRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/resend-link',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static getRefreshToken(
        requestBody: RefreshTokenRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static userLogout(
        requestBody: LogoutRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static getAccessToken(
        requestBody: AuthRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param locationId
     * @param userId
     * @returns Response OK
     * @throws ApiError
     */
    public static addLocationUser(
        locationId: string,
        userId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/location/{locationId}/{userId}',
            path: {
                'locationId': locationId,
                'userId': userId,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendEmailForForgotPassword1(
        requestBody: SendEmailForgotPasswordRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static sendInvite(
        requestBody: SetPasswordEmailRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/forgot-password/resend',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param email
     * @param otp
     * @returns Response OK
     * @throws ApiError
     */
    public static verifyOtpForForgotPassword(
        email: string,
        otp: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/forgot-password-otp/verify/{email}',
            path: {
                'email': email,
            },
            query: {
                'otp': otp,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static changePassword(
        requestBody: PasswordChangeRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addUser1(
        requestBody: User,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/auth/patient',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getUserById1(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/user/{uuid}',
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
    public static changeAvatar(
        uuid: string,
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/master/user/{uuid}',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param linkId
     * @param userId
     * @returns Response OK
     * @throws ApiError
     */
    public static verifyLinkForPassword(
        linkId: string,
        userId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/verify-link',
            query: {
                'linkId': linkId,
                'userId': userId,
            },
        });
    }

    /**
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param providerGroupUuid
     * @param searchString
     * @returns Response OK
     * @throws ApiError
     */
    public static getUsers(
        page?: number,
        size: number = 20,
        sort?: Array<string>,
        providerGroupUuid?: string,
        searchString?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/users',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'providerGroupUuid': providerGroupUuid,
                'searchString': searchString,
            },
        });
    }

    /**
     * @param page
     * @param size
     * @param providerGroupUuid
     * @param sortBy
     * @param sortDirection
     * @param searchString
     * @param status
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllSearchUsers(
        page?: number,
        size: number = 20,
        providerGroupUuid?: string,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
        searchString?: string,
        status?: boolean,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/users/search',
            query: {
                'page': page,
                'size': size,
                'providerGroupUuid': providerGroupUuid,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
                'searchString': searchString,
                'status': status,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param searchString
     * @returns Response OK
     * @throws ApiError
     */
    public static getActiveAndCurrentUsers(
        providerGroupUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
        searchString?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/users/current-active/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'searchString': searchString,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getUsersProfileDetails(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/user/profile/details',
        });
    }

    /**
     * @param locationId
     * @param userName
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static searchLocationUser(
        locationId: string,
        userName?: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/search/location/{locationId}',
            path: {
                'locationId': locationId,
            },
            query: {
                'userName': userName,
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getProfile(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/profile',
        });
    }

    /**
     * @param locationId
     * @param page
     * @param size
     * @returns Response OK
     * @throws ApiError
     */
    public static getLocationUser(
        locationId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/location/{locationId}/user',
            path: {
                'locationId': locationId,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getUserById(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/auth/user/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

}

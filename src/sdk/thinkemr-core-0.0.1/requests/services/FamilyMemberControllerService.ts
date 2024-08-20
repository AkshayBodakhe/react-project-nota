/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FamilyMember } from '../models/FamilyMember';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FamilyMemberControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateFamilyMember(
        requestBody: FamilyMember,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/family-member',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addFamilyMemberPatient(
        requestBody: FamilyMember,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/family-member',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param familyMemberId
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllFamilyMembersForPatient(
        familyMemberId: string,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/family-member/{familyMemberId}',
            path: {
                'familyMemberId': familyMemberId,
            },
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDirection': sortDirection,
            },
        });
    }

}

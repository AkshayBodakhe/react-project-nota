/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PermissionControllerService {

    /**
     * @param accessCategory
     * @param page
     * @param size
     * @param sortBy
     * @param sortDirection
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllPermissions(
        accessCategory: 'ADMIN' | 'CARE_PROVIDER' | 'GLOBAL_PROVIDER' | 'PROVIDER' | 'BOTH',
        page?: number,
        size: number = 20,
        sortBy: string = 'id',
        sortDirection: string = 'desc',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/permissions/all/{accessCategory}',
            path: {
                'accessCategory': accessCategory,
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

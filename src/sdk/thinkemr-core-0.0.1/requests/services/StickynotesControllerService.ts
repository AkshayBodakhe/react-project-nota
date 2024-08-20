/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';
import type { StickyNotes } from '../models/StickyNotes';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StickynotesControllerService {

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createStickyNote(
        requestBody: StickyNotes,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/stickynotes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param stickyNoteUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getStickyNote(
        stickyNoteUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/stickynotes/{stickyNoteUuid}',
            path: {
                'stickyNoteUuid': stickyNoteUuid,
            },
        });
    }

    /**
     * @param stickyNoteUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteByUuid(
        stickyNoteUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/stickynotes/{stickyNoteUuid}',
            path: {
                'stickyNoteUuid': stickyNoteUuid,
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
    public static getAllStickyNote(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/stickynotes/all/{patientUuid}',
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

}

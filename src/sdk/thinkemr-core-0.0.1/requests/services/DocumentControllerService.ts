/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DocumentControllerService {

    /**
     * @param patientId
     * @param documentFolder
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getDocument(
        patientId: string,
        documentFolder: 'CONSENTS_RELEASING_INFORMATION' | 'LIMITS_OF_CONFIDENTIALITY_POLICY' | 'STATEMENT_FOR_CASE_MANAGEMENT' | 'STATEMENT_FOR_CLIENTS_RIGHTS_AND_RESPONSIBILITIES' | 'GRIEVANCE_PRODUCERS_POLICY' | 'ENROLEMENT_FORM' | 'HEALTH_INSURANCE' | 'HARDCOPY_PRESCRIPTION' | 'SUMMARY_OF_MEDICAL_VISITS',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/document',
            query: {
                'patientId': patientId,
                'documentFolder': documentFolder,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param patientId
     * @param documentFolder
     * @param title
     * @param documentType
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static uploadDocument1(
        patientId: string,
        documentFolder: 'CONSENTS_RELEASING_INFORMATION' | 'LIMITS_OF_CONFIDENTIALITY_POLICY' | 'STATEMENT_FOR_CASE_MANAGEMENT' | 'STATEMENT_FOR_CLIENTS_RIGHTS_AND_RESPONSIBILITIES' | 'GRIEVANCE_PRODUCERS_POLICY' | 'ENROLEMENT_FORM' | 'HEALTH_INSURANCE' | 'HARDCOPY_PRESCRIPTION' | 'SUMMARY_OF_MEDICAL_VISITS',
        title: string,
        documentType: 'PDF' | 'MS_WORD' | 'ZIP' | 'X_GZIP' | 'X_COMPRESSED' | 'DOCX' | 'RTF' | 'PLAIN' | 'JPEG_IMAGE' | 'PNG_IMAGE' | 'GIF_IMAGE' | 'BMP_IMAGE' | 'WEBP_IMAGE' | 'SVG_IMAGE' | 'MPEG_AUDIO' | 'OTHER' | 'CSV',
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/document',
            query: {
                'patientId': patientId,
                'documentFolder': documentFolder,
                'title': title,
                'documentType': documentType,
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
    public static deleteDocument(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/document/delete/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

}

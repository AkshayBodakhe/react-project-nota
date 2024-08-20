/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PatientDocumentControllerService {

    /**
     * @param patientId
     * @param documentName
     * @param documentTypes
     * @param recordedDate
     * @param documentType
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static uploadDocument(
        patientId: string,
        documentName: string,
        documentTypes: string,
        recordedDate: string,
        documentType: 'PDF' | 'MS_WORD' | 'ZIP' | 'X_GZIP' | 'X_COMPRESSED' | 'DOCX' | 'RTF' | 'PLAIN' | 'JPEG_IMAGE' | 'PNG_IMAGE' | 'GIF_IMAGE' | 'BMP_IMAGE' | 'WEBP_IMAGE' | 'SVG_IMAGE' | 'MPEG_AUDIO' | 'OTHER' | 'CSV',
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/patient-document/patient',
            query: {
                'patientId': patientId,
                'documentName': documentName,
                'documentTypes': documentTypes,
                'recordedDate': recordedDate,
                'documentType': documentType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param documentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getDocumentOfPatient(
        documentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-document/{documentUuid}',
            path: {
                'documentUuid': documentUuid,
            },
        });
    }

    /**
     * @param documentUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveDocument(
        documentUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/patient-document/{documentUuid}',
            path: {
                'documentUuid': documentUuid,
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
    public static getAllDocumentsOfPatient(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/patient-document/patient/{patientUuid}',
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

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloneEncounterRequest } from '../models/CloneEncounterRequest';
import type { Encounter } from '../models/Encounter';
import type { EncounterDetailsRequest } from '../models/EncounterDetailsRequest';
import type { EncounterRequest } from '../models/EncounterRequest';
import type { EncounterUpdateRequest } from '../models/EncounterUpdateRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EncounterControllerService {

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientEncounter(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static editEncounter(
        requestBody: EncounterUpdateRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/encounter',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static createEncounter(
        requestBody: EncounterRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewEncounterDetailsForProvider(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/patient/{patientUuid}/encounter/{encounterUuid}',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateEncounter(
        patientUuid: string,
        encounterUuid: string,
        requestBody: Encounter,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/encounter/patient/{patientUuid}/encounter/{encounterUuid}',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static archiveEncounter(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/encounter/patient/{patientUuid}/encounter/{encounterUuid}',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static signEncounter(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/encounter/patient/{patientUuid}/encounter/{encounterUuid}/sign',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static checkoutEncounter(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/encounter/patient/{patientUuid}/encounter/{encounterUuid}/checkout',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static clearClonedEncounter(
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/encounter/clear/{encounterUuid}',
            path: {
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param encounterUuid
     * @param emailId
     * @returns Response OK
     * @throws ApiError
     */
    public static shareEncounterDetails(
        encounterUuid: string,
        emailId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter/share/encounter/{encounterUuid}/{emailId}',
            path: {
                'encounterUuid': encounterUuid,
                'emailId': emailId,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientEncounterForProvider(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/patient/{patientUuid}/encounter',
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
    public static startEncounter(
        patientUuid: string,
        requestBody: Encounter,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter/patient/{patientUuid}/encounter',
            path: {
                'patientUuid': patientUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param encounterUuid
     * @param documentName
     * @param file
     * @param documentType
     * @returns Response OK
     * @throws ApiError
     */
    public static uploadDocuments(
        encounterUuid: string,
        documentName: Array<string>,
        file: Array<Blob>,
        documentType: Array<'PDF' | 'MS_WORD' | 'ZIP' | 'X_GZIP' | 'X_COMPRESSED' | 'DOCX' | 'RTF' | 'PLAIN' | 'JPEG_IMAGE' | 'PNG_IMAGE' | 'GIF_IMAGE' | 'BMP_IMAGE' | 'WEBP_IMAGE' | 'SVG_IMAGE' | 'MPEG_AUDIO' | 'OTHER' | 'CSV'>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter/document',
            query: {
                'encounterUuid': encounterUuid,
                'documentName': documentName,
                'file': file,
                'documentType': documentType,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static addEncounterDetails(
        requestBody: EncounterDetailsRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter/details',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static cloneEncounter(
        requestBody: CloneEncounterRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/encounter/clone',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static viewEncounterDetailsForPatient(
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/{encounterUuid}',
            path: {
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getVisitCountByProviderGroup(
        providerGroupUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/visits/count/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
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
    public static getVisitHistory(
        patientUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/visit-history/{patientUuid}',
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

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderEncounterCount(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/provider/count',
            query: {
                'providerUuid': providerUuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param search
     * @param startDate
     * @param endDate
     * @param providerUuid
     * @param encounterStatus
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllEncounterByProvider(
        providerGroupUuid: string,
        search?: string,
        startDate?: string,
        endDate?: string,
        providerUuid?: string,
        encounterStatus?: 'CHECK_IN' | 'DRAFT' | 'SIGNED' | 'UNSIGNED',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/provider/all/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'search': search,
                'startDate': startDate,
                'endDate': endDate,
                'providerUuid': providerUuid,
                'encounterStatus': encounterStatus,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupEncounterCount(
        providerGroupUuid: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/provider-group/count/{providerGroupUuid}',
            path: {
                'providerGroupUuid': providerGroupUuid,
            },
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }

    /**
     * @param encounterUuid
     * @returns string OK
     * @throws ApiError
     */
    public static printEncounterDetails(
        encounterUuid: string,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/print/{encounterUuid}',
            path: {
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientsReadyForBillingEncounters(
        patientUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/patient/{patientUuid}/ready-for-billing-encounter',
            path: {
                'patientUuid': patientUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getEncounterSummaryPreview(
        patientUuid: string,
        encounterUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/patient/{patientUuid}/encounter/{encounterUuid}/summary',
            path: {
                'patientUuid': patientUuid,
                'encounterUuid': encounterUuid,
            },
        });
    }

    /**
     * @param patientUuid
     * @param encounterStatus
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllPatientEncounter(
        patientUuid: string,
        encounterStatus?: 'CHECK_IN' | 'DRAFT' | 'SIGNED' | 'UNSIGNED',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/patient/all',
            query: {
                'patientUuid': patientUuid,
                'encounterStatus': encounterStatus,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getEncounterDetails(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/details/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

    /**
     * @param providerGroupUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getAllEncounterCount(
        providerGroupUuid?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/count',
            query: {
                'providerGroupUuid': providerGroupUuid,
            },
        });
    }

    /**
     * @param appointmentId
     * @returns Response OK
     * @throws ApiError
     */
    public static getEncounterDetailsByAppointment(
        appointmentId: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/encounter/appointment/{appointmentId}',
            path: {
                'appointmentId': appointmentId,
            },
        });
    }

    /**
     * @param uuid
     * @returns Response OK
     * @throws ApiError
     */
    public static deleteEncounter(
        uuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/encounter/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }

}

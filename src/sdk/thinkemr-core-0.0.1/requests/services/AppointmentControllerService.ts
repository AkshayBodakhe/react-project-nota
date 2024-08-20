/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppointmentCalenderViewRequest } from '../models/AppointmentCalenderViewRequest';
import type { AppointmentClinicalRequest } from '../models/AppointmentClinicalRequest';
import type { AppointmentColorConfiguration } from '../models/AppointmentColorConfiguration';
import type { AppointmentListRequest } from '../models/AppointmentListRequest';
import type { BookAppointmentRequest } from '../models/BookAppointmentRequest';
import type { BookPatientAppointmentRequest } from '../models/BookPatientAppointmentRequest';
import type { CancelAppointmentRequest } from '../models/CancelAppointmentRequest';
import type { FetchSlotsRequest } from '../models/FetchSlotsRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AppointmentControllerService {

    /**
     * @param appointmentUuid
     * @param appointmentStatus
     * @returns Response OK
     * @throws ApiError
     */
    public static updateAppointmentStatus(
        appointmentUuid: string,
        appointmentStatus: 'COMPLETED' | 'CHECKED_IN' | 'WAITING_ROOM' | 'IN_EXAM_ROOM' | 'SCHEDULED' | 'NOT_CONFIRMED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW' | 'PENDING' | 'ENCOUNTERED' | 'RE_SCHEDULED' | 'SEEN' | 'SINGED_OFF' | 'REQUESTED' | 'DECLINE',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/appointment/status/{appointmentUuid}/{appointmentStatus}',
            path: {
                'appointmentUuid': appointmentUuid,
                'appointmentStatus': appointmentStatus,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static rescheduleAppointment(
        id: number,
        requestBody: BookAppointmentRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/appointment/reschedule/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static reschedulePatientAppointment(
        id: number,
        requestBody: BookPatientAppointmentRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/appointment/patient-reschedule/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentColorConfigurations(): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/color-configuration',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static updateAppointmentColorConfiguration(
        requestBody: AppointmentColorConfiguration,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/master/appointment/color-configuration',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static bookPatientAppointment(
        requestBody: BookPatientAppointmentRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/patient-book',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentList(
        requestBody: AppointmentListRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/list',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static getSlotsFromConfiguration(
        requestBody: FetchSlotsRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/fetch/slots',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @param page
     * @param size
     * @param sortBy
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentClinicalReport(
        requestBody: AppointmentClinicalRequest,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/clinical-report',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param exportType
     * @param requestBody
     * @param page
     * @param size
     * @param sortBy
     * @returns any OK
     * @throws ApiError
     */
    public static downloadAppointmentClinicalReport(
        exportType: 'CSV' | 'PDF',
        requestBody: AppointmentClinicalRequest,
        page?: number,
        size: number = 20,
        sortBy: string = 'created',
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/clinical-report/download',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'exportType': exportType,
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
    public static cancelAppointment(
        requestBody: CancelAppointmentRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/cancel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentListForCalender(
        requestBody: AppointmentCalenderViewRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/calender/all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Response OK
     * @throws ApiError
     */
    public static bookAppointment(
        requestBody: BookAppointmentRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/master/appointment/book',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param providerGroupUuid
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderGroupAppointmentCount(
        providerGroupUuid: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/provider-group/count/{providerGroupUuid}',
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
     * @param patientId
     * @param appointmentState
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientAppointment(
        patientId: string,
        appointmentState: 'PAST' | 'FUTURE',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/patient/{patientId}',
            path: {
                'patientId': patientId,
            },
            query: {
                'appointmentState': appointmentState,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param patientId
     * @param appointmentState
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getPatientAndFamilyMemberAppointment(
        patientId: string,
        appointmentState: 'PAST' | 'FUTURE',
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/patient-family-member/{patientId}',
            path: {
                'patientId': patientId,
            },
            query: {
                'appointmentState': appointmentState,
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * @param providerUuid
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentByProvider(
        providerUuid: string,
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/list/{providerUuid}',
            path: {
                'providerUuid': providerUuid,
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
     * @param startDate
     * @param endDate
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentCountByProvider(
        providerUuid: string,
        startDate: string,
        endDate: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/graph/{providerUuid}',
            path: {
                'providerUuid': providerUuid,
            },
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }

    /**
     * @param id
     * @returns Response OK
     * @throws ApiError
     */
    public static getAppointmentDetails(
        id: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/details/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param providerUuid
     * @returns Response OK
     * @throws ApiError
     */
    public static getProviderAppointmentCount(
        providerUuid: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/master/appointment/count/{providerUuid}',
            path: {
                'providerUuid': providerUuid,
            },
        });
    }

    /**
     * @param id
     * @returns Response OK
     * @throws ApiError
     */
    public static noShowAppointment(
        id: number,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/master/appointment/no-show/{id}',
            path: {
                'id': id,
            },
        });
    }

}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AppointmentClinicalRequest = {
    providerGroupUuid?: string;
    searchString?: string;
    status?: AppointmentClinicalRequest.status;
    startAppointmentDate?: string;
    endAppointmentDate?: string;
    locationUuid?: string;
};

export namespace AppointmentClinicalRequest {

    export enum status {
        COMPLETED = 'COMPLETED',
        CHECKED_IN = 'CHECKED_IN',
        WAITING_ROOM = 'WAITING_ROOM',
        IN_EXAM_ROOM = 'IN_EXAM_ROOM',
        SCHEDULED = 'SCHEDULED',
        NOT_CONFIRMED = 'NOT_CONFIRMED',
        CONFIRMED = 'CONFIRMED',
        CANCELLED = 'CANCELLED',
        NO_SHOW = 'NO_SHOW',
        PENDING = 'PENDING',
        ENCOUNTERED = 'ENCOUNTERED',
        RE_SCHEDULED = 'RE_SCHEDULED',
        SEEN = 'SEEN',
        SINGED_OFF = 'SINGED_OFF',
        REQUESTED = 'REQUESTED',
        DECLINE = 'DECLINE',
    }


}


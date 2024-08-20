/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppointmentListLocationRequest } from './AppointmentListLocationRequest';

export type AppointmentListRequest = {
    date?: string;
    patientSearch?: string;
    patientUserUuid?: string;
    appointmentStatus?: Array<'COMPLETED' | 'CHECKED_IN' | 'WAITING_ROOM' | 'IN_EXAM_ROOM' | 'SCHEDULED' | 'NOT_CONFIRMED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW' | 'PENDING' | 'ENCOUNTERED' | 'RE_SCHEDULED' | 'SEEN' | 'SINGED_OFF' | 'REQUESTED' | 'DECLINE'>;
    providerUuid?: Array<string>;
    appointmentType?: AppointmentListRequest.appointmentType;
    appointmentListLocationRequest?: AppointmentListLocationRequest;
    allProvider?: boolean;
};

export namespace AppointmentListRequest {

    export enum appointmentType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }


}


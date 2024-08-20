/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalTime } from './LocalTime';
import type { User } from './User';

export type Notification = {
    id?: number;
    date?: string;
    title?: string;
    message?: string;
    user?: User;
    consumed?: boolean;
    type?: Notification.type;
    appointmentDate?: string;
    appointmentStatTime?: LocalTime;
    appointmentEndTime?: LocalTime;
    providerUserUuid?: string;
    patientName?: string;
    appointmentStatus?: Notification.appointmentStatus;
    visitType?: Notification.visitType;
    appointmentUuid?: string;
    patientUuid?: string;
    appointmentType?: Notification.appointmentType;
    visitReason?: string;
};

export namespace Notification {

    export enum type {
        APPOINTMENT_REQUEST = 'APPOINTMENT_REQUEST',
        BOOKED_APPOINTMENT = 'BOOKED_APPOINTMENT',
        CANCEL_APPOINTMENT = 'CANCEL_APPOINTMENT',
    }

    export enum appointmentStatus {
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

    export enum visitType {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }

    export enum appointmentType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }


}


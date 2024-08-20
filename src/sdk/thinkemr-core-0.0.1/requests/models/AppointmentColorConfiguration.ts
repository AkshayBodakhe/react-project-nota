/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AppointmentColorConfiguration = {
    id?: number;
    appointmentName: AppointmentColorConfiguration.appointmentName;
    color: string;
    modifiedBy?: string;
    modified?: string;
};

export namespace AppointmentColorConfiguration {

    export enum appointmentName {
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


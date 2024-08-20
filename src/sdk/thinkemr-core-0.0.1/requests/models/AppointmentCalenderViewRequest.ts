/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AppointmentListLocationRequest } from './AppointmentListLocationRequest';
import type { ProviderEntity } from './ProviderEntity';

export type AppointmentCalenderViewRequest = {
    calenderViewType: AppointmentCalenderViewRequest.calenderViewType;
    month?: AppointmentCalenderViewRequest.month;
    year?: number;
    startDate?: string;
    endDate?: string;
    providerUserUuid?: string;
    providerEntity?: ProviderEntity;
    date?: string;
    patientSearch?: string;
    patientUserUuid?: string;
    appointmentStatus?: Array<'COMPLETED' | 'CHECKED_IN' | 'WAITING_ROOM' | 'IN_EXAM_ROOM' | 'SCHEDULED' | 'NOT_CONFIRMED' | 'CONFIRMED' | 'CANCELLED' | 'NO_SHOW' | 'PENDING' | 'ENCOUNTERED' | 'RE_SCHEDULED' | 'SEEN' | 'SINGED_OFF' | 'REQUESTED' | 'DECLINE'>;
    providerUuid?: Array<string>;
    appointmentType?: AppointmentCalenderViewRequest.appointmentType;
    appointmentListLocationRequest?: AppointmentListLocationRequest;
    allProvider?: boolean;
};

export namespace AppointmentCalenderViewRequest {

    export enum calenderViewType {
        MONTH = 'MONTH',
        WEEK = 'WEEK',
        DAY = 'DAY',
    }

    export enum month {
        JANUARY = 'JANUARY',
        FEBRUARY = 'FEBRUARY',
        MARCH = 'MARCH',
        APRIL = 'APRIL',
        MAY = 'MAY',
        JUNE = 'JUNE',
        JULY = 'JULY',
        AUGUST = 'AUGUST',
        SEPTEMBER = 'SEPTEMBER',
        OCTOBER = 'OCTOBER',
        NOVEMBER = 'NOVEMBER',
        DECEMBER = 'DECEMBER',
    }

    export enum appointmentType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }


}


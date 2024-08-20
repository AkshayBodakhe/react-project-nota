/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Insurance } from './Insurance';
import type { LocalTime } from './LocalTime';
import type { Location } from './Location';
import type { Patient } from './Patient';
import type { Provider } from './Provider';

export type Appointment = {
    id?: number;
    uuid?: string;
    patient: Patient;
    location: Location;
    provider: Provider;
    type: Appointment.type;
    date?: string;
    startTime?: LocalTime;
    endTime?: LocalTime;
    mode: Appointment.mode;
    room?: string;
    authorizationData?: string;
    paymentType?: Appointment.paymentType;
    primaryInsurance?: Insurance;
    secondaryInsurance?: Insurance;
    reason?: string;
    note?: string;
    status?: Appointment.status;
    duration?: number;
    timezone?: string;
    appointment?: Appointment;
    cancelReason?: string;
    archive?: boolean;
    isRepeated?: boolean;
    repeatInterval?: number;
    repeatUnit?: string;
    repeatDays?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'>;
    repeatEndDate?: string;
    numberOfAppointment?: number;
};

export namespace Appointment {

    export enum type {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }

    export enum mode {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }

    export enum paymentType {
        CASH = 'CASH',
        CARD = 'CARD',
        BANK = 'BANK',
    }

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


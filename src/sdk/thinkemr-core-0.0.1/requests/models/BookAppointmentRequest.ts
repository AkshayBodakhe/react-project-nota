/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AvailabilityEntity } from './AvailabilityEntity';
import type { IntakeForm } from './IntakeForm';
import type { LocalTime } from './LocalTime';
import type { LocationEntity } from './LocationEntity';
import type { PatientEntity } from './PatientEntity';
import type { ProviderEntity } from './ProviderEntity';

export type BookAppointmentRequest = {
    providerUUID?: string;
    locationUUID?: string;
    visitType: BookAppointmentRequest.visitType;
    appointmentType: BookAppointmentRequest.appointmentType;
    appointmentDate: string;
    patientUserUuid?: string;
    startTime: LocalTime;
    endTime: LocalTime;
    visitReason?: string;
    encounterTypeUuid?: string;
    providerEntity?: ProviderEntity;
    patientEntity?: PatientEntity;
    locationEntity?: LocationEntity;
    availabilityEntity?: AvailabilityEntity;
    isRepeated?: boolean;
    repeatInterval?: number;
    repeatUnit?: BookAppointmentRequest.repeatUnit;
    repeatDays?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'>;
    repeatEndDate?: string;
    numberOfAppointment?: number;
    bookAppointmentRequests?: Array<BookAppointmentRequest>;
    bookByPatient?: boolean;
    providerGroupId?: string;
    intakeForms?: Array<IntakeForm>;
};

export namespace BookAppointmentRequest {

    export enum visitType {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }

    export enum appointmentType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }

    export enum repeatUnit {
        WEEK = 'WEEK',
        MONTH = 'MONTH',
        YEAR = 'YEAR',
        DAY = 'DAY',
    }


}


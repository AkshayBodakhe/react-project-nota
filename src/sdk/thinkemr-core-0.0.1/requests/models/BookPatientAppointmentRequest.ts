/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalTime } from './LocalTime';
import type { PatientEntity } from './PatientEntity';
import type { ProviderGroupEntity } from './ProviderGroupEntity';

export type BookPatientAppointmentRequest = {
    patientId: string;
    providerGroupId: string;
    appointmentDate: string;
    appointmentType: BookPatientAppointmentRequest.appointmentType;
    appointmentMode: BookPatientAppointmentRequest.appointmentMode;
    startTime?: LocalTime;
    endTime?: LocalTime;
    visitReason?: string;
    patientEntity?: PatientEntity;
    providerGroupEntity?: ProviderGroupEntity;
};

export namespace BookPatientAppointmentRequest {

    export enum appointmentType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }

    export enum appointmentMode {
        IN_PERSON = 'IN_PERSON',
        VIRTUAL = 'VIRTUAL',
    }


}


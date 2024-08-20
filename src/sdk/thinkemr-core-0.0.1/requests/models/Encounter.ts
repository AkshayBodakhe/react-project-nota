/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Appointment } from './Appointment';
import type { Patient } from './Patient';
import type { Provider } from './Provider';

export type Encounter = {
    id?: number;
    appointment?: Appointment;
    status?: Encounter.status;
    visitType?: Encounter.visitType;
    chiefComplaint?: string;
    serviceDate?: string;
    note?: string;
    signed?: boolean;
    readyForBilling?: boolean;
    patient?: Patient;
    provider?: Provider;
};

export namespace Encounter {

    export enum status {
        PENDING = 'Pending',
        INPROGRESS = 'Inprogress',
        COMPLETED = 'Completed',
        DISCARD = 'Discard',
    }

    export enum visitType {
        FOLLOW_UP = 'FOLLOW_UP',
        INITIAL = 'INITIAL',
    }


}


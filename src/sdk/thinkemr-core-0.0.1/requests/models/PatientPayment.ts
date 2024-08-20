/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Patient } from './Patient';

export type PatientPayment = {
    id?: number;
    uuid?: string;
    patient: Patient;
    paymentMode: string;
    paymentMethod: string;
    paymentId?: string;
    payerName?: string;
    transactionId?: string;
    transactionAmount?: number;
    transactionDate?: string;
    source?: PatientPayment.source;
    referenceNumber?: number;
    cardNumber?: number;
    note?: string;
    appliedAmount?: number;
    unappliedAmount?: number;
};

export namespace PatientPayment {

    export enum source {
        APPOINTMENT = 'APPOINTMENT',
        OTHER = 'OTHER',
    }


}


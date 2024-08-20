/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Superbill = {
    id?: number;
    billId?: string;
    servicePlace?: string;
    serviceDate?: string;
    quantity?: number;
    totalCharges?: number;
    advancePay?: number;
    patientBalance?: number;
    insuranceBalance?: number;
    active?: boolean;
    archive?: boolean;
};


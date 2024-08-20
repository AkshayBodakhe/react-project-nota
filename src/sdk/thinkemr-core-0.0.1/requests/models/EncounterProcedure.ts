/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EncounterProcedure = {
    id?: number;
    uuid?: string;
    code?: string;
    description?: string;
    type?: EncounterProcedure.type;
    modifier?: string;
    diagnosisPointer?: string;
    quantity?: number;
    charges?: number;
    discount?: number;
    tax?: number;
    net?: number;
    archive?: boolean;
};

export namespace EncounterProcedure {

    export enum type {
        ICD = 'ICD',
        CPT = 'CPT',
        HCPCS = 'HCPCS',
    }


}


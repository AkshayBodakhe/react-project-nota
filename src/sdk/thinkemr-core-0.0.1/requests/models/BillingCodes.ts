/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BillingCodes = {
    id?: number;
    uuid?: string;
    type: BillingCodes.type;
    code: string;
    description?: string;
    source?: number;
    active?: boolean;
    archive?: boolean;
    errorMessage?: string;
    providerGroupUuid?: string;
};

export namespace BillingCodes {

    export enum type {
        CPT = 'CPT',
        HCPCS = 'HCPCS',
        LOINC = 'LOINC',
        ICD = 'ICD',
        PATIENT = 'PATIENT',
        PROVIDER = 'PROVIDER',
        DRUG = 'DRUG',
    }


}


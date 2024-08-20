/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EncounterProcedure } from './EncounterProcedure';
import type { Provider } from './Provider';

export type FeeSchedule = {
    id?: number;
    uuid?: string;
    provider?: Provider;
    codeType?: FeeSchedule.codeType;
    encounterProcedure?: EncounterProcedure;
    procedureCode?: string;
    modifier?: string;
    ndcCode?: string;
    amount?: number;
    ndcQuantity?: number;
    note?: string;
    active?: boolean;
    archive?: boolean;
};

export namespace FeeSchedule {

    export enum codeType {
        CPT = 'CPT',
        HCPCS = 'HCPCS',
        LOINC = 'LOINC',
        ICD = 'ICD',
        PATIENT = 'PATIENT',
        PROVIDER = 'PROVIDER',
        DRUG = 'DRUG',
    }


}


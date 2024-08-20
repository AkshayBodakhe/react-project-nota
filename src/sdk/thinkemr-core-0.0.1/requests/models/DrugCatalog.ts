/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Speciality } from './Speciality';

export type DrugCatalog = {
    id?: number;
    uuid?: string;
    speciality: Speciality;
    type: DrugCatalog.type;
    medicine: string;
    dose: string;
    whenField: string;
    whereField: string;
    frequency: string;
    duration: string;
    quantity?: number;
    description?: string;
    source?: number;
    active?: boolean;
    archive?: boolean;
    errorMessage?: string;
    providerGroupUuid?: string;
};

export namespace DrugCatalog {

    export enum type {
        LIQUID = 'LIQUID',
        CAPSULE = 'CAPSULE',
        TABLET = 'TABLET',
        UNKNOWN = 'UNKNOWN',
    }


}


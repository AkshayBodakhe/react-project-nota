/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressEntity } from './AddressEntity';
import type { CurrenciesEntity } from './CurrenciesEntity';
import type { PracticeHoursEntity } from './PracticeHoursEntity';
import type { SpecialityEntity } from './SpecialityEntity';

export type ProviderGroupEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    name?: string;
    schema?: string;
    groupName?: string;
    subdomain?: string;
    phone?: string;
    npi?: number;
    email?: string;
    website?: string;
    fax?: string;
    description?: string;
    physicalAddress?: AddressEntity;
    billingAddress?: AddressEntity;
    active?: boolean;
    archive?: boolean;
    specialities?: Array<SpecialityEntity>;
    workingHours?: Array<PracticeHoursEntity>;
    providerCount?: number;
    patientCount?: number;
    appointmentCount?: number;
    encounterCount?: number;
    avatar?: string;
    currencies?: CurrenciesEntity;
    portalName?: ProviderGroupEntity.portalName;
};

export namespace ProviderGroupEntity {

    export enum portalName {
        NAVALAGLOBAL = 'NAVALAGLOBAL',
        NAVALACARE = 'NAVALACARE',
        PATIENT = 'PATIENT',
    }


}


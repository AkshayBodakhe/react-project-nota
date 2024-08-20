/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { Currencies } from './Currencies';
import type { PracticeHour } from './PracticeHour';
import type { Speciality } from './Speciality';

export type ProviderGroup = {
    id?: number;
    uuid?: string;
    name: string;
    schema?: string;
    groupName?: string;
    subdomain?: string;
    phone: string;
    npi?: string;
    email: string;
    website?: string;
    fax?: string;
    description?: string;
    physicalAddress: Address;
    billingAddress?: Address;
    active?: boolean;
    archive?: boolean;
    specialities?: Array<Speciality>;
    workingHours?: Array<PracticeHour>;
    providerCount?: number;
    patientCount?: number;
    appointmentCount?: number;
    encounterCount?: number;
    avatar?: string;
    newAvatar?: string;
    currencies: Currencies;
    portalName: ProviderGroup.portalName;
};

export namespace ProviderGroup {

    export enum portalName {
        NAVALAGLOBAL = 'NAVALAGLOBAL',
        NAVALACARE = 'NAVALACARE',
        PATIENT = 'PATIENT',
    }


}


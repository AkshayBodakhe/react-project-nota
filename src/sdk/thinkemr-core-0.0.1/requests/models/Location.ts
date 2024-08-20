/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { Department } from './Department';
import type { LocationHour } from './LocationHour';
import type { Speciality } from './Speciality';

export type Location = {
    id?: number;
    uuid?: string;
    locationId?: string;
    name: string;
    specialities?: Array<Speciality>;
    contact: string;
    avatar?: string;
    npi?: string;
    timezone?: string;
    newAvatar?: string;
    email: string;
    fax?: string;
    note?: string;
    physicalAddress: Address;
    billingAddress?: Address;
    locationHours?: Array<LocationHour>;
    active?: boolean;
    archive?: boolean;
    addressCheckBox?: boolean;
    groupNpi?: string;
    departments?: Array<Department>;
    providerGroupUuid: string;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressEntity } from './AddressEntity';
import type { DepartmentEntity } from './DepartmentEntity';
import type { LocationHoursEntity } from './LocationHoursEntity';
import type { ProviderGroupEntity } from './ProviderGroupEntity';
import type { SpecialityEntity } from './SpecialityEntity';
import type { UserEntity } from './UserEntity';

export type LocationEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    name?: string;
    locationId?: string;
    specialities?: Array<SpecialityEntity>;
    contact?: string;
    avatar?: string;
    npi?: string;
    timezone?: string;
    email?: string;
    fax?: string;
    note?: string;
    physicalAddress?: AddressEntity;
    billingAddress?: AddressEntity;
    locationHoursEntities?: Array<LocationHoursEntity>;
    active?: boolean;
    archive?: boolean;
    addressCheckBox?: boolean;
    departments?: Array<DepartmentEntity>;
    users?: Array<UserEntity>;
    providerGroupId?: ProviderGroupEntity;
};


/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationEntity } from './LocationEntity';
import type { ProviderGroupEntity } from './ProviderGroupEntity';
import type { UserEntity } from './UserEntity';

export type DepartmentEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    deptId?: string;
    name?: string;
    adminId?: UserEntity;
    locations?: Array<LocationEntity>;
    contact?: string;
    active?: boolean;
    archive?: boolean;
    providerGroupId?: ProviderGroupEntity;
};


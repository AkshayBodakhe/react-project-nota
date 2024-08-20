/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProviderGroupEntity } from './ProviderGroupEntity';
import type { RolesEntity } from './RolesEntity';

export type UserEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    iamId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    role?: RolesEntity;
    roleType?: UserEntity.roleType;
    lastLogin?: string;
    active?: boolean;
    archive?: boolean;
    tenant?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    providerGroupId?: ProviderGroupEntity;
    consentAccepted?: boolean;
};

export namespace UserEntity {

    export enum roleType {
        ADMIN = 'ADMIN',
        SUPER_ADMIN = 'SUPER_ADMIN',
        PROVIDER = 'PROVIDER',
        PATIENT = 'PATIENT',
        USER = 'USER',
        STAFF = 'STAFF',
        PROVIDER_ADMIN = 'PROVIDER_ADMIN',
    }


}


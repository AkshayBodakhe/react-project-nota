/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permissions } from './Permissions';
import type { Roles } from './Roles';

export type User = {
    id?: number;
    uuid?: string;
    iamId?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
    active?: boolean;
    archive?: boolean;
    avatar?: string;
    newAvatar?: string;
    role?: Roles;
    tenantKey?: string;
    lastLogin?: number;
    roleType: User.roleType;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    departmentName?: Array<string>;
    patientPortal?: boolean;
    portal?: User.portal;
    permissions?: Array<Permissions>;
    providerGroupUuid?: string;
    providerGroup?: string;
};

export namespace User {

    export enum roleType {
        ADMIN = 'ADMIN',
        SUPER_ADMIN = 'SUPER_ADMIN',
        PROVIDER = 'PROVIDER',
        PATIENT = 'PATIENT',
        USER = 'USER',
        STAFF = 'STAFF',
        PROVIDER_ADMIN = 'PROVIDER_ADMIN',
    }

    export enum portal {
        NAVALAGLOBAL = 'NAVALAGLOBAL',
        NAVALACARE = 'NAVALACARE',
        PATIENT = 'PATIENT',
    }


}


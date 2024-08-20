/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressEntity } from './AddressEntity';
import type { ContactDirectoryEntity } from './ContactDirectoryEntity';
import type { LanguageEntity } from './LanguageEntity';
import type { LocationEntity } from './LocationEntity';
import type { PatientFlagsEntity } from './PatientFlagsEntity';
import type { PatientPermissionEntity } from './PatientPermissionEntity';
import type { ProviderEntity } from './ProviderEntity';
import type { ProviderGroupEntity } from './ProviderGroupEntity';
import type { UserEntity } from './UserEntity';

export type PatientEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    uuid?: string;
    user?: UserEntity;
    provider?: ProviderEntity;
    location?: LocationEntity;
    registrationDate?: string;
    firstNameUsed?: string;
    middleName?: string;
    birthDate?: string;
    ssn?: string;
    mrn?: string;
    motherName?: string;
    race?: PatientEntity.race;
    ethnicity?: PatientEntity.ethnicity;
    maritalStatus?: PatientEntity.maritalStatus;
    gender?: PatientEntity.gender;
    address?: AddressEntity;
    fax?: string;
    emergContactLastName?: string;
    emergContactFirstName?: string;
    emergContactRelation?: PatientEntity.emergContactRelation;
    emergContactNumber?: string;
    emergContactEmail?: string;
    emailConsent?: boolean;
    callConsent?: boolean;
    messageConsent?: boolean;
    formConsent?: boolean;
    note?: string;
    preferredPharmacy?: ContactDirectoryEntity;
    preferredLab?: ContactDirectoryEntity;
    preferredRadiology?: ContactDirectoryEntity;
    permissions?: Array<PatientPermissionEntity>;
    source?: number;
    lastVisit?: string;
    nextVisit?: string;
    balance?: number;
    isPermissionEnable?: boolean;
    isArchive?: boolean;
    timezone?: PatientEntity.timezone;
    homeNumber?: string;
    patientFlags?: Array<PatientFlagsEntity>;
    providerGroup?: Array<ProviderGroupEntity>;
    languages?: Array<LanguageEntity>;
    familyMemberRelation?: PatientEntity.familyMemberRelation;
    familyMember?: PatientEntity;
};

export namespace PatientEntity {

    export enum race {
        WHITE = 'WHITE',
        BLACK = 'BLACK',
        ASIAN = 'ASIAN',
        NATIVE_AMERICAN = 'NATIVE_AMERICAN',
        OTHER = 'OTHER',
    }

    export enum ethnicity {
        HISPANIC = 'HISPANIC',
        NON_HISPANIC = 'NON_HISPANIC',
        BLACK = 'BLACK',
        ASIAN = 'ASIAN',
        NATIVE_AMERICAN = 'NATIVE_AMERICAN',
        OTHER = 'OTHER',
    }

    export enum maritalStatus {
        MARRIED = 'MARRIED',
        SINGLE = 'SINGLE',
        DIVORCED = 'DIVORCED',
        WIDOWED = 'WIDOWED',
    }

    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        TRANSGENDER = 'TRANSGENDER',
        OTHER = 'OTHER',
        UNKNOWN = 'UNKNOWN',
    }

    export enum emergContactRelation {
        SPOUSE = 'SPOUSE',
        PARENT = 'PARENT',
        CHILD = 'CHILD',
        SIBLING = 'SIBLING',
        OTHER = 'OTHER',
    }

    export enum timezone {
        EST = 'EST',
        CT = 'CT',
        MT = 'MT',
        PT = 'PT',
        AKT = 'AKT',
        HST = 'HST',
        HAST = 'HAST',
        MST = 'MST',
        IST = 'IST',
    }

    export enum familyMemberRelation {
        SPOUSE = 'SPOUSE',
        PARENT = 'PARENT',
        CHILD = 'CHILD',
        SIBLING = 'SIBLING',
        OTHER = 'OTHER',
    }


}


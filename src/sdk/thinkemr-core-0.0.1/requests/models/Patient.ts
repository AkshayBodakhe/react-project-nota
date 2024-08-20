/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { ContactDirectory } from './ContactDirectory';
import type { Insurance } from './Insurance';
import type { Language } from './Language';
import type { Location } from './Location';
import type { PatientPermission } from './PatientPermission';
import type { Provider } from './Provider';
import type { User } from './User';

export type Patient = {
    id?: number;
    uuid?: string;
    user?: User;
    provider: Provider;
    location: Location;
    registrationDate?: string;
    legalLastName: string;
    legalFirstName: string;
    firstNameUsed?: string;
    middleName?: string;
    birthDate: string;
    ssn?: string;
    motherName?: string;
    languages?: Array<Language>;
    race?: Patient.race;
    ethnicity?: Patient.ethnicity;
    maritalStatus?: Patient.maritalStatus;
    age?: number;
    gender: Patient.gender;
    address?: Address;
    contactNumber: string;
    email: string;
    fax?: string;
    emergContactLastName?: string;
    emergContactFirstName?: string;
    emergContactRelation: Patient.emergContactRelation;
    emergContactNumber: string;
    emergContactEmail: string;
    emailConsent?: boolean;
    callConsent?: boolean;
    messageConsent?: boolean;
    formConsent?: boolean;
    note?: string;
    active?: boolean;
    insurances?: Array<Insurance>;
    preferredPharmacy?: ContactDirectory;
    preferredLab?: ContactDirectory;
    preferredRadiology?: ContactDirectory;
    source?: number;
    lastVisit?: string;
    nextVisit?: string;
    permissions?: Array<PatientPermission>;
    avatar?: string;
    newAvatar?: string;
    balance?: number;
    isArchive?: boolean;
    isPermissionEnable?: boolean;
    timezone?: Patient.timezone;
    homeNumber?: string;
    providerGroup?: string;
    errorMessage?: string;
    familyMemberRelation?: Patient.familyMemberRelation;
    familyMemberId?: string;
    isEmailVerify?: boolean;
    customerId?: string;
    lastLogin?: number;
};

export namespace Patient {

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


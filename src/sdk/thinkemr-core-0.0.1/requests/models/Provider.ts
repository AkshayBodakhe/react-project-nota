/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { Country } from './Country';
import type { Department } from './Department';
import type { InsurancePayer } from './InsurancePayer';
import type { Language } from './Language';
import type { Location } from './Location';
import type { Permissions } from './Permissions';
import type { ProviderProfileInfo } from './ProviderProfileInfo';
import type { Speciality } from './Speciality';

export type Provider = {
    id?: number;
    uuid?: string;
    medicalCreds?: string;
    providerType: Provider.providerType;
    specialities?: Array<Speciality>;
    countries?: Array<Country>;
    languages?: Array<Language>;
    role: string;
    roleName?: string;
    firstName: string;
    lastName: string;
    gender: Provider.gender;
    active?: boolean;
    federalTaxIdNumber?: string;
    npi?: string;
    contactNumber: string;
    fax?: string;
    groupNpi?: string;
    email: string;
    licenseNumber?: string;
    acceptedInsurances?: Array<InsurancePayer>;
    experienceYears?: string;
    taxonomyNumber?: string;
    workLocations?: Array<Location>;
    employmentRefNumber?: string;
    acceptNewPatient?: boolean;
    acceptCashPay?: boolean;
    providerProfileInfo: ProviderProfileInfo;
    avatar?: string;
    newAvatar?: string;
    source?: number;
    insuranceVerification?: Provider.insuranceVerification;
    priorAuthorisations?: Provider.priorAuthorisations;
    errorMessage?: string;
    licenseExpiryDate?: string;
    birthDate?: string;
    departmentName?: Department;
    address?: Address;
    importProviderType?: string;
    importGender?: string;
    importLanguage?: string;
    importInsuranceVerify?: string;
    importPriorInsuranceVerify?: string;
    openTaskCount?: number;
    userUuid?: string;
    portal?: Provider.portal;
    permissions?: Array<Permissions>;
    providerGroup: string;
    patientCount?: number;
    appointmentCount?: number;
    encounterCount?: number;
    roleType?: Provider.roleType;
    deanumber?: string;
};

export namespace Provider {

    export enum providerType {
        MD = 'MD',
        PA = 'PA',
        PSYD = 'PSYD',
        LCSW = 'LCSW',
        NP = 'NP',
        RN = 'RN',
        BHNP = 'BHNP',
        FNP = 'FNP',
        RD = 'RD',
        NONE = 'NONE',
        UNKNOWN = 'UNKNOWN',
        CASE_MANAGER = 'CASE_MANAGER',
        FRONT_DESK_MANAGER = 'FRONT_DESK_MANAGER',
        GENERAL_MEDICINE = 'GENERAL_MEDICINE',
        OTHER = 'OTHER',
        NPS = 'NPS',
    }

    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        TRANSGENDER = 'TRANSGENDER',
        OTHER = 'OTHER',
        UNKNOWN = 'UNKNOWN',
    }

    export enum insuranceVerification {
        EMAIL_ME = 'EMAIL_ME',
        ENROLL_ME = 'ENROLL_ME',
        UNKNOWN = 'UNKNOWN',
        DONT_ENROLL_ME = 'DONT_ENROLL_ME',
    }

    export enum priorAuthorisations {
        EMAIL_ME = 'EMAIL_ME',
        ENROLL_ME = 'ENROLL_ME',
        UNKNOWN = 'UNKNOWN',
        DONT_ENROLL_ME = 'DONT_ENROLL_ME',
    }

    export enum portal {
        NAVALAGLOBAL = 'NAVALAGLOBAL',
        NAVALACARE = 'NAVALACARE',
        PATIENT = 'PATIENT',
    }

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


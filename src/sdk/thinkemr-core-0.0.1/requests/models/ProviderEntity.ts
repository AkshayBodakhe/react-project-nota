/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CountryEntity } from './CountryEntity';
import type { InsurancePayerEntity } from './InsurancePayerEntity';
import type { LanguageEntity } from './LanguageEntity';
import type { LocationEntity } from './LocationEntity';
import type { ProviderProfileInfoEntity } from './ProviderProfileInfoEntity';
import type { SpecialityEntity } from './SpecialityEntity';
import type { UserEntity } from './UserEntity';

export type ProviderEntity = {
    createdBy?: string;
    modifiedBy?: string;
    created?: string;
    modified?: string;
    id?: number;
    userId?: UserEntity;
    uuid?: string;
    providerType?: ProviderEntity.providerType;
    specialities?: Array<SpecialityEntity>;
    countries?: Array<CountryEntity>;
    languages?: Array<LanguageEntity>;
    gender?: ProviderEntity.gender;
    npi?: string;
    fax?: string;
    groupNpi?: number;
    licenseNumber?: string;
    acceptedInsurances?: Array<InsurancePayerEntity>;
    experienceYears?: string;
    taxonomyNumber?: string;
    workLocations?: Array<LocationEntity>;
    employmentRefNumber?: string;
    acceptNewPatient?: boolean;
    acceptCashPay?: boolean;
    providerProfileInfo?: ProviderProfileInfoEntity;
    source?: number;
    insuranceVerification?: ProviderEntity.insuranceVerification;
    priorAuthorisations?: ProviderEntity.priorAuthorisations;
    licenseExpiryDate?: string;
};

export namespace ProviderEntity {

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


}


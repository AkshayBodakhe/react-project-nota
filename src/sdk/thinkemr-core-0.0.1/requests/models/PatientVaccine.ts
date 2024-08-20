/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdministeredUser } from './AdministeredUser';
import type { OrderedUser } from './OrderedUser';
import type { PatientInfo } from './PatientInfo';
import type { Vaccine } from './Vaccine';

export type PatientVaccine = {
    id?: number;
    uuid?: string;
    type?: PatientVaccine.type;
    vaccine: Vaccine;
    patient: PatientInfo;
    administerDate?: string;
    administerTime?: string;
    orderedBy: OrderedUser;
    administeredBy: AdministeredUser;
    manufacturer?: string;
    ndcCode?: string;
    lot?: string;
    dose?: string;
    units?: PatientVaccine.units;
    route?: PatientVaccine.route;
    site?: PatientVaccine.site;
    expiryDate?: string;
    reaction?: string;
    reason?: string;
    note?: string;
    souceOfInfo?: PatientVaccine.souceOfInfo;
    refusedReason?: string;
    effectiveDate?: string;
};

export namespace PatientVaccine {

    export enum type {
        ADMINISTERED = 'ADMINISTERED',
        HISTORICAL = 'HISTORICAL',
        REFUSEDORADMINISTERED = 'REFUSEDORADMINISTERED',
    }

    export enum units {
        MG = 'MG',
        TABLET = 'TABLET',
    }

    export enum route {
        BUCCEL = 'BUCCEL',
        DENTAL = 'DENTAL',
        EPIDURAL = 'EPIDURAL',
        INJECTION = 'INJECTION',
    }

    export enum site {
        ANKLE_LEFT = 'ANKLE_LEFT',
        ANKLE_RIGHT = 'ANKLE_RIGHT',
        BLADDER = 'BLADDER',
        ARM_LEFT_UPPER = 'ARM_LEFT_UPPER',
    }

    export enum souceOfInfo {
        ADMINBYPROVIDER = 'ADMINBYPROVIDER',
        PARENTSRECORD = 'PARENTSRECORD',
        PARENTSRECALL = 'PARENTSRECALL',
        BIRTHCERT = 'BIRTHCERT',
        SCHOOLRECORD = 'SCHOOLRECORD',
        PUBLICAGENCY = 'PUBLICAGENCY',
        OTHER = 'OTHER',
    }


}


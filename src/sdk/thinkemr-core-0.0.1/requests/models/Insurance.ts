/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InsurancePayer } from './InsurancePayer';
import type { InsurancePolicyHolder } from './InsurancePolicyHolder';
import type { Patient } from './Patient';

export type Insurance = {
    id?: number;
    uuid?: string;
    insuranceType?: Insurance.insuranceType;
    patient?: Patient;
    insurancePayer: InsurancePayer;
    copay?: number;
    payerContactNumber: string;
    payerFaxNumber: string;
    memberId: string;
    groupId?: string;
    groupName: string;
    expiryDate?: string;
    relationshipWithPolicyHolder?: Insurance.relationshipWithPolicyHolder;
    insurancePolicyHolder?: InsurancePolicyHolder;
    frontPhoto?: string;
    backPhoto?: string;
    newFrontPhoto?: string;
    newBackPhoto?: string;
    active?: boolean;
    archive?: boolean;
    planName?: string;
    planType?: string;
    effectiveStartDate?: string;
    effectiveEndDate?: string;
};

export namespace Insurance {

    export enum insuranceType {
        PRIMARY = 'PRIMARY',
        SECONDARY = 'SECONDARY',
        OTHER = 'OTHER',
    }

    export enum relationshipWithPolicyHolder {
        SPOUSE = 'SPOUSE',
        CHILD = 'CHILD',
        SELF = 'SELF',
        OTHER = 'OTHER',
    }


}


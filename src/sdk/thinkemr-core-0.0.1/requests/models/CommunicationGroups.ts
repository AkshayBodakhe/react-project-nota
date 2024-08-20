/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Patient } from './Patient';
import type { PatientFlags } from './PatientFlags';

export type CommunicationGroups = {
    id?: number;
    uuid?: string;
    name: string;
    archive?: boolean;
    patients?: Array<Patient>;
    flags?: Array<PatientFlags>;
    patientCount?: number;
    createdBy?: string;
    createdOn?: string;
    providerGroupUuid: string;
};


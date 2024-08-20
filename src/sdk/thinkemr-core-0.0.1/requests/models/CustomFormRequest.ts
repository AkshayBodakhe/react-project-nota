/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonNode } from './JsonNode';
import type { Speciality } from './Speciality';

export type CustomFormRequest = {
    uuid?: string;
    title: string;
    content?: JsonNode;
    type: CustomFormRequest.type;
    speciality?: Speciality;
    mandatory?: boolean;
    assignedByDefault?: boolean;
    filePassed?: boolean;
    providerGroupUuid: string;
};

export namespace CustomFormRequest {

    export enum type {
        INTAKE_FORM = 'INTAKE_FORM',
        CONSENT_FORM = 'CONSENT_FORM',
        VISIT_NOTE = 'VISIT_NOTE',
    }


}


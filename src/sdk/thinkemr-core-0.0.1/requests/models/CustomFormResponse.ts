/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonNode } from './JsonNode';
import type { Speciality } from './Speciality';

export type CustomFormResponse = {
    uuid?: string;
    title?: string;
    content?: JsonNode;
    type?: CustomFormResponse.type;
    speciality?: Speciality;
    mandatory?: boolean;
    assignedByDefault?: boolean;
    preSignedUrl?: string;
    created?: string;
    filePassed?: boolean;
    modified?: string;
};

export namespace CustomFormResponse {

    export enum type {
        INTAKE_FORM = 'INTAKE_FORM',
        CONSENT_FORM = 'CONSENT_FORM',
        VISIT_NOTE = 'VISIT_NOTE',
    }


}


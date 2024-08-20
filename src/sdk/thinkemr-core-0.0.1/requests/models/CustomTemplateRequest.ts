/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFormResponse } from './CustomFormResponse';
import type { JsonNode } from './JsonNode';
import type { Speciality } from './Speciality';

export type CustomTemplateRequest = {
    uuid?: string;
    customTemplateType: CustomTemplateRequest.customTemplateType;
    title: string;
    content: JsonNode;
    visitNoteType?: string;
    questionnaireType?: string;
    speciality?: Speciality;
    customForm?: CustomFormResponse;
    archive?: boolean;
    providerGroupUuid: string;
};

export namespace CustomTemplateRequest {

    export enum customTemplateType {
        VISIT_NOTE = 'VISIT_NOTE',
        CUSTOM_QUESTIONNAIRE = 'CUSTOM_QUESTIONNAIRE',
        REVIEW_OF_SYSTEM = 'REVIEW_OF_SYSTEM',
        PHYSICAL_EXAM = 'PHYSICAL_EXAM',
    }


}


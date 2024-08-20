/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Assessment } from './Assessment';
import type { EncounterDocumentResponse } from './EncounterDocumentResponse';
import type { EncounterPlan } from './EncounterPlan';
import type { Objective } from './Objective';
import type { Subjective } from './Subjective';

export type EncounterDetailsRequest = {
    encounterUuid: string;
    encounterStatus?: EncounterDetailsRequest.encounterStatus;
    chiefComplaint?: string;
    subjective?: Subjective;
    objective?: Objective;
    assessment?: Assessment;
    encounterPlan?: EncounterPlan;
    providerName?: string;
    singedDate?: string;
    encounterDocumentResponses?: Array<EncounterDocumentResponse>;
};

export namespace EncounterDetailsRequest {

    export enum encounterStatus {
        CHECK_IN = 'CHECK_IN',
        DRAFT = 'DRAFT',
        SIGNED = 'SIGNED',
        UNSIGNED = 'UNSIGNED',
    }


}


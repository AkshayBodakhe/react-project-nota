/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Appointment } from './Appointment';
import type { JsonNode } from './JsonNode';

export type IntakeForm = {
    id?: number;
    uuid?: string;
    content?: JsonNode;
    appointment?: Appointment;
    intakeFormName?: string;
    sendDate?: string;
    dueDate?: string;
    submittedDate?: string;
    status?: IntakeForm.status;
    filledBy?: IntakeForm.filledBy;
};

export namespace IntakeForm {

    export enum status {
        SENT = 'SENT',
        FILLED = 'FILLED',
        COMPLETED = 'COMPLETED',
    }

    export enum filledBy {
        PATIENT = 'PATIENT',
        PROVIDER = 'PROVIDER',
    }


}


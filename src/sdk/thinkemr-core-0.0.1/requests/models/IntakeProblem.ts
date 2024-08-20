/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntakeForm } from './IntakeForm';
import type { PatientProblem } from './PatientProblem';

export type IntakeProblem = {
    id?: number;
    intakeForm?: IntakeForm;
    patientProblem?: PatientProblem;
    name?: string;
    active?: boolean;
    type?: IntakeProblem.type;
    diagnosedDate?: string;
    note?: string;
};

export namespace IntakeProblem {

    export enum type {
        CHRONIC = 'Chronic',
        ACCUTE = 'accute',
    }


}


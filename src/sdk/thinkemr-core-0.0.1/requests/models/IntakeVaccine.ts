/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IntakeForm } from './IntakeForm';
import type { Vaccine } from './Vaccine';

export type IntakeVaccine = {
    id?: number;
    intakeForm?: IntakeForm;
    vaccine?: Vaccine;
    name?: string;
    administerDay?: string;
    administeredBy?: number;
    expiryDate?: string;
    amount?: number;
    unit?: string;
    route?: string;
    site?: string;
    manufacturer?: string;
    lot?: string;
};


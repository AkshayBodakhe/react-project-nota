/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatientSocialHistory = {
    id?: number;
    uuid?: string;
    name: string;
    description: string;
    socialHistoryType: PatientSocialHistory.socialHistoryType;
    archive?: boolean;
    patientUuid?: string;
    createdByName?: string;
    updatedByName?: string;
};

export namespace PatientSocialHistory {

    export enum socialHistoryType {
        EDUCATION_LEVEL = 'EDUCATION_LEVEL',
        FINANCIAL_STRAIN = 'FINANCIAL_STRAIN',
        EXPOSURE_TO_VIOLENCE = 'EXPOSURE_TO_VIOLENCE',
        TOBACCO_USE = 'TOBACCO_USE',
        ALCOHOL_USE = 'ALCOHOL_USE',
        PHYSICAL_ACTIVITY = 'PHYSICAL_ACTIVITY',
        STRESS = 'STRESS',
        SEXUAL_ORIENTATION = 'SEXUAL_ORIENTATION',
        NUTRITION_HISTORY = 'NUTRITION_HISTORY',
        SOCIAL_HISTORY = 'SOCIAL_HISTORY',
    }


}


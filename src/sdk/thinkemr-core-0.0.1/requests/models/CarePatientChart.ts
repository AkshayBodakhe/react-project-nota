/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CarePatientChart = {
    id?: number;
    uuid?: string;
    name: string;
    description: string;
    carePatientChartingType: CarePatientChart.carePatientChartingType;
    socialAndEnvironmentalSupportType?: CarePatientChart.socialAndEnvironmentalSupportType;
    archive?: boolean;
    date?: string;
    providerName?: string;
    patientUuid: string;
    encounterId?: string;
};

export namespace CarePatientChart {

    export enum carePatientChartingType {
        ADHERENCE_TO_TREATMENT = 'ADHERENCE_TO_TREATMENT',
        STI_TESTING_AND_HISTORY = 'STI_TESTING_AND_HISTORY',
        SUBSTANCE_ABUSE_HISTORY = 'SUBSTANCE_ABUSE_HISTORY',
        RISK_BEHAVIOR_SCREENING = 'RISK_BEHAVIOR_SCREENING',
        SOCIAL_AND_ENVIRONMENTAL_SUPPORT = 'SOCIAL_AND_ENVIRONMENTAL_SUPPORT',
        FAMILY_PLANNING = 'FAMILY_PLANNING',
        REFERRALS_FOR_SERVICES = 'REFERRALS_FOR_SERVICES',
        HIV_AIDS_AND_OTHER_STDS_EDUCATION = 'HIV_AIDS_AND_OTHER_STDS_EDUCATION',
        OTHERS = 'OTHERS',
    }

    export enum socialAndEnvironmentalSupportType {
        HOUSING = 'HOUSING',
        EMPLOYMENT_SOURCES_OF_INCOME = 'EMPLOYMENT_SOURCES_OF_INCOME',
        EMOTIONAL_SUPPORT = 'EMOTIONAL_SUPPORT',
        FOOD_ASSISTANCE = 'FOOD_ASSISTANCE',
        TRANSPORTATION = 'TRANSPORTATION',
        SUPPORT_GROUPS_FAMILY = 'SUPPORT_GROUPS_FAMILY',
        HISTORY_OF_INCARCERATION = 'HISTORY_OF_INCARCERATION',
    }


}


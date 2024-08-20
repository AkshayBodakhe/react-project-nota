/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatientVital = {
    id?: number;
    uuid?: string;
    name?: PatientVital.name;
    value1?: string;
    value2?: string;
    unit?: string;
    area?: string;
    position?: string;
    note?: string;
    archive?: boolean;
    vitalNote?: string;
    recordedDate?: string;
};

export namespace PatientVital {

    export enum name {
        TEMPERATURE = 'TEMPERATURE',
        BLOOD_PRESSURE = 'BLOOD_PRESSURE',
        HEART_RATE = 'HEART_RATE',
        RESPIRATION_RATE = 'RESPIRATION_RATE',
        OXYGEN_SATURATION = 'OXYGEN_SATURATION',
        HEIGHT = 'HEIGHT',
        WEIGHT = 'WEIGHT',
        BMI = 'BMI',
    }


}


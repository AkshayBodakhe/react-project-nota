/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PracticeHoursEntity = {
    id?: number;
    dayOfWeek?: PracticeHoursEntity.dayOfWeek;
    openingTime?: string;
    closingTime?: string;
};

export namespace PracticeHoursEntity {

    export enum dayOfWeek {
        MONDAY = 'MONDAY',
        TUESDAY = 'TUESDAY',
        WEDNESDAY = 'WEDNESDAY',
        THURSDAY = 'THURSDAY',
        FRIDAY = 'FRIDAY',
        SATURDAY = 'SATURDAY',
        SUNDAY = 'SUNDAY',
    }


}


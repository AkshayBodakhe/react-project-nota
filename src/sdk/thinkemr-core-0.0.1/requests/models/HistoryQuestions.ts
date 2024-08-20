/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HistoryQuestions = {
    id?: number;
    question?: string;
    type?: HistoryQuestions.type;
};

export namespace HistoryQuestions {

    export enum type {
        SOCIAL = 'Social',
        FAMILY = 'Family',
    }


}


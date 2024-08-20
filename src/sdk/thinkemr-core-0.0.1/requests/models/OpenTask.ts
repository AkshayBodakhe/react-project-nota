/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientInfo } from './PatientInfo';
import type { Provider } from './Provider';

export type OpenTask = {
    id?: number;
    uuid?: string;
    note?: string;
    taskTitle: string;
    patient?: PatientInfo;
    assignedTO: Provider;
    assignedBy?: Provider;
    dueDate?: string;
    status: OpenTask.status;
    priority: OpenTask.priority;
    archive?: boolean;
    providerGroupUuid: string;
    createdDate?: string;
};

export namespace OpenTask {

    export enum status {
        OPEN = 'OPEN',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETE = 'COMPLETE',
        INCOMPLETE = 'INCOMPLETE',
    }

    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
    }


}


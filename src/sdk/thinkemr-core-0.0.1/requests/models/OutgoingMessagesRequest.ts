/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommunicationGroups } from './CommunicationGroups';

export type OutgoingMessagesRequest = {
    id?: number;
    uuid?: string;
    communicationGroups: CommunicationGroups;
    includeExcludeType?: OutgoingMessagesRequest.includeExcludeType;
    patientsUuid?: Array<string>;
    description: string;
    subject: string;
    providerGroupUuid: string;
};

export namespace OutgoingMessagesRequest {

    export enum includeExcludeType {
        INCLUDE = 'INCLUDE',
        EXCLUDE = 'EXCLUDE',
    }


}


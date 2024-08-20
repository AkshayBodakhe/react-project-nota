/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CancelAppointmentRequest = {
    appointmentId: number;
    reasonForCancellation?: string;
    cancelByPatient?: boolean;
    providerGroupId?: string;
};


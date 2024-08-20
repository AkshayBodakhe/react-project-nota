/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EducationLevelData } from './EducationLevelData';
import type { PatientInfo } from './PatientInfo';

export type EducationLevel = {
    id?: number;
    uuid?: string;
    educationLevelName?: EducationLevelData;
    effectiveDate?: string;
    patient?: PatientInfo;
    archive?: boolean;
};


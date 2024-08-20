import { PatientVital } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { PatientData } from "../diagnoses";
import { VitalTypes } from "../enums-interfaces/enums";


export const Payload = (value:any) => [
  {
    name: PatientVital.name.BLOOD_PRESSURE,
    value1: value?.systolic,
    value2: value?.diastolic,
    unit: '',
    area: value?.BPArea,
    position: value?.BPPosition
  }, {
    name: PatientVital.name.BMI,
    value1: value?.bodyMassIndex,
    value2: "",
    unit: '',
    area: '',
    position: ''
  }, {
    name: PatientVital.name.HEART_RATE,
    value1: value?.BPM,
    value2: "",
    unit: '',
    area: '',
    position: ''
  }, {
    name: PatientVital.name.HEIGHT,
    value1: value?.heightFT,
    value2: "",
    unit: value?.heightUnit,
    area: '',
    position: ''
  }, {
    name: PatientVital.name.OXYGEN_SATURATION,
    value1: value?.oxygenSaturation,
    value2: "",
    unit: '%',
    area: '',
    position: ''
  }, {
    name: PatientVital.name.RESPIRATION_RATE,
    value1: value?.respirationRate,
    value2: "",
    unit: '',
    area: '',
    position: ''
  }, {
    name: PatientVital.name.TEMPERATURE,
    value1: value?.temperature,
    value2: "",
    unit: value?.tempUnit,
    area: value?.tempArea,
    position: ''
  }, {
    name: PatientVital.name.WEIGHT,
    value1: value?.weight,
    value2: "",
    unit: value?.weightUnit,
    area: '',
    position: ''
  }
]
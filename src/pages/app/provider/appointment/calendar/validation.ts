import * as yup from "yup";

const bookAppointmentRequestSchema = yup.object().shape({
  provider: yup.mixed().required("Please select the provider"),
  locationUUID: yup.string(),
  visitType: yup
    .string()
    .oneOf(["IN_PERSON", "VIRTUAL"])
    .required("Please select the appointment mode"),
  appointmentType: yup
    .string()
    .oneOf(["FOLLOW_UP", "INITIAL"])
    .required("Please select the appointment type"),
  appointmentDate: yup.string().optional(),
  patient: yup.mixed().required("Please select the patient"),
  startTime: yup.string().optional(),
  endTime: yup.string().optional(),
  visitReason: yup.string().required("Please enter the chief complaint"),
  // .matches(/^[a-zA-Z0-9\s]*$/, "Please enter the valid chief complaint"),
  isRepeated: yup.boolean().optional(),
  repeatInterval: yup.number().optional(),
  repeatUnit: yup.string().oneOf(["WEEK", "MONTH", "YEAR", "DAY"]).optional(),
  repeatDays: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ])
    )
    .optional(),
  repeatEndDate: yup.string().optional(),
  numberOfAppointment: yup.number().optional(),
});

export default bookAppointmentRequestSchema;

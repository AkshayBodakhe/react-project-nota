import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormInputs } from "./patient-form";
import FormInput from "../../../../../components/common/atom/FormInput";
import { Props } from "./privacy";
import { usePatientControllerServiceGetPatient } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { Patient } from "../../../../../sdk/thinkemr-core-0.0.1/requests";

const apptTypeOption = [
  { id: "INITIAL", name: "INITIAL" },
  { id: "FOLLOW_UP", name: "FOLLOW_UP" },
];

function AppointmentInformation(props: Props) {
  const {
    formik: {
      values,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
      setValues,
    },
    setIsValid,
    isSubmitting,
    setIsSubmitting,
    apptDetails,
  } = props;

  const { data: patientDetails } = usePatientControllerServiceGetPatient({
    patientUuid: apptDetails?.patientUuid,
  });

  useEffect(() => {
    if (apptDetails && patientDetails?.data) {
      setValues(patientDetails?.data);
    }
  }, [apptDetails, patientDetails?.data]);

  const formInputs: FormInputs[] = [
    {
      name: "",
      label: "Appointment Date & Time",
      isRequired: false,
      placeholder: "",
      xs: 2.8,
      value: apptDetails?.appointmentDate + " " + apptDetails?.startTime,
      isDisabled: true,
    },
    {
      name: "",
      label: "Location",
      isRequired: false,
      placeholder: "",
      xs: 2.8,
      value: apptDetails?.locationName,
      isDisabled: true,
    },
    {
      name: "",
      label: "Appointment Type",
      isRequired: false,
      placeholder: "",
      xs: 2.8,
      value: toCamelCase(apptDetails?.appointmentType),
      isDisabled: true,
    },
    // {
    //   control: "dropdown",
    //   name: "appointmentType",
    //   label: "Appointment Type",
    //   isRequired: false,
    //   placeholder: "Select appointment",
    //   xs: 3,
    //   value: "",
    //   options: apptTypeOption,
    //   mapName: "name",
    //   mapBy: "id",
    // },
    // {
    //   control: "dropdown",
    //   name: "renderingProvider",
    //   label: "Rendering Provider",
    //   isRequired: false,
    //   placeholder: "Select Provider",
    //   xs: 3,
    //   value: "",
    //   mapName: "name",
    //   mapBy: "id",
    // },
  ];

  useEffect(() => {
    if (isSubmitting) setIsValid(true);
    // setIsSubmitting(false);
    // setFieldValue(
    //   "appointmentDateAndTime",
    //   apptDetails?.appointmentDate + " " + apptDetails?.startTime
    // );
    // setFieldValue("appointmentType", apptDetails?.appointmentType);
    // setFieldValue("renderingProvider", apptDetails?.providerName);
  }, [isSubmitting]);

  const handleChange = (event: any) => {
    setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <React.Fragment key={"ProviderInformation"}>
        <Grid container columnGap={2}>
          {formInputs.map((input: FormInputs, i: number) => {
            return (
              <Grid key={i} item xs={input.xs}>
                <FormInput
                  isDisabled={input.isDisabled}
                  key={input.name}
                  mapName={input.mapName}
                  mapLastName={input.mapLastName}
                  control={input.control}
                  name={input.name}
                  mapBy={input.mapBy}
                  label={input.label}
                  value={input.value}
                  disableFuture={true}
                  disablePast={true}
                  error={errors[input.name]}
                  isError={!!(!input.value && touched[input.name])}
                  placeholder={input.placeholder}
                  isRequired={input.isRequired}
                  format={input.dateFormat}
                  options={input.options}
                  onChange={handleChange}
                />
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    </>
  );
}

export default AppointmentInformation;

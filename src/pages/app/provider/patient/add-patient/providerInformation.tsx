import { Grid } from "@mui/material";
import FormInput from "../../../../../components/common/atom/FormInput";
import { Props } from "./privacy";
import { FormInputs } from "./patient-form";
import React, { useEffect, useState } from "react";

function ProviderInformation(props: Props) {
  const {
    formik: { values, setFieldValue, setFieldTouched, errors, touched },
    locationList,
    providerList,
    setIsValid,
    isSubmitting,
    setIsSubmitting,
  } = props;

  const { provider, location, registrationDate } = values;

  const [providerOpts, setProviderOpts] = useState<any[]>([]);
  const [locationOpts, setLocationOpts] = useState<any[]>([]);

  const formInputs: FormInputs[] = [
    {
      control: "dropdown",
      name: "provider",
      label: "Primary Provider",
      isRequired: true,
      placeholder: "Select Primary Provider",
      xs: 3,
      value: provider,
      options: providerOpts,
      mapName: "firstName",
      mapLastName: "lastName",
      errorMsg: "Required",
      mapBy: "uuid",
    },
    {
      control: "dropdown",
      name: "location",
      label: "Provider Group Location",
      isRequired: true,
      placeholder: "Select Provider Group Location",
      xs: 3,
      value: location,
      options: locationOpts,
      mapName: "name",
      mapBy: "uuid",
    },
    {
      control: "calendar",
      name: "registrationDate",
      label: "Registration Date",
      isRequired: false,
      placeholder: "",
      xs: 3,
      value: registrationDate,
      dateFormat: "ISO",
      errorMsg: errors.registrationDate,
    },
  ];

  useEffect(() => {
    if (providerList?.length) setProviderOpts(providerList);
  }, [providerList?.length]);

  useEffect(() => {
    if (locationList?.length) setLocationOpts(locationList);
  }, [locationList?.length]);

  useEffect(() => {
    if (isSubmitting) {
      setFieldTouched("registrationDate");
      setFieldTouched("provider");
      setFieldTouched("location");
      if (
        !errors.provider &&
        provider.uuid &&
        !errors.location &&
        location.uuid
      ) {
        setIsValid(true);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [isSubmitting, errors]);

  const handleChange = (event: any) => {
    setFieldValue(event.target.name, event.target.value);
  };

  return (
    <React.Fragment key={"ProviderInformation"}>
      <Grid container columnGap={2}>
        {formInputs.map((input: FormInputs, i: number) => {
          return (
            <Grid key={i} item xs={input.xs}>
              <FormInput
                key={input.name}
                mapName={input.mapName}
                mapLastName={input.mapLastName}
                control={input.control}
                name={input.name}
                mapBy={input.mapBy}
                label={input.label}
                value={input.value || new Date()}
                disableFuture={true}
                disablePast={true}
                error={errors[input.name]}
                isError={!!(!input.value && touched[input.name])}
                placeholder={input.placeholder}
                isRequired={input.isRequired}
                format={input.dateFormat}
                options={input.options}
                onChange={handleChange}
                isReadOnly={true}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

export default ProviderInformation;

import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import FormInput from "../../../../../components/common/atom/FormInput";
import { Props } from "./privacy";
import { FormInputs } from "./patient-form";
import { States } from "../../../../../components/common/form-enum";
import { onlyNumber } from "../../../../../components/common/validation/onlyNumber";

const ContactInfo = (props: Props) => {
  const {
    formik: {
      values,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
      // handleBlur
    },
    setIsValid,
    isSubmitting,
    setIsSubmitting,
  } = props;

  const {
    faxNumber,
    email,
    homeNumber,
    contactNumber,
    // address: { line1, line2, city, state, country, zipcode },
  } = values;

  const fields = ["faxNumber", "email", "homeNumber", "contactNumber"];

  const addressFields = [
    "line1",
    "line2",
    "city",
    "state",
    "country",
    "zipcode",
  ];
  if (values.address === null) {
    values.address={};
    values.address.line1 = "" || undefined;
    values.address.line2 = "" || undefined;
    values.address.city = "" || undefined;
    values.address.state = "" || undefined;
    values.address.country = "" || undefined;
    values.address.zipcode = "" || undefined;
  }

  useEffect(() => {
    if (isSubmitting) {
      const array: any[] = fields.map((field) => {
        setFieldTouched(field);
        return checkValidation(field);
      });

      const array2: any[] = addressFields.map((field) => {
        setFieldTouched(field);
        return addressValidation(field && field);
      });

      if (!array.includes(false) && !array2.includes(false)) setIsValid(true);
      else setIsSubmitting(false);
    }
  }, [isSubmitting, errors]);

  const countryOpts: any[] = [
    { key: "UNITEDSTATE", value: "United State" },
    { key: "INDIA", value: "India" },
    { key: "UK", value: "UK" },
    { key: "UAE", value: "UAE" },
  ];
  const formInputs: FormInputs[] = [
    {
      control: "",
      name: "contactNumber",
      label: "Contact Number",
      placeholder: "Enter Contact Number ",
      isRequired: true,
      value: contactNumber,
      xs: 3,
      isError: touched.contactNumber && errors.contactNumber,
      errorMsg: errors.contactNumber || "",
    },
    {
      control: "",
      name: "homeNumber",
      label: "Home Number",
      placeholder: "Enter Number",
      isRequired: false,
      value: homeNumber,
      xs: 3,
      isError: touched.homeNumber && errors.homeNumber,
      errorMsg: errors.homeNumber || "",
    },
    {
      control: "",
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      isRequired: true,
      value: email,
      xs: 3,
      isError: touched.email && errors.email,
      errorMsg: errors.email || "",
    },
    {
      control: "",
      name: "faxNumber",
      label: "Fax Number",
      placeholder: "Enter Fax Number",
      isRequired: false,
      value: faxNumber,
      xs: 3,
      // isError: touched.faxNumber && errors.faxNumber,
      // errorMsg: errors.faxNumber || ''
    },
    {
      control: "",
      name: "address.line1",
      label: "Address Line 1",
      placeholder: "Enter Address Line 1",
      isRequired: true,
      value: values?.address?.line1 || undefined,
      xs: 3,
      errorMsg: errors?.address?.line1 || "",
      isError: touched.line1 && errors.address?.line1,
    },
    {
      control: "",
      name: "address.line2",
      label: "Address Line 2",
      placeholder: "Enter Address Line 2",
      isRequired: false,
      value: values?.address?.line2 || undefined,
      xs: 3,
    },
    {
      control: "",
      name: "address.city",
      label: "City",
      placeholder: "Enter City",
      isRequired: true,
      value: values?.address?.city || undefined,
      xs: 3,
      isError: !!(touched.city && errors.address?.city),
      errorMsg: errors.address?.city || "",
    },
    {
      control: "",
      name: "address.state",
      label: "State",
      placeholder: "Select State",
      isRequired: true,
      value: values?.address?.state || undefined,
      xs: 3,
      options: States,
      isError: !!(touched?.state && errors.address?.state),
      errorMsg: errors.address?.state || "",
    },
    {
      control: "",
      name: "address.country",
      label: "Country",
      placeholder: "Select Country",
      isRequired: true,
      value: values?.address?.country || undefined,
      xs: 3,
      options: countryOpts,
      isError: !!(touched.country && errors.address?.country),
      errorMsg: errors.address?.country || "",
    },
    {
      control: "",
      name: "address.zipcode",
      label: "Zip Code",
      placeholder: "Enter Zip Code",
      isRequired: false,
      value: values?.address?.zipcode || undefined,
      xs: 3,
      isError: !!(touched.zipcode && errors.address?.zipcode),
      errorMsg: errors.address?.zipcode || "",
    },
  ];

  const handleChange = (event: any) => {
    if (event.target.name == "address.zipcode") {
      const inputValue = event.target.value;
      const limitedInput = onlyNumber(inputValue);
      setFieldValue(event.target.name, limitedInput);
    } else {
      setFieldValue(event.target.name, event.target.value);
    }
  };

  function checkValidation(field: any) {
    return !errors[field] && values[field];
  }

  function addressValidation(field: any) {
    if (!errors.address) return true;
    return !errors.address[field] && values.address[field];
  }

  return (
    <React.Fragment key={"ContactInfo"}>
      <Grid container rowSpacing={2} spacing={2}>
        {formInputs.map((input: FormInputs) => {
          return (
            <Grid item xs={input.xs}>
              <FormInput
                control={input.control}
                name={input.name}
                label={input.label}
                isError={input.isError}
                error={input.errorMsg}
                value={input.value}
                placeholder={input.placeholder}
                isRequired={input.isRequired}
                options={input.options}
                onChange={handleChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default ContactInfo;

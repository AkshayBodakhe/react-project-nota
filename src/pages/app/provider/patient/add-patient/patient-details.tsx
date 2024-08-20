import { Autocomplete, Grid, MenuItem, TextField } from "@mui/material";
import { patientConstants } from "../../../../../constants/patient";
import FormInput from "../../../../../components/common/atom/FormInput";
import { Props } from "./privacy";
import {
  Gender,
  MaritalStatusOptions,
  LanguageOptions,
  Race,
  Ethnicity,
  AppointmentTimeZones,
} from "../../../../../components/common/form-enum";
import { useEffect, useState } from "react";
import { useProviderGroupControllerServiceGetAllLanguages } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { getAllLanguages } from "../../../../../components/common/enums-and-interfaces/common-functions";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { patientStyle } from "../style/commonStyle";
import { multiSelectDropDown } from "../add-new-patient";
import { isNavalaCare } from "../../../../../components/common/helper";

const {
  FIRST_NAME,
  MIDDLE_NAME,
  LAST_NAME,
  DOB,
  GENDER,
  MARITAL_STATUS,
  LANUAGE,
} = patientConstants;

function PatientDetails(props: Props) {
  const {
    formik: {
      values,
      setFieldValue,
      setFieldTouched,
      errors,
      touched,
      handleBlur,
    },
    setIsValid,
    isSubmitting,
    setIsSubmitting,
  } = props;

  const {
    legalFirstName,
    middleName,
    legalLastName,
    birthDate,
    gender,
    maritalStatus,
    timezone,
    ssn,
    race,
    languages,
    ethnicity,
  } = values;

  const fields = [
    "legalFirstName",
    "middleName",
    "legalLastName",
    "birthDate",
    "gender",
    "maritalStatus",
    "timezone",
    "ssn",
    "race",
    "languages",
    "ethnicity",
  ];

  const styles = patientStyle();

  const [LanguageOptions, setLanguageOptions] = useState<any[]>([]);

  useEffect(() => {
    const getLang = async () => {
      const data = await getAllLanguages();
      setLanguageOptions(data?.data?.content || []);
    };

    getLang();
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      const array: any[] = fields.map((field) => {
        setFieldTouched(field);
        return checkValidation(field);
      });
      if (!array.includes(false)) setIsValid(true);
      else setIsSubmitting(false);
    }
  }, [isSubmitting, errors]);

  const handleChange = (event: any) => {
    setFieldValue(event.target.name, event.target.value);
  };

  function checkValidation(field: any) {
    return !errors[field] && values[field];
  }

  return (
    <Grid container spacing={2} height={"245px"}>
      <Grid item>
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "24.5% 24.5% 24.5% 24.5%",
            columnGap: "1%",
            rowGap: "4%",
            width: "90vw",
          }}
        >
          <Grid>
            <FormInput
              name="legalFirstName"
              value={legalFirstName}
              label={FIRST_NAME}
              isError={
                !!(touched["legalFirstName"] && errors["legalFirstName"])
              }
              error={errors["legalFirstName"]}
              handleBlur={handleBlur}
              placeholder={"Enter First Name"}
              isRequired={true}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              name="middleName"
              value={middleName}
              isError={!!(touched["middleName"] && errors["middleName"])}
              handleBlur={handleBlur}
              error={errors["middleName"]}
              label={MIDDLE_NAME}
              placeholder={"Enter Middle Name"}
              isRequired={false}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              name="legalLastName"
              value={legalLastName || ""}
              isError={!!(touched["legalLastName"] && errors["legalLastName"])}
              handleBlur={handleBlur}
              error={errors["legalLastName"]}
              label={LAST_NAME}
              placeholder={"Enter Last Name"}
              isRequired={true}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              key={"dob"}
              control={"calendar"}
              name={"birthDate"}
              label={DOB}
              disableFuture={true}
              isRequired={true}
              isError={!!(touched["birthDate"] && errors["birthDate"])}
              error={errors["birthDate"]}
              value={birthDate}
              format={"ISO"}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              control="select"
              name="gender"
              value={gender}
              label={GENDER}
              placeholder={"Select Gender"}
              isError={!!(touched["gender"] && errors["gender"])}
              error={errors["gender"]}
              isRequired={true}
              options={Gender}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              control="select"
              id="maritalStatus"
              name="maritalStatus"
              value={maritalStatus}
              label={MARITAL_STATUS}
              isError={!!(touched["maritalStatus"] && errors["maritalStatus"])}
              selectInputError={errors["maritalStatus"]}
              placeholder={"Select"}
              options={MaritalStatusOptions}
              isRequired={false}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              control="select"
              name="timezone"
              value={timezone || ""}
              label={"Time Zone"}
              placeholder={"Select Time Zone"}
              options={AppointmentTimeZones}
              isRequired={false}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <CustomFormLabel label={LANUAGE} />
            <Autocomplete
              sx={{
                ...multiSelectDropDown,
              }}
              multiple
              limitTags={2}
              id="tags-standard"
              options={LanguageOptions || []}
              value={languages || []}
              getOptionLabel={(option: any) => option?.name}
              disableCloseOnSelect
              onChange={(_, values) => {
                setFieldValue("languages", values);
              }}
              renderOption={(props, option: any) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{ justifyContent: "space-between" }}
                  {...props}
                >
                  {option?.name}
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField
                  classes={{ root: styles.customTextField }}
                  {...params}
                  variant="outlined"
                  placeholder={
                    languages && languages.length > 0 ? "" : "Select Language"
                  }
                />
              )}
            />
            {/* <FormInput
              // control="autocomplete"
              // id="language"
              // name="language"
              // value={language || ''}
              // label={LANUAGE}
              // placeholder={'Select Language'}
              // options={LanguageOptions || []}
              // isRequired={false}
              // onChange={handleChange}

            /> */}
          </Grid>
          <Grid>
            <FormInput
              id="ssn"
              name="ssn"
              value={ssn || ""}
              label={"SSN"}
              placeholder={"Enter SSN"}
              isRequired={false}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <FormInput
              control="select"
              id="race"
              name="race"
              value={race}
              label={"Race"}
              placeholder={"Enter Race"}
              isRequired={false}
              options={Race}
              onChange={handleChange}
            />
          </Grid>
          {isNavalaCare() && (
            <Grid>
              <FormInput
                control="select"
                id="ethnicity"
                name="ethnicity"
                value={ethnicity}
                label={"Ethnicity"}
                placeholder={"Select Ethnicity"}
                options={Ethnicity}
                isRequired={false}
                onChange={handleChange}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PatientDetails;

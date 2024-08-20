import { Grid, InputBase, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { patientStyle } from "./style/commonStyle";

function Demographics() {
  const classes = patientStyle();
  const [patientDetailsData, setPatientDetailsData] = useState({
    legalLastName: "",
    legalFirstName: "",
    firstNameUsed: "",
    middleName: "",
    dateofbirth: "",
    gender: "",
    maritalStatus: "",
    ssn: "",
    language: "",
    ethnicity: "",
    race: "",
  });
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPatientDetailsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setPatientDetailsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const genderOptions = ["Female", "Male", "Other"];
  const maritalStatusOptions = ["Married", "Single", "Divorced", "Widowed"];
  const languageOptions = ["English", "Other"];
  const ethnicityOptions = ["African American", "Asian", "Asian Indian"];
  const raceOptions = ["African American", "Asian", "Asian Indian"];
  return (
    <div>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{ fontWeight: "700" }}>Demographics</Typography>
      </Grid>
      <Grid container sx={{ marginTop: "20px !important" }}>
        <Grid item className={classes.GridDiv}>
          <Grid container sx={{justifyContent: "space-between"}}>
            <Grid item sx={{ width: "23%" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#1A1A1A !important",
                }}
              >
                Legal Last Name
              </Typography>

              <InputBase
                value={patientDetailsData.legalLastName}
                fullWidth
                placeholder="Enter legal last name"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item sx={{ width: "23%" }}>
              <Typography variant="h4" className={classes.label}>
                Legal First Name
              </Typography>

              <InputBase
                value={patientDetailsData.legalFirstName}
                fullWidth
                placeholder="Enter legal first name"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item sx={{ width: "23%" }}>
              <Typography variant="h4" className={classes.label}>
                First Name Used
              </Typography>

              <InputBase
                value={patientDetailsData.firstNameUsed}
                fullWidth
                placeholder="Enter legal last name"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item sx={{ width: "23%" }}>
              <Typography variant="h4" className={classes.label}>
                Middle Name
              </Typography>

              <InputBase
                value={patientDetailsData.middleName}
                fullWidth
                placeholder="Enter middle name"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.GridDiv}>
          <Grid container sx={{ marginTop: "20px !important" ,justifyContent: "space-between"}}>
            <Grid item sx={{width:"23%"}} >
              <Typography variant="h4" className={classes.label}>
                Date of Birth
              </Typography>

              <InputBase
                value={patientDetailsData.dateofbirth}
                fullWidth
                placeholder="Choose Date"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item sx={{width:"23%"}}>
              <Typography variant="h4" className={classes.label}>
                Gender
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patientDetailsData.gender}
                name="gender"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography variant="h5" className={classes.label}>
                          Select Gender
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {genderOptions.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item sx={{width:"23%"}}>
              <Typography variant="h4" className={classes.label}>
                Marital Status
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patientDetailsData.maritalStatus}
                name="maritalStatus"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography variant="h5" className={classes.label}>
                          Select Status
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {maritalStatusOptions.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item sx={{width:"23%"}}>
              {" "}
              <Typography variant="h4" className={classes.label}>
                SSN
              </Typography>
              <InputBase
                value={patientDetailsData.ssn}
                fullWidth
                placeholder="Choose Date "
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
           
          </Grid>
        </Grid>
        <Grid item className={classes.GridDiv}>
          <Grid container sx={{ marginTop: "20px !important" }} columnGap={4}>
          <Grid item sx={{width:"23%"}} >
              <Typography variant="h4" className={classes.label}>
                Language
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patientDetailsData.language}
                name="language"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Language
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {languageOptions.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item sx={{width:"23%"}}>
              <Typography
                variant="h4"
                className={classes.label}
                sx={{
                  // marginTop: "20px !important",
                }}
              >
                Ethnicity
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patientDetailsData.ethnicity}
                name="ethnicity"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Ethnicity
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {ethnicityOptions.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item sx={{width:"23%"}}>
              <Typography
                variant="h4"
                className={classes.label}
                sx={{
                  // marginTop: "20px !important",
                }}
              >
                Race
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={patientDetailsData.race}
                name="race"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Race
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {raceOptions.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Demographics;

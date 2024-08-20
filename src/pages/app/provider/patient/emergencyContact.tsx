import { Grid, InputBase, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { patientStyle } from "./style/commonStyle";

function EmergencyContact() {
  const classes = patientStyle();
  const [emergencyContactData, setEmergencyContactData] = useState({
    relationshipWithPatient: "",
    lastName: "",
    firstName: "",
    contactNumber: "",
    email: "",
  });
  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setEmergencyContactData((prevData) => ({
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
  const relationshipWithPatientOptions = ["Spouse", "Child", "Grandchild"];
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEmergencyContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <Grid>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{fontWeight:"700"}}>Emergency Contact Details</Typography>
      </Grid>
        <Grid container sx={{ marginTop: "20px !important" }} className={classes.GridDiv}>
          <Grid item sx={{ width: "23%" }}>
            <Typography
              variant="h4"
              className={classes.label}
            >
              Relationship with Patient
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={emergencyContactData.relationshipWithPatient}
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
                        Select Relationship with Patient
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {relationshipWithPatientOptions.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item sx={{ width: "23%" }}>
            <Typography
              variant="h4"
              className={classes.label}
            >
              Last Name
            </Typography>

            <InputBase
              value={emergencyContactData.lastName}
              fullWidth
              placeholder="Enter LastName"
              classes={{
                root: classes.inputField,
                input: classes.inputBoxText,
                focused: classes.inputBoxActive,
              }}
              onChange={(e: any) => inputData(e)}
            />
          </Grid>
          <Grid item sx={{ width: "23%" }}>
            <Typography
              variant="h4"
              className={classes.label}
            >
              First Name
            </Typography>

            <InputBase
              value={emergencyContactData.firstName}
              fullWidth
              placeholder="Enter FirstName"
              classes={{
                root: classes.inputField,
                input: classes.inputBoxText,
                focused: classes.inputBoxActive,
              }}
              onChange={(e: any) => inputData(e)}
            />
          </Grid>
          <Grid item sx={{ width: "23%" }}>
            <Typography
              variant="h4"
              className={classes.label}
              sx={{
                // marginTop: "20px !important",
              }}
            >
              Contact Number
            </Typography>

            <InputBase
              value={emergencyContactData.contactNumber}
              fullWidth
              placeholder="Enter Contact"
              classes={{
                root: classes.inputField,
                input: classes.inputBoxText,
                focused: classes.inputBoxActive,
              }}
              onChange={(e: any) => inputData(e)}
            />
          </Grid>
          <Grid item sx={{ width: "23%"}}>
            <Typography
              variant="h4"
              className={classes.label}
              sx={{
                marginTop: "20px !important",
              }}
            >
              Email
            </Typography>
            <InputBase
              value={emergencyContactData.email}
              fullWidth
              placeholder="Enter Email"
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
    </div>
  );
}

export default EmergencyContact;

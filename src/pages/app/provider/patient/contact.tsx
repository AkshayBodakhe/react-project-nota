import { Grid, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import { patientStyle } from "./style/commonStyle";

function Contact() {
  const classes = patientStyle();
  const [contactInformationData, setContactInformationData] = useState({
    contactNumber: "",
    email: "",
    faxNumber: "",
  });
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setContactInformationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{fontWeight:"700"}}>Contact Details</Typography>
      </Grid>
      <Grid container sx={{ marginTop: "20px" }} columnGap={3}>
        <Grid item xs={3}>
          <Typography
            variant="h4"
            className={classes.label}
          >
            Contact Number
          </Typography>

          <InputBase
            value={contactInformationData.contactNumber}
            fullWidth
            placeholder="Enter Contact Number"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h4"
            className={classes.label}
          >
            Email
          </Typography>

          <InputBase
            value={contactInformationData.email}
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
        <Grid item xs={3}>
          <Typography
            variant="h4"
            className={classes.label}
          >
            Fax Number
          </Typography>

          <InputBase
            value={contactInformationData.faxNumber}
            fullWidth
            placeholder="Enter Fax Number"
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => inputData(e)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Contact;

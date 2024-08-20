import { Grid, InputBase, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { patientStyle } from "./style/commonStyle";

function Address() {
  const classes = patientStyle();
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
  const [contactInformationData, setContactInformationData] = useState({
    addressLine: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
  });
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setContactInformationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setContactInformationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const countryOptions = ["Africa", "Asia", "India"];
  const stateOptions = ["Maharashtra", "Gujarat"];
  
  return (
    <div>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{fontWeight:"700"}}>Address Details</Typography>
      </Grid>
      <Grid container sx={{ marginTop: "20px" ,justifyContent:"space-between"}} className={classes.GridDiv}>
        <Grid item xs={3}>
          <Typography
            className={classes.label}
            variant="h4"
            sx={{
            //   marginTop: "20px !important",
            }}
          >
            Address
          </Typography>

          <InputBase
            value={contactInformationData.addressLine}
            fullWidth
            placeholder="Enter Address"
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
            sx={{
            //   marginTop: "20px !important",
            }}
          >
            City
          </Typography>

          <InputBase
            value={contactInformationData.city}
            fullWidth
            placeholder="Enter City"
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
            sx={{
            //   marginTop: "20px !important",
            }}
          >
            Zipcode
          </Typography>

          <InputBase
            value={contactInformationData.zipcode}
            fullWidth
            placeholder="Enter City !important"
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
            sx={{
              // marginTop: "20px !important",
            }}
          >
            Country
          </Typography>
          <Select
            className={classes.selectInputStyle}
            value={contactInformationData.country}
            name="country"
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
                      Select Country
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {countryOptions.map((data) => {
              return (
                <MenuItem value={data} className={classes.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item sx={{ width: "23%"}} mt={4}>
          <Typography
            variant="h4"
            className={classes.label}
            sx={{
              // marginTop: "20px !important",
            }}
          >
            State
          </Typography>
          <Select
            className={classes.selectInputStyle}
            value={contactInformationData.state}
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
                      Select State
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {stateOptions.map((data) => {
              return (
                <MenuItem value={data} className={classes.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

export default Address;

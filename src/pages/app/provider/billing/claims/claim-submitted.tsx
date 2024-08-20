// import React from 'react'

import {
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { providerConstants } from "../../../../../constants/provider";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { formButtonStyle } from "../../../../../styles/common";

export const claimSubmittedStyle = makeStyles(() => ({
  main: {
    padding: "20px",
  },
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
  },
  container: {
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    background: "#fff",
    color: "#1A1A1A !important",
    marginTop: "15px",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    border: "none",
    "& fieldset": { border: "none" },
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
  },
  iconButton: {
    padding: "10px",
  },
  mainDivGrid: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  divGrid: {
    display: "flex",
    width: "70%",
    flexWrap: "wrap",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "end",
    width: "30%",
    gap: "15px",
    flexWrap: "wrap",
  },
}));

function ClaimSubmitted() {
  const classes = claimSubmittedStyle();
  const {PROCESS_SECONDARY_CLAIM} = providerConstants;
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
  const [allBillsData, setAllBillsData] = useState({
    primaryProvider: "",
    primaryLocation: "",
    registrationDate: "",
  });

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setAllBillsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const status = ["All", "Pending For Claim", "Submitted"];
  const provider = ["provider1", "Provider2", "Provider3"];
  const ServiceId = ["1234", "1268", "8576"];
  const ServiceType = ["All", "Pending For Claim", "Submitted"];
//   const claimStatus = ["in-progress", "submitted"];
//   const billingStatus = ["in-progress", "submitted"];
  return (
    <Grid className={classes.container}>
      <Grid className={classes.main}>
        <Grid container spacing={1.5} className={classes.mainDivGrid}>
          <Grid item xs={2.4}>
            <Typography variant="h4" className={classes.label}>
              Search By Patient
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Search Patient"
              />
              <IconButton
                type="button"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h4" className={classes.label}>
              Search By Status
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
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
                        Status
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {status.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h4" className={classes.label}>
              Service Type
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
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
                        Select Service
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {ServiceType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h4" className={classes.label}>
              Provider
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
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
                        Select Provider
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {provider.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h4" className={classes.label}>
              Serive Id
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
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
                        Select
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {ServiceId.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <Grid className={classes.mainDivGrid} mt={3}>
          <Grid container spacing={1.5}>
            <Grid item xs={2.4}>
              <Typography variant="h4" className={classes.label}>
                Search By To-From Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose Date"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    width: "100%",
                    "& fieldset": { border: "none" },
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                    "& label": {
                      color: "#1A1A1A80 !important",
                      fontSize: "14px !important",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={9.6}>
              <Typography variant="h4" className={classes.label}>
                &#x200B;
              </Typography>
              <Grid justifyContent="end" container gap="2%">
                <ButtonBase sx={{...formButtonStyle.applyButtonStyle ,width:"20%"}}>
                {PROCESS_SECONDARY_CLAIM}
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ClaimSubmitted;

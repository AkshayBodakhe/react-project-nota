/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Grid, Typography, Select, InputBase, MenuItem } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";

const relationshipWithPolicyHolderOptions = [
  "Spouse",
  "Child",
  "Grandchild",
  "Self",
];

const genderOptions = ["Female", "Male"];
const stateOptions = ["NY - New York", "NJ - New Jersey"];
const insuranceTypeOptions = [
  "Primary Insurance",
  "Secondary Insurance",
  "Other",
];
const insurancePayerOptions = [
  "21st Century Health and Benefits",
  "Abrazo Advantage Health Plan",
  "ADOC (Affiliated Doctor's of Orange County)",
  "Alaska Pipe Trades Local 375",
  "Allegiance Benefit Plan Management, Inc.",
  "AKM Medical Group",
  "Allied Health - Podiatry (UHIN)",
  "American Imaging Management, Inc.",
  "Blue Cross Blue Shield of Nevada",
  "Cedars-Sinai Medical Network Services",
  "Other",
];
export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  height: "42px !important",
  width: "100%",
};

export const inputBase = makeStyles(() => ({
  inputField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    marginTop: "10px",
  },
  inputBoxText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #0097F002 !important`,
    border: `2px solid #004186 !important`,
    borderRadius: "4px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    border: "none",
    "& fieldset": { border: "none" },
    height: "42px !important",
    width: "100%",
    marginTop: "10px",
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  dropZone: {
    minHeight: "150px !important",
    width: "350px !important",
    height: "200px !important",
    borderRadius: "20px",
    backgroundColor: "#F1F1F1",
    border: "2px solid #00000029",
  },
  uploadIcon: {
    fill: "#2879C9",
  },
  textUploadZone: {
    color: "#1A1A1ACC !important",
    fontSize: "18px !important",
    marginTop: "24px",
    marginBottom: "24px",
  },
}));

const AddInsuranceContent = () => {
  const classes = inputBase();
  const [insuranceData, setInsuranceData] = useState({
    insuranceType: "",
    insurancePayer: "",
    memberId: "",
    planId: "",
    groupId: "",
    groupName: "",
    expiryDate: "",
    copayAmount: "",
    payerPhoneNumber: "",
    payerFaxNumber: "",
    relationshipWithPolicyHolder: "Self",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

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
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInsuranceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setInsuranceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Grid container>
      <Grid item xs={12} mt={3}>
        <Grid container columnGap={2}>
          <Grid item xs={3.7}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold !important",
                color: "#1A1A1A !important",
              }}
            >
              Insurance Type
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={insuranceData.insuranceType}
              name="insuranceType"
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
              {insuranceTypeOptions.map((data) => {
                return (
                  <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>

          <Grid item xs={7.6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold !important",
                color: "#1A1A1A !important",
              }}
            >
              Insurance Payer
            </Typography>

            <Select
              className={classes.selectInputStyle}
              value={insuranceData.insurancePayer}
              name="insurancePayer"
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
                        Select Payer
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {insurancePayerOptions.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Grid container columnGap={2}>
              <Grid item xs={3.7}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold !important",
                    color: "#1A1A1A !important",
                    marginTop: "20px !important",
                  }}
                >
                  Member ID
                </Typography>

                <InputBase
                  value={insuranceData.memberId}
                  fullWidth
                  name="memberId"
                  placeholder="Enter Member ID"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={3.7}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold !important",
                    color: "#1A1A1A !important",
                    marginTop: "20px !important",
                  }}
                >
                  Plan ID
                </Typography>

                <InputBase
                  value={insuranceData.planId}
                  fullWidth
                  name="planId"
                  placeholder="Enter Plan ID"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={3.7}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold !important",
                    color: "#1A1A1A !important",
                    marginTop: "20px !important",
                  }}
                >
                  Group ID
                </Typography>

                <InputBase
                  value={insuranceData.groupId}
                  fullWidth
                  name="groupId"
                  placeholder="Enter Group ID"
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
          <Grid item xs={3.7}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold !important",
                color: "#1A1A1A !important",
                marginTop: "20px !important",
              }}
            >
              Group Name
            </Typography>

            <InputBase
              value={insuranceData.groupName}
              fullWidth
              name="groupName"
              placeholder="Enter Group Name"
              classes={{
                root: classes.inputField,
                input: classes.inputBoxText,
                focused: classes.inputBoxActive,
              }}
              onChange={(e: any) => inputData(e)}
            />
          </Grid>
          <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold !important",
                color: "#1A1A1A  !important",
              }}
            >
              Expiry Date
            </Typography>

            <InputBase
              value={insuranceData.expiryDate}
              fullWidth
              placeholder="Enter Expiry Date"
              classes={{
                root: classes.inputField,
                input: classes.inputBoxText,
                focused: classes.inputBoxActive,
              }}
              onChange={(e: any) => inputData(e)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container columnGap={2}>
            <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold !important",
                  color: "#1A1A1A  !important",
                }}
              >
                Copay Amount
              </Typography>

              <InputBase
                value={insuranceData.copayAmount}
                fullWidth
                name="copayAmount"
                placeholder="Enter Amount"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item xs={3.7}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold  !important",
                  color: "#1A1A1A  !important",
                  marginTop: "20px  !important",
                }}
              >
                Payer Phone Number
              </Typography>

              <InputBase
                value={insuranceData.payerPhoneNumber}
                fullWidth
                name="payerPhoneNumber"
                placeholder="Enter Payer Phone Number"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item xs={3.7}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold  !important",
                  color: "#1A1A1A  !important",
                  marginTop: "20px  !important",
                }}
              >
                Payer Fax Number
              </Typography>

              <InputBase
                value={insuranceData.payerFaxNumber}
                fullWidth
                name="payerFaxNumber"
                placeholder="Enter Payer Fax Number"
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
        <Grid item xs={12}>
          <Grid container columnGap={3}>
            <Grid item xs={3.7} sx={{ marginTop: "20px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold  !important",
                  color: "#1A1A1A  !important",
                }}
              >
                Relationship With Policy Holder
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={insuranceData.relationshipWithPolicyHolder}
                name="relationshipWithPolicyHolder"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80  !important",
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
                {relationshipWithPolicyHolderOptions.map((data) => {
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
            {insuranceData.relationshipWithPolicyHolder !== "Self" && (
              <>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    First Name
                  </Typography>

                  <InputBase
                    value={insuranceData.firstName}
                    fullWidth
                    name="firstName"
                    placeholder="Enter First Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    Last Name
                  </Typography>

                  <InputBase
                    value={insuranceData.lastName}
                    name="lastName"
                    fullWidth
                    placeholder="Enter Last Name"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    DOB
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Choose Date"
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold  !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    Gender
                  </Typography>
                  <Select
                    className={classes.selectInputStyle}
                    value={insuranceData.gender}
                    name="gender"
                    onChange={(e: any) => handleSelectOption(e)}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80  !important",
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
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    SSN
                  </Typography>

                  <InputBase
                    value={insuranceData.ssn}
                    fullWidth
                    name="ssn"
                    placeholder="Enter SSN Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    Address
                  </Typography>

                  <InputBase
                    value={insuranceData.address}
                    fullWidth
                    name="address"
                    placeholder="Enter Address Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    City
                  </Typography>

                  <InputBase
                    value={insuranceData.city}
                    fullWidth
                    name="city"
                    placeholder="Enter City"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold  !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    State
                  </Typography>
                  <Select
                    className={classes.selectInputStyle}
                    value={insuranceData.state}
                    name="state"
                    onChange={(e: any) => handleSelectOption(e)}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80  !important",
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
                    {stateOptions.map((data) => {
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
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    Country
                  </Typography>

                  <InputBase
                    value={insuranceData.country}
                    fullWidth
                    name="country"
                    placeholder="Enter Country"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={3.7} sx={{ marginTop: "20px  !important" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold !important",
                      color: "#1A1A1A  !important",
                    }}
                  >
                    Zip
                  </Typography>

                  <InputBase
                    value={insuranceData.zip}
                    fullWidth
                    name="zip"
                    placeholder="Enter Zip"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid container mt={1}>
            <Grid item xs={12} mb={2}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold  !important",
                  color: "#1A1A1A  !important",
                  marginTop: "20px  !important",
                }}
              >
                Upload Insurance Card
              </Typography>
            </Grid>
            <Grid item xs={4} lg={5.2} mt={1}>
              <DropzoneArea
                showPreviewsInDropzone={true}
                showPreviews={true}
                dropzoneText=" Click here to upload from Front Side Drag & Drop files Or Browse Files"
                onChange={(_files: any) => {}}
                classes={{
                  root: classes.dropZone,
                  icon: classes.uploadIcon,
                  text: classes.textUploadZone,
                }}
              />
            </Grid>
            <Grid item xs={4} lg={5.2} mt={1}>
              <DropzoneArea
                showPreviewsInDropzone={true}
                showPreviews={true}
                dropzoneText=" Click here to upload from Back Side Drag & Drop files Or Browse Files"
                classes={{
                  root: classes.dropZone,
                  icon: classes.uploadIcon,
                  text: classes.textUploadZone,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddInsuranceContent;

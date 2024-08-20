/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  ButtonBase,
  Grid,
  InputBase,
  Modal,
  Select,
  Typography,
  MenuItem,
  Checkbox,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { makeStyles, styled } from "@mui/styles";
import PatientImage from "../../../../../../../../assets/other/PatientImage.png";
import CustomFormLabel from "../../../../../../../../components/common/custom-form-label";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const editDemograpgicsStyles = makeStyles(() => ({
  providerTextAreaField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    size: "small",
    textAlign: "center",
    padding: "10px 0px 10px 10px !important",
    fontSize: "16px",
    minHeight: "81px",
  },
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
  checkBoxText: {
    fontWeight: "bold !important",
    color: "#1A1A1A80",
  },
  checkBoxGrid: {
    display: "flex",
    marginTop: "5px !important ",
  },
  checkBoxItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  checkBoxColor: {
    color: "#004186 !important",
  },
}));

const StyledDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  "& .MuiInputBase-input": {
    padding: "10px !important",
  },
  "& .Mui-focused": {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #00418602 !important`,
    border: `1px solid #004186 !important`,
    borderRadius: "4px !important",
  },
}));
interface EditDemographicsModalProps {
  open: boolean;
  onClose: () => void;
  onEventSuccessModalOpen: () => void;
}

const EditDemographicsModal: React.FC<EditDemographicsModalProps> = ({
  open,
  onClose,
  onEventSuccessModalOpen,
}) => {
  const classes = editDemograpgicsStyles();
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
  const languageOptions = ["English", "Other"];
  const maritalStatusOptions = ["Married", "Single", "Divorced", "Widowed"];
  const ethnicityOptions = ["African American", "Asian", "Asian Indian"];
  const raceOptions = ["African American", "Asian", "Asian Indian"];
  const countryOptions = ["Africa", "Asia", "India"];
  const stateOptions = ["Maharashtra", "Gujarat"];
  const relationshipWithPatientOptions = ["Spouse", "Child", "Grandchild"];
  const privacy = [
    { id: "1", name: "Consent To Email", checked: "true" },
    { id: "2", name: "Consent To Call", checked: "true" },
    { id: "3", name: "Consent To Message", checked: "true" },
  ];
  const [editDemographicsData, setEditDemographicsData] = useState({
    legalLastName: "",
    legalFirstName: "",
    middleName: "",
    dateofbirth: "",
    gender: "",
    ssn: "",
    language: "",
    maritalstatus: "",
    ethnicity: "",
    race: "",
    phonenumber: "",
    emailId: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    relationshipwithpatient: "",
    name: "",
    contactnumber: "",
    email: "",
    primaryprovider: "",
    prefferedpharmacy: "",
    prefferedlabs: "",
    prefferedradiology: "",
  });

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setEditDemographicsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditDemographicsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onEventSuccessModalOpen();
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Grid
          container
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 5,
            height: "80%",
            overflowY: "hidden",
          }}
        >
          <Grid item xs={12} pr={3} sx={{ overflowY: "scroll", height: "90%" }}>
            <Grid container>
              <Grid item xs={11}>
                <Typography variant="h1" sx={{ fontWeight: "bold" }}>
                  Edit Demographics
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ButtonBase onClick={onClose}>
                  <CloseOutlinedIcon />
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid container pt={3}>
              <Grid item xs={2}>
                <img
                  src={PatientImage}
                  style={{
                    width: "100% !important",
                    height: "100% !important",
                  }}
                />
                <ButtonBase
                  sx={{
                    height: "30px",
                    width: "80px",
                    borderRadius: "5px",
                    backgroundColor: "#CCECFF80",
                    border: "2px solid #004186 !important",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#004186",
                      fontWeight: "bold",
                    }}
                  >
                    Change
                  </Typography>
                </ButtonBase>
              </Grid>
              <Grid item xs={10}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CustomFormLabel label="Legal Last Name" />
                    <InputBase
                      value={editDemographicsData?.legalLastName}
                      name="legalLastName"
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
                  <Grid item xs={4}>
                    <CustomFormLabel label="Legal First Name" />
                    <InputBase
                      value={editDemographicsData.legalFirstName}
                      fullWidth
                      name="legalFirstName"
                      placeholder="Enter legal first name"
                      classes={{
                        root: classes.inputField,
                        input: classes.inputBoxText,
                        focused: classes.inputBoxActive,
                      }}
                      onChange={(e: any) => inputData(e)}
                    />
                  </Grid>
                  <Grid item xs={4} columnGap={2}>
                    <CustomFormLabel label="Middle Name,Suffix" />
                    <InputBase
                      value={editDemographicsData.middleName}
                      fullWidth
                      name="middleName"
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
                <Grid container spacing={2} pt={3}>
                  <Grid item xs={4}>
                    <CustomFormLabel label="DOB" />
                    <Grid mt={2}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDatePicker
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "10px !important",
                              width: "13.5rem",
                              fontSize: "0.8rem",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <CustomFormLabel label="Gender" />
                    <Select
                      className={classes.selectInputStyle}
                      value={editDemographicsData.gender}
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
                  <Grid item xs={4} columnGap={2}>
                    <CustomFormLabel label="SSN" />
                    <InputBase
                      value={editDemographicsData.ssn}
                      fullWidth
                      name="ssn"
                      placeholder="Enter SSN"
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

              <Grid container spacing={2} pt={2}>
                <Grid item xs={4}>
                  <CustomFormLabel label="Languages" />
                  <Select
                    className={classes.selectInputStyle}
                    value={editDemographicsData.language}
                    name="language"
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
                <Grid item xs={4}>
                  <CustomFormLabel label="Marital Status" />
                  <Select
                    className={classes.selectInputStyle}
                    value={editDemographicsData.maritalstatus}
                    name="maritalstatus"
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
                <Grid item xs={4} columnGap={2}>
                  <CustomFormLabel label="Ethnicity" />
                  <Select
                    className={classes.selectInputStyle}
                    value={editDemographicsData.ethnicity}
                    name="ethnicity"
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
              </Grid>

              <Grid container spacing={2} pt={2}>
                <Grid item xs={4}>
                  <CustomFormLabel label="Race" />
                  <Select
                    className={classes.selectInputStyle}
                    value={editDemographicsData.race}
                    name="race"
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
                <Grid item xs={4}>
                  <CustomFormLabel label="Phone Number" />
                  <InputBase
                    value={editDemographicsData.phonenumber}
                    fullWidth
                    name="phonenumber"
                    placeholder="Enter Phone Number"
                    classes={{
                      root: classes.inputField,
                      input: classes.inputBoxText,
                      focused: classes.inputBoxActive,
                    }}
                    onChange={(e: any) => inputData(e)}
                  />
                </Grid>
                <Grid item xs={4} columnGap={2}>
                  <CustomFormLabel label="Email ID" />
                  <InputBase
                    value={editDemographicsData.emailId}
                    fullWidth
                    name="emailId"
                    placeholder="Enter Email ID"
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
            <Grid container pt={2}>
              <Typography sx={{ color: "#004186", fontWeight: "bold" }}>
                Address
              </Typography>
            </Grid>

            <Grid container spacing={2} pt={2}>
              <Grid item xs={4}>
                <CustomFormLabel label="Address Line 1" />
                <InputBase
                  value={editDemographicsData.addressline1}
                  fullWidth
                  name="addressline1"
                  placeholder="Enter Address Line 1"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomFormLabel label="Address Line 2" />
                <InputBase
                  value={editDemographicsData.addressline2}
                  fullWidth
                  name="addressline2"
                  placeholder="Enter Address Line 2"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={4} columnGap={2}>
                <CustomFormLabel label="City" />
                <InputBase
                  value={editDemographicsData.city}
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
            </Grid>
            <Grid container spacing={2} pt={2}>
              <Grid item xs={4}>
                <CustomFormLabel label="State" />
                <Select
                  className={classes.selectInputStyle}
                  value={editDemographicsData.state}
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
              <Grid item xs={4}>
                <CustomFormLabel label="Country" />
                <Select
                  className={classes.selectInputStyle}
                  value={editDemographicsData.country}
                  name="country"
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
              <Grid item xs={4} columnGap={2}>
                <CustomFormLabel label="Zip Code" />
                <InputBase
                  value={editDemographicsData.zipcode}
                  name="zipcode"
                  fullWidth
                  placeholder="Enter Zipcode"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
            </Grid>
            <Grid container pt={2}>
              <Typography sx={{ color: "#004186", fontWeight: "bold" }}>
                Emergency Contact Details
              </Typography>
            </Grid>
            <Grid container spacing={2} pt={2}>
              <Grid item xs={4}>
                <CustomFormLabel label="Relationship With Patient" />
                <Select
                  className={classes.selectInputStyle}
                  value={editDemographicsData.relationshipwithpatient}
                  name="relationshipwithpatient"
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
                  {relationshipWithPatientOptions.map((data) => {
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
              <Grid item xs={4}>
                <CustomFormLabel label="Name" />
                <InputBase
                  value={editDemographicsData.name}
                  fullWidth
                  placeholder="Enter Name"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={4} columnGap={2}>
                <CustomFormLabel label="Contact Number" />
                <InputBase
                  value={editDemographicsData.contactnumber}
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
            </Grid>
            <Grid container spacing={2} pt={2}>
              <Grid item xs={4}>
                <CustomFormLabel label="Email" />
                <InputBase
                  value={editDemographicsData.email}
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
            <Grid container pt={2}>
              <Typography sx={{ color: "#004186", fontWeight: "bold" }}>
                Preferences
              </Typography>
            </Grid>
            <Grid container spacing={2} pt={2}>
              <Grid item xs={4}>
                <CustomFormLabel label="Preferred Pharmacy" />
                <InputBase
                  value={editDemographicsData.prefferedpharmacy}
                  fullWidth
                  placeholder="Search & Select Pharmacy"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomFormLabel label="Preferred Labs" />
                <InputBase
                  value={editDemographicsData.prefferedlabs}
                  fullWidth
                  placeholder="Search & Select Labs"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomFormLabel label="Preferred Radiology" />
                <InputBase
                  value={editDemographicsData.prefferedradiology}
                  fullWidth
                  placeholder="Search & Select Radiology"
                  classes={{
                    root: classes.inputField,
                    input: classes.inputBoxText,
                    focused: classes.inputBoxActive,
                  }}
                  onChange={(e: any) => inputData(e)}
                />
              </Grid>
            </Grid>
            <Grid container pt={2}>
              <Typography sx={{ color: "#004186", fontWeight: "bold" }}>
                Privacy
              </Typography>
            </Grid>
            <Grid item lg={12} className={classes.checkBoxGrid}>
              {privacy.map((item) => {
                return (
                  <Grid item lg={3} className={classes.checkBoxItem}>
                    <Typography variant="h5" className={classes.checkBoxText}>
                      {item.name}
                    </Typography>
                    <Checkbox
                      classes={{
                        checked: classes.checkBoxColor,
                        root: classes.checkBoxColor,
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid container columnGap={3} mr={3}>
            <Grid
              item
              xs={12}
              pt={3}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ButtonBase
                sx={{
                  background: "#004186",
                  height: 35,
                  width: 70,
                  padding: "12px",
                  borderRadius: "5px",
                }}
                onClick={handleSubmit}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Save
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default EditDemographicsModal;

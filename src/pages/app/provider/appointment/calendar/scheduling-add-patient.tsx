import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "../../referral/style/common-style";
import { Formik } from "formik";
import { patientStyle } from "../../patient/style/commonStyle";
import { Patient } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formButtonStyle } from "../../../../../styles/common";

interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
}

function SchedulingAddPatient(props: Props) {
  const { onClose, open, title } = props;
  const commonStyle = style();
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
  const [patientData, setPatientData] = useState<any>({
    firstName: "",
    middlename: "",
    lastName: "",
    dob: null,
    gender: "",
    emailId: "",
    mobNo: "",
    emergencyContactNo: "",
  });

  const [genderOptions, setGenderOptions] = useState<string[] | null>(null);

  useEffect(() => {
    const genderValues = Object.values(Patient.gender) as string[];
    setGenderOptions(genderValues);
  }, []);

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPatientData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectedOption = (e: any) => {
    const { value, name } = e.target;
    setPatientData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleChange = (date: any) => {};

  const handleFormSubmit = () => {};

  const close = () => {
    onClose();
  };
  return (
    <div>
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
        <DialogTitle sx={{ padding: "10px 10px 0px 10px!important" }}>
          <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold" }}
                sx={{ padding: "10px 10px 0px 10px!important" }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={close} />
            </Grid>
          </Grid>
        </DialogTitle>
        <Formik
          initialValues={patientData}
          // validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleFormSubmit}
        >
          {({
            handleSubmit,
            values,
            // touched,
            // errors,
            // isSubmitting,
            // isValid,
            // setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText
                  id="scroll-dialog-description"
                  // ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        First Name
                      </Typography>

                      <InputBase
                        value={values.firstName}
                        name="firstName"
                        fullWidth
                        placeholder="Enter first name"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        Middle Name
                      </Typography>

                      <InputBase
                        value={values.middlename}
                        name="middlename"
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
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        Last Name
                      </Typography>
                      <InputBase
                        value={values.lastName}
                        name="lastName"
                        fullWidth
                        placeholder="Enter last name"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        Email Id
                      </Typography>
                      <InputBase
                        value={values.emailId}
                        name="emailId"
                        fullWidth
                        placeholder="Enter Email Id"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        Mobile Number
                      </Typography>
                      <InputBase
                        value={values.mobNo}
                        name="mobNo"
                        fullWidth
                        placeholder="Enter Mobile Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        Emergency Contact Number
                      </Typography>
                      <InputBase
                        value={values.emergencyContactNo}
                        name="emergencyContactNo"
                        fullWidth
                        placeholder="Enter Emergency Contact Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label} sx={{marginBottom:"10px"}}>
                        Date Of Birth
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
                    <Grid item xs={4}>
                      <Typography variant="h4" className={classes.label}>
                        Gender
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={values.gender}
                        name="gender"
                        onChange={(e: any) => handleSelectedOption(e)}
                        renderValue={(selected) => {
                          if (!selected) {
                            return (
                              <span>
                                <Typography
                                  variant="h5"
                                  className={classes.label}
                                >
                                  Select Gender
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {genderOptions?.map((data) => {
                          return (
                            <MenuItem
                              key={data}
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
                </DialogContentText>
                <Grid className={commonStyle.footer}>
                  <Grid className={commonStyle.footerBtn}>
                    <ButtonBase
                      sx={formButtonStyle.saveButtonStyle}
                      type="submit"
                    >
                      Add
                    </ButtonBase>
                  </Grid>
                </Grid>
              </DialogContent>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default SchedulingAddPatient;

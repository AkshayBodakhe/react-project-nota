import { Box, ButtonBase, Drawer, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Form from "../../../common/molecule/Form";
import FormInput from "../../atom/FormInput";
import * as Yup from "yup";
import React, { useState } from "react";
import { DrawerButton, TitleComponent } from "../Drawer/DrawerTitle";
import {
  VideocamOutlined,
  FmdGoodOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import Label from "../../atom/Label";

const drawerStyle = makeStyles(() => ({
  heading: {
    justifyContent: "space-between",
    // padding: "12px",
    width: "100%",
    background: "#ffffff 0% 0% no-repeat padding-box !important",
    overflow: "scroll",
    paddingTop: "35px",
    paddingBottom: "35px",
  },
  patientButton: {
    display: "flex",
    backgroundColor: "#DAEAF8 !important",
    textTransform: "initial",
    fontSize: "14px",
    color: "#36588C !important",
    padding: "6px 16px !important",
    borderRadius: "4px !important",
    width: "100%",
  },
  buttonIcon: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "10px",
    fontSize: "50px",
    //opacity: 0.7
  },
  switchOuterContainer: { display: "flex", justifyContent: "flex-start" },
  switchContainer: {
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const sxs = {
  activeSwitch: {
    border: "1px solid #36588C",
    borderRadius: "20px",
    padding: "5px 10px",
    color: "#36588C",
  },
  inActiveSwitch: { padding: "5px 10px" },
};

const providerNames = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];
const EnrollmentTypes = [
  {
    id: 1,
    label: "Follow Up",
    value: "followUp",
  },
  {
    id: 2,
    label: "New Appointment",
    value: "new",
  },
];

const ScheduleNewAppointment = ({ open, handleClose }: any) => {
  const classes = drawerStyle();
  const [selectVisit, setSelectVisit] = useState("inperson");
  const [selectInsurance, setSelectInsurance] = useState("self");
  const handleSubmit = (_values: any) => {};
  const validationSchema = Yup.object().shape({
    patientName: Yup.string().required("Required"),
  });
  const handleOnVisitType = (value: string) => {
    setSelectVisit(value);
  };
  const handleOnInsuracneType = (value: string) => {
    setSelectInsurance(value);
  };
  return (
    <>
      <React.Fragment>
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "50%",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              background: "#ffffff",
              overflow: "auto",
            },
          }}
        >
          <Grid className={classes.heading} xs={12}>
            <TitleComponent
              name={"Schedule New Appointment"}
              handleBack={handleClose}
            />
            <Grid>
              <Form
                initialValues={{
                  patientName: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({
                  errors,
                  touched,
                  values,
                  submitForm,
                  setFieldValue,
                }: any) => {
                  return (
                    <Box maxWidth="1000px" width="100%">
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          display: "flex",
                          padding: "2%",
                          alignItems: "end",
                        }}
                      >
                        <Grid item xs={12} md={8}>
                          <FormInput
                            control="autocomplete"
                            data={providerNames}
                            name="patientName"
                            label="Patient Name"
                            value={values.patientName}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.patientName && touched.patientName}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <ButtonBase className={classes.patientButton}>
                            <span className={classes.buttonIcon}>
                              <PersonAddOutlined />
                            </span>
                            <Typography variant="h4">
                              {"New Patient"}
                            </Typography>
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Label label="Visit Type" isRequired={false} />
                          <Grid
                            container
                            className={classes.switchOuterContainer}
                          >
                            <Grid item>
                              <span className={classes.buttonIcon}>
                                {selectVisit === "inperson" ? (
                                  <FmdGoodOutlined />
                                ) : (
                                  <VideocamOutlined />
                                )}
                              </span>
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                className={classes.switchContainer}
                              >
                                <ButtonBase
                                  onClick={() => handleOnVisitType("inperson")}
                                  sx={
                                    selectVisit === "inperson"
                                      ? sxs.activeSwitch
                                      : sxs.inActiveSwitch
                                  }
                                >
                                  <Typography variant="h4">
                                    In Person
                                  </Typography>
                                </ButtonBase>
                                <ButtonBase
                                  onClick={() => handleOnVisitType("virtual")}
                                  sx={
                                    selectVisit === "virtual"
                                      ? sxs.activeSwitch
                                      : sxs.inActiveSwitch
                                  }
                                >
                                  <Typography variant="h4">Virtual</Typography>
                                </ButtonBase>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="dropdown"
                            data={EnrollmentTypes || []}
                            name="appointmentType"
                            label="Appointment Type"
                            value={values.appointmentType}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            placeholder="Select Type"
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={
                              errors.appointmentType && touched.appointmentType
                            }
                          />
                        </Grid>
                        {selectVisit === "inperson" && (
                          <Grid item xs={12} md={12}>
                            <FormInput
                              control="dropdown"
                              data={EnrollmentTypes || []}
                              name="location"
                              label="Location"
                              value={values.appointmentType}
                              fullWidth
                              onChange={(
                                _event: React.ChangeEvent<{}>,
                                value: string
                              ) => {
                                setFieldValue("patientName", value);
                              }}
                              placeholder="Select Location"
                              //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                              error={errors.location && touched.location}
                            />
                          </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="autocomplete"
                            data={providerNames}
                            name="specilites"
                            label="Specialities"
                            value={values.patientName}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.patientName && touched.patientName}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="autocomplete"
                            data={providerNames}
                            name="provider"
                            label="Provider"
                            value={values.patientName}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.patientName && touched.patientName}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormInput
                            type="datetime-local"
                            control="textfield"
                            name="datetime"
                            label="Date & Time"
                            value={values.datetime}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.datetime && touched.datetime}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="dropdown"
                            data={EnrollmentTypes || []}
                            name="room"
                            label="Room"
                            value={values.room}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            placeholder="Select Intake Plan"
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.room && touched.room}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                        <Grid item xs={12} md={6}>
                          <Label label="Insurance Type" isRequired={false} />
                          <Grid
                            container
                            className={classes.switchOuterContainer}
                          >
                            <Grid item>
                              <Grid
                                container
                                className={classes.switchContainer}
                              >
                                <ButtonBase
                                  onClick={() => handleOnInsuracneType("self")}
                                  sx={
                                    selectInsurance === "self"
                                      ? sxs.activeSwitch
                                      : sxs.inActiveSwitch
                                  }
                                >
                                  <Typography variant="h4">Self</Typography>
                                </ButtonBase>
                                <ButtonBase
                                  onClick={() =>
                                    handleOnInsuracneType("insurance")
                                  }
                                  sx={
                                    selectInsurance === "insurance"
                                      ? sxs.activeSwitch
                                      : sxs.inActiveSwitch
                                  }
                                >
                                  <Typography variant="h4">
                                    Insurance
                                  </Typography>
                                </ButtonBase>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="dropdown"
                            data={EnrollmentTypes || []}
                            name="primaryInsurance"
                            label="Primary Insurance"
                            value={values.primaryInsurance}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            placeholder="Select Insurance"
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={
                              errors.primaryInsurance &&
                              touched.primaryInsurance
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="dropdown"
                            data={EnrollmentTypes || []}
                            name="secondaryInsurance"
                            label="Secondary Insurance"
                            value={values.secondaryInsurance}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            placeholder="Select Insurance"
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={
                              errors.secondaryInsurance &&
                              touched.secondaryInsurance
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="dropdown"
                            data={EnrollmentTypes || []}
                            name="authorization"
                            label="Authorization"
                            value={values.authorization}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            placeholder="Select Authorization"
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={
                              errors.authorization && touched.authorization
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormInput
                            type="text"
                            control="textfield"
                            data={providerNames}
                            name="reason"
                            label="Reason For Appointment"
                            value={values.reason}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.patientName && touched.patientName}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormInput
                            type="text"
                            control="textfield"
                            data={providerNames}
                            name="note"
                            label="Patient Appointment Note"
                            value={values.note}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.note && touched.note}
                            height="100px !important"
                            multiline
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormInput
                            control="dropdown"
                            data={EnrollmentTypes || []}
                            name="intakePlan"
                            label="Intake Plan"
                            value={values.intakePlan}
                            fullWidth
                            onChange={(
                              _event: React.ChangeEvent<{}>,
                              value: string
                            ) => {
                              setFieldValue("patientName", value);
                            }}
                            placeholder="Select Intake Plan"
                            //   disabled={appointmentSchedule?.loading || careTeam?.loading}
                            error={errors.intakePlan && touched.intakePlan}
                          />
                        </Grid>
                      </Grid>
                      <DrawerButton
                        handleBack={handleClose}
                        handleSubmit={() => submitForm()}
                      />
                    </Box>
                  );
                }}
              </Form>
            </Grid>
          </Grid>
        </Drawer>
      </React.Fragment>
    </>
  );
};
export default ScheduleNewAppointment;

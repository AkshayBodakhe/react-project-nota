import { Box, Button, Drawer, Typography } from "@mui/material";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import TodayTwoToneIcon from "@mui/icons-material/EventNoteOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

import { makeStyles } from "@mui/styles";
import { useState } from "react";
import CancelAppointment from "./cancel-appoinment";
import CheckInDialog from "./check-in-dialog";

export const sheduleStyle = makeStyles({
  headerContent: {
    height: "auto",
  },
  container: {
    padding: "27px 24px",
  },
  dateContainer: {
    padding: "5px 14px",
    marginLeft: "44px",
    marginTop: "18px",
    background: "#CCECFF33 0% 0% no-repeat padding-box",
  },

  blueIcon: {
    width: "24px",
    height: "24px",
    backgroundColor: "#0097F0",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  photoContent: {
    height: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    marginTop: "21px",
  },
  dataContent: {
    height: "auto",

    marginBottom: "16px",
    marginTop: "16px",
  },
  insuranceContent: {
    height: "auto",
    marginTop: "30px",
  },
  intakeContent: {
    height: "auto",
    marginTop: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "16px",
    marginTop: "50px",
  },
  dateMargin: {
    marginLeft: "39px !important",
    background: "#CCECFF33 0% 0% no-repeat padding-box",
  },
  topDate: {
    marginTop: "11px",
  },
  confirmed: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "05px 20px 05px 20px",
  },
  customButton: {
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #36588C",
    borderRadius: "5px",
    color: "#36588C",
    fontWeight: "bold",
    opacity: 1,
    cursor: "pointer",
  },
  colorConfirm: {
    background: "#1A1A1A0A 0% 0% no-repeat padding-box",
  },

  defaultText: {
    color: "#1A1A1ACC !important",
    fontWeight: "bold !important",
    fontSize: "14px !important",
  },
  paginationTypo: {
    color: "#1A1A1A !important",
    fontSize: "12px !important",
    fontWeight: "600 !important",
  },
  TabelheadingTypo: {
    color: "#1A1A1A99 !important",
    fontWeight: "600 !important",
  },
});

type sheduleProps = {
  open: boolean;
  onClose: () => void;
  getAppoinmentAction: string;
};

const AppoinmentAction: React.FC<sheduleProps> = (props) => {
  const classes = sheduleStyle();
  const [cancelAppointmentDialog, setCancelAppointmentDialog] = useState(false);
  const [openCheckInDialog, setOpenCheckInDialog] = useState(false);

  return (
    <>
      <div>
        <Drawer
          anchor="right"
          open={props.open}
          onClose={props.onClose}
          PaperProps={{
            sx: {
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            },
          }}
        >
          <Box
            sx={{ width: "608px" }}
            role="presentation"
            onClick={props.onClose}
            onKeyDown={props.onClose}
          >
            <main className={classes.container}>
              <nav className={classes.headerContent}>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "3px",
                      backgroundColor:
                        props.getAppoinmentAction === "Scheduled"
                          ? "#0097F0"
                          : props.getAppoinmentAction === "Check In"
                          ? "#E69EFF"
                          : props.getAppoinmentAction === "Exam Room"
                          ? "#57E1F7"
                          : props.getAppoinmentAction === "In Room - Intake"
                          ? "#897FFF"
                          : "inherit",
                    }}
                  ></div>

                  <Typography
                    style={{
                      flex: "1 0 0",
                      fontWeight: "bold",
                      color: "#1A1A1ACC",
                      fontSize: "20px",
                    }}
                  >
                    {props.getAppoinmentAction}
                  </Typography>
                  <UpdateTwoToneIcon></UpdateTwoToneIcon>
                  <CloseTwoToneIcon></CloseTwoToneIcon>
                </div>
                <div className={classes.topDate}>
                  <Typography
                    className={classes.dateMargin}
                    style={{
                      color: "#1A1A1A",
                      fontSize: "20px",
                    }}
                  >
                    Monday, 20 Dec 2022 at 8:00 AM
                  </Typography>
                  <div className={classes.dateContainer}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#1A1A1A",
                        fontSize: "20px",
                      }}
                    >
                      Dr. Corina Earle (Dermatologist){" "}
                    </div>
                    <div
                      style={{
                        color: "#1A1A1A99",
                        fontSize: "20px",
                      }}
                    >
                      West Memorial Clinic
                    </div>
                  </div>
                </div>
              </nav>
              <nav className={classes.photoContent}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src="https://images.pexels.com/photos/3460478/pexels-photo-3460478.jpeg?cs=srgb&dl=pexels-kalyn-kostov-3460478.jpg&fm=jpg"
                      alt="Selected"
                      style={{
                        backgroundColor: "blue",
                        width: "104px",
                        height: "104px",
                        boxShadow: "0px 0px 8px #00000029",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    paddingLeft: "12px",
                  }}
                >
                  <Typography
                    variant="h1"
                    style={{
                      color: "#0097F0",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    Heena West (A242)
                  </Typography>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr ",
                    }}
                  >
                    <div style={{ color: "#1A1A1A99", fontSize: "16px" }}>
                      Date of Birth
                    </div>
                    <div
                      style={{
                        color: "#1A1A1A",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      14-07-1965
                    </div>

                    <div style={{ color: "#1A1A1A99", fontSize: "16px" }}>
                      Age{" "}
                    </div>
                    <div
                      style={{
                        color: "#1A1A1A",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      65 Years/ F
                    </div>

                    <div style={{ color: "#1A1A1A99", fontSize: "16px" }}>
                      Contact Number
                    </div>
                    <div
                      style={{
                        color: "#1A1A1A",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      (243) 4563-8493{" "}
                    </div>
                  </div>
                </div>

                <div style={{}}>
                  <div className={classes.confirmed}>
                    <div className={classes.colorConfirm}>
                      <div style={{ color: "#1A1A1A", fontSize: "16px" }}>
                        Confirmation
                      </div>
                      <div
                        style={{
                          color: "#00B917",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Confirmed
                      </div>
                    </div>
                    <div className={classes.colorConfirm}>
                      <div style={{ color: "#1A1A1A", fontSize: "16px" }}>
                        Eligblity
                      </div>
                      <div
                        style={{
                          color: "#00B917",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Coverage
                      </div>
                    </div>
                  </div>
                </div>
              </nav>

              <div className={classes.dataContent}>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <div>
                    <TodayTwoToneIcon />
                  </div>

                  <Typography
                    variant="h2"
                    style={{
                      fontWeight: "bold",
                      color: "#1A1A1A",
                      fontSize: "18px",
                    }}
                  >
                    Appointment Details
                  </Typography>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                    paddingLeft: "12px",
                    paddingTop: "26px",
                    background: "#CCECFF33 0% 0% no-repeat padding-box",
                  }}
                >
                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Primary Provider
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    Dr. Corina Earle{" "}
                  </div>

                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Location
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    West Memorial Clinic
                  </div>

                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Appointment Status
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    Scheduled
                  </div>

                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Appointment Type
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    New Patient
                  </div>

                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Exam Room
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    Exam Room 1
                  </div>

                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Reason For Visit
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    Headaches And Sickness
                  </div>
                </div>
              </div>
              <div className={classes.insuranceContent}>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <HealthAndSafetyOutlinedIcon />
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#1A1A1A",
                      fontSize: "18px",
                    }}
                  >
                    Insurance Information
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                    paddingLeft: "12px",
                    paddingTop: "26px",
                    background: "#CCECFF33 0% 0% no-repeat padding-box",
                  }}
                >
                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Primary Insurance Number
                  </div>
                  <div
                    style={{
                      color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    125-5478-65325
                  </div>
                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Copay
                  </div>
                  <div
                    style={{
                      // color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                      color: "#00B917",
                    }}
                  >
                    $30 Paid
                  </div>
                </div>
              </div>
              <div className={classes.intakeContent}>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <TaskOutlinedIcon />
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#1A1A1A",
                      fontSize: "18px",
                    }}
                  >
                    Intake Forms
                  </div>
                </div>
                <div
                  style={{
                    background: "#CCECFF33 0% 0% no-repeat padding-box",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                    paddingLeft: "12px",
                    paddingTop: "26px",
                  }}
                >
                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Consent form
                  </div>
                  <div
                    style={{
                      // color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                    }}
                  >
                    <span style={{ color: "#00B917" }}>Signed</span>
                    <span style={{ color: "#0097F0" }}>(20-07-2022)</span>
                  </div>
                  <div
                    style={{
                      color: "#1A1A1A99",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Intake form
                  </div>
                  <div
                    style={{
                      // color: "#1A1A1ACC ",
                      fontWeight: "600 ",
                      fontSize: "16px ",
                      color: "#FF3939",
                    }}
                  >
                    Not submitted
                  </div>
                </div>
              </div>
              <div className={classes.buttonGroup}>
                {props.getAppoinmentAction === "Scheduled" && (
                  <button
                    className={classes.customButton}
                    onClick={props.onClose}
                  >
                    No Show
                  </button>
                )}
                {props.getAppoinmentAction === "Scheduled" && (
                  <button
                    className={classes.customButton}
                    onClick={() => {
                      setCancelAppointmentDialog(true);
                    }}
                  >
                    Cancel Appointment
                  </button>
                )}

                {props.getAppoinmentAction === "Scheduled" && (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "initial" }}
                    onClick={() => {
                      setOpenCheckInDialog(true);
                    }}
                  >
                    Check In
                  </Button>
                )}

                {props.getAppoinmentAction === "Check In" && (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "initial" }}
                  >
                    Go to Intake
                  </Button>
                )}
                {(props.getAppoinmentAction === "In Room - Intake" ||
                  props.getAppoinmentAction === "Exam Room") && (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "initial" }}
                  >
                    Go to Exam Room
                  </Button>
                )}
              </div>
            </main>
          </Box>
        </Drawer>
      </div>
      {cancelAppointmentDialog && (
        <CancelAppointment
          openCancelAppointmentDialog={cancelAppointmentDialog}
          setOpenDialog={setCancelAppointmentDialog}
          onClose={() => {
            setCancelAppointmentDialog(false);
          }}
        />
      )}
      {openCheckInDialog && (
        <CheckInDialog
          openCheckInDialog={openCheckInDialog}
          setOpenCheckInDialog={setOpenCheckInDialog}
          onClose={() => {
            setOpenCheckInDialog(false);
          }}
        />
      )}
    </>
  );
};

export default AppoinmentAction;

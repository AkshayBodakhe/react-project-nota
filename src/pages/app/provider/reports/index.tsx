import React, { useEffect, useState } from "react";
import AppLayout from "../../../../components/core/layout/layout";
import { PROVIDER } from "../documents/documents-constant/documents-common-const";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { formButtonStyle } from "../../../../styles/common";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { makeStyles } from "@mui/styles";
import AppointmentReport from "../reports/appointment-report/appointment-report";
import ProblemReport from "../reports/problem-report/problem-report";
import AllergyReport from "../reports/allergy-report/allergy-report";
import PatientReport from "../reports/patient-report/patient-report";
import MedicationReport from "../reports/medication-report/medication-report";
import PIAReports from "../reports/patient-insurance-authorization/patient-isurance-authorization";
import EncounterReport from "./encounter-report/encounter-report";
import { useSelector } from "react-redux";
import { isNavalaCare } from "../../../../components/common/helper";

export const ReportsStyle = makeStyles(() => ({
  childBody: {
    // backgroundColor: "#F1F1F1 !important",
  },
  mainBody: {
    marginBottom: "20px !important",
    backgroundColor: "#FFFFFF !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    padding: "10px",
    borderRadius: "5px",
    // height: "auto !important",
    maxHeight: "140px !important",
  },
  sideBarBody: {
    width: "100%",
    // marginBottom: "20px !important",
    backgroundColor: "#FFFFFF !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    padding: "5px",
    borderRadius: "5px",
    height: "86vh !important",
    overflowY: "scroll",
  },
  sideBarGrid: {
    boxShadow: "0px 0px 8px #00000029 !important",
    backgroundColor: "#FFFFFF !important",
    borderRadius: "5px",
    width: "100% !important",
    // marginTop: "10px",
    // height: "88.7vh !important",
    height: "100% !important",
  },
  sideBarButton: {
    width: "auto",
    padding: "20px !important",
    height: "32px",
    background: "#004186 0% 0% no-repeat padding-box !important",
    borderRadius: " 5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "space-evenly !important",
  },
  whiteText: {
    color: "#36598C !important",
    fontWeight: "bold !important",
  },
  listItem: {
    padding: "0px !important",
    margin: "0px !important",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    "&:active": {
      backgroundColor: "transparent !important",
    },
    "& .MuiTouchRipple-root": {
      display: "none !important",
    },
  },
  tabStyle: {
    width: "100%",
    textAlign: "left",
    fontSize: "16px !important",
    // textAlign: "left",
    // fontWeight: "600 !important",
    color: "#1A1A1AB3 !important",
    padding: "1.5% !important",
    paddingLeft: "10% !important",
    margin: "5px 0px !important",
  },
  fixedGridBorder: {
    borderRight: "2px solid #1A1A1A1A !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: "8px",
    // paddingBottom: "20px",
  },
  activeCard: {
    background: "#defae7",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    padding: "3px 15px",
    // justifyContent: "center",
    // color: 'green !important'
    fontSize: "16px",
    fontWeight: "600 !important",
    fontFamily: "Roboto",
    color: "#00B917 !important",
  },
  inactiveCard: {
    borderRadius: "12px",
    fontWeight: "600 !important",
    display: "flex",
    alignItems: "center",
    padding: "3px 15px",
    background: "#fadfde",
    justifyContent: "center",
    color: "red",
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  scheduleButton: {
    width: "auto !important",
    height: "42px !important",
    background: "#004186 0% 0% no-repeat padding-box !important",
    borderRadius: "5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "flex-start !important",
    alignItems: "center",
    padding: "5px !important",
  },
  immediateButton: {
    width: "auto !important",
    height: "42px !important",
    border: "2px solid #004186 !important",
    background: "#CCECFF80 0% 0% no-repeat padding-box !important",
    borderRadius: "5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "flex-start !important",
    alignItems: "center",
    padding: "5px !important",
  },
  activeSidebar: {
    borderRight: "2px solid #004186",
    // background: "#cce7ff 0% 0% no-repeat padding-box !important",
    // color: "#004186 !important",
    //outline: "1px solid #36588C",
    // borderRadius: "10px",
    // margin: '10px !important'
  },
  activeCount: {
    background: "#36598C",
    color: "#FFFFFF",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#1A1A1ACC !important",
    // fontWeight: "bold !important",
  },
  value: {
    fontWeight: "bold !important",
    color: "#004186 !important",
  },
  scheduleAppointmentTypo: {
    color: "#36588C !important",
    // fontWeight: "bold !important",
    // marginLeft: "10px !important",
  },
  immediateVisitNoteTypo: {
    // color: "#36588C !important",
    // fontWeight: "bold !important",
    marginLeft: "10px !important",
  },
}));

export const clinicalReports = [
  {
    id: "AppointmentReport",
    name: "Appointment Report",
  },
  {
    id: "PatientReport",
    name: "Patient Report",
  },
  {
    id: "MedicationReport",
    name: "Medication Report",
  },
  {
    id: "ProblemReport",
    name: "Problem Report",
  },
  {
    id: "AllergyReport",
    name: "Allergy Report",
  },
  // {
  //   id: "EncounterReports",
  //   name: "Encounter Reports",
  // },
  // {
  //   id: "DrugInteractions",
  //   name: "Drug Interactions",
  // },
  // {
  //   id: "ReferralReports",
  //   name: "Referral Reports",
  // },
];

export const BillingReports = [
  {
    id: "PatientInsuranceAuthoriztion",
    name: "Patient Insurance Authoriztion",
  },
  {
    id: "BillingReports",
    name: "Billing Reports",
  },
  {
    id: "ElectronicClaimSubmission",
    name: "Electronic Claim Submission",
  },
  {
    id: "ERAsListReports",
    name: "ERAs List Reports",
  },
  {
    id: "EOBReports",
    name: "EOB Reports",
  },
  {
    id: "WriteOff",
    name: "Write Off/ Adjustment Reports",
  },
  {
    id: "CardOnFireReports",
    name: "Card On Fire Reports",
  },
  {
    id: "AccountReceivableReportsForPatient",
    name: "Account Receivable Reports For Patient",
  },
  {
    id: "AccountReceivableReportsForInsurance",
    name: "Account Receivable Reports For Insurance",
  },
];

const ReportsIndex = () => {
  const classes = ReportsStyle();

  const filteredClinicalReports = clinicalReports.filter((item: any) => {
    return (
      !isNavalaCare() ||
      item.id === "AppointmentReport" ||
      item.id === "PatientReport" ||
      item.id === "MedicationReport"
    );
  });

  const [openSideListComponent, setOpenSideListComponent] =
    useState("AppointmentReport");

  const openSidebarPage = (id: any) => {
    setOpenSideListComponent(id);
  };

  const providerGroupUuid = useSelector(
    (state: any) => state.commonReducer.userDetail?.data?.providerGroup
  );

  return (
    <Box
      sx={{
        background: "#fff",
        boxShadow: "0px 0px 8px #00000029",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Box>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={2}
        >
          <Grid
            item
            sx={{ display: "flex", gap: "8px", color: "#004186", m: 1 }}
          >
            {/* <ArrowBackOutlinedIcon
              sx={{ fontSize: "20px", cursor: "pointer" }}
            /> */}
            <Typography variant="h2" sx={{ fontWeight: 600 }}>
              Reports
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Grid item className={classes.sideBarGrid}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  paddingLeft: "33px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  backgroundColor: "#daeaf8",
                }}
              >
                Clinical Reports
              </Typography>
              <List>
                {filteredClinicalReports.map((tab: any) => (
                  <Box key={tab.id}>
                    <ListItem className={classes.listItem} button>
                      <Typography
                        flexWrap={"wrap"}
                        title={tab.name}
                        onClick={() => {
                          openSidebarPage(tab.id);
                        }}
                        className={`${classes.tabStyle} ${
                          tab.id === openSideListComponent &&
                          classes.activeSidebar
                        }`}
                        sx={{
                          textAlign: "left",
                          color:
                            tab.id === openSideListComponent
                              ? "#004186 !important"
                              : "black !important",
                          fontWeight:
                            tab.id === openSideListComponent
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  </Box>
                ))}
              </List>

              {/* <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  paddingLeft: "33px",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  backgroundColor: "#daeaf8",
                }}
              >
                Billing Reports
              </Typography>
              <List>
                {BillingReports.map((tab: any) => (
                  <Box key={tab.id}>
                    <ListItem className={classes.listItem} button>
                      <Typography
                        flexWrap={"wrap"}
                        title={tab.name}
                        onClick={() => {
                          openSidebarPage(tab.id);
                        }}
                        className={`${classes.tabStyle} ${
                          tab.id === openSideListComponent &&
                          classes.activeSidebar
                        }`}
                        sx={{
                          textAlign: "left",
                          color:
                            tab.id === openSideListComponent
                              ? "#004186 !important"
                              : "black !important",
                          fontWeight:
                            tab.id === openSideListComponent
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  </Box>
                ))}
              </List> */}
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid item className={classes.sideBarBody}>
              {openSideListComponent === "AppointmentReport" ? (
                <AppointmentReport providerGroupUuid={providerGroupUuid} />
              ) : openSideListComponent === "PatientReport" ? (
                <PatientReport providerGroupUuid={providerGroupUuid} />
              ) : openSideListComponent === "MedicationReport" ? (
                <MedicationReport providerGroupUuid={providerGroupUuid} />
              ) : openSideListComponent === "ProblemReport" ? (
                <ProblemReport providerGroupUuid={providerGroupUuid} />
              ) : openSideListComponent === "AllergyReport" ? (
                <AllergyReport providerGroupUuid={providerGroupUuid} />
              ) : openSideListComponent === "EncounterReports" ? (
                <EncounterReport />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AppLayout(ReportsIndex, { source: PROVIDER });

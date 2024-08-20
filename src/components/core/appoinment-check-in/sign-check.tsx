//import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PrintIcon from "@mui/icons-material/Print";

export const intakeFormStyle = makeStyles(() => ({
  tableHeader: {
    backgroundColor: "#FFC77B33 !important",
  },
  tableHeaderText: {
    fontWeight: "600  !important",
    color: "#1A1A1A99",
  },
  tableRow: {
    color: "#1A1A1A99 !important",
  },
  paginationBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationTypo: {
    color: "#1A1A1A !important",
    fontSize: "12px !important",
    fontWeight: "600 !important",
    marginTop: "8px !important",
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    height: "25px",
    marginTop: "4px",
  },

  intakeFormGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 6fr",
    gap: "20px",
    padding: "10px",
  },

  intakeFormSubGrid: {
    border: "1px solid #00000029",
    borderRadius: "5px",
    padding: "10px",
    boxShadow: "0px 0px 8px #00000029",
    marginBottom: "15px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "55px",
  },
  headerContent: {
    display: "flex",
    justifyContent: "start",
    gap: "5px",
  },
  heading: {
    display: "flex",
    justifyContent: "start",
    gap: "80px",
    marginTop: "37px",
    paddingBottom: "14px",
    borderBottom: "1px solid #00000017",
  },
  subHeading: {
    marginTop: "16px",
  },
  pageContent: {
    display: "grid",
    gridTemplateColumns: "65px 1fr",
  },
  vitalContent: {
    display: "grid",
    gridTemplateColumns: "70px 70px",
    padding: "8px 16px",
  },
  vitalContainer: {
    display: "flex",
    justifyContent: "start",
    gap: "20px",
    marginTop: "7px",
  },
  rosStyle: {
    display: "grid",
    gridTemplateColumns: "105px 1fr",
  },
}));
const sxs = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: "100",
    backgroundColor: "white",
    height: "5vh",
    padding: "15px 0px",
  },
  headerContentKey: {
    color: "#1A1A1A66",
  },
  headerContentValue: {
    color: "#36588C",
  },
  headingKey: {
    color: "#0097F0",
    fontWeight: "600",
  },
  headingValue: {
    color: "#1A1A1ACC",
    fontWeight: "600",
    opacity: "0.5",
  },
  contentHeading: {
    marginTop: "24px",
    color: "#1A1A1ACC",
    fontWeight: "600",
  },
  tabStyle: {
    opacity: "0.4",
    fontWeight: "600",
  },
  tabValueStyle: {
    opacity: "0.6",
    fontWeight: "600",
  },
  contentKey: {
    color: "#1A1A1ACC",
    fontWeight: "600",
    marginTop: "12px",
  },
  hr: {
    borderBottom: "1px solid #00000017",
    marginBottom: "15px",
  },
  endline: {
    opacity: "0.4",
    fontWeight: "600",
    margin: "15px 0 25px 0",
  },
  endingLine: {
    fontWeight: "600",
    marginBottom: "15px ",
  },
};

export const Allergy = [
  {
    id: "A.",
    name: "A. Pneumococcal",
  },
  {
    id: "B.",
    name: "B. Dust",
  },
  {
    id: "C.",
    name: "C. Peanuts",
  },
];

export const PMH = [
  {
    id: "A.",
    name: "A. Eye Operation",
  },
];

export const PSH = [
  {
    id: "A.",
    name: "A. Abacavir Sulfate (Ziagen)",
  },
];

export const FH = [
  {
    id: "A.",
    name: "A. Mother - Dust",
  },
];

export const Med = [
  {
    id: "A.",
    name: "A. Abacavir Sulfate (Ziagen)",
  },
  {
    id: "B.",
    name: "B. Abelcet (Amphotericin B Injection)",
  },
];

export const ROS = [
  {
    id: "GENERAL",
    name: "Denies fever, chills weight loss or sleep abnormalities",
  },
  {
    id: "EYES",
    name: "Denies visual abnormalities",
  },
  {
    id: "HENT",
    name: "Denies nasal discharge, sore throat, ear pain or headache",
  },
  {
    id: "RESP",
    name: "No shortness of breath or wheezing",
  },
  {
    id: "CVS",
    name: "Denies chest pain, palpitations, irregular heart beat or leg",
  },
  {
    id: "GI",
    name: "Denies nausea, vomiting, diarrhea, abdominal pain",
  },
  {
    id: "GU",
    name: "Denies dysuria, hesitancy or hematuria",
  },
  {
    id: "MSS",
    name: "Denies joint pain or swelling",
  },
];

export const PE = [
  {
    id: "GENERAL",
    name: "NAD,Alert,well-appearing.Vital signs noted",
  },
  {
    id: "EYES",
    name: "Conjunctiva not injected. No discharge. PERRL,EOMI.",
  },
  {
    id: "HENT",
    name: "CAC non-tender,no-lesions. TM's clear. NOSE",
  },
  {
    id: "NECK",
    name: "NAD,Alert,well-appearing.Vital signs noted",
  },
  {
    id: "RESP",
    name: "CAC non-tender,no-lesions. TM's clear. NOSE",
  },
  {
    id: "CVS",
    name: "Denies chest pain, palpitations, irregular heart beat or leg",
  },
  {
    id: "ABDOM",
    name: "CAC non-tender,no-lesions. TM's clear. NOSE",
  },
  {
    id: "GU",
    name: "Denies dysuria, hesitancy or hematuria",
  },
  {
    id: "MSS",
    name: "Denies joint pain or swelling",
  },
  {
    id: "NS",
    name: "CAC non-tender,no-lesions. TM's clear. NOSE",
  },
  {
    id: "SKIN",
    name: "Denies joint pain or swelling",
  },
  {
    id: "PSYCH",
    name: "Denies dysuria, hesitancy or hematuria",
  },
  {
    id: "RECTAL",
    name: "Denies chest pain, palpitations, irregular heart beat or leg",
  },
];

export const Data = [
  {
    id: "A.",
    name: "A. Anxiety - GAD -7 Score- 8 (08/03/2023)",
  },
];

export const Tx = [
  {
    id: "A.",
    name: "A. Amoxicilin 500 mg Tab 1 table orally every 12 hours for 10 days #30 amp RFx15",
  },
];

export const Proc = [
  {
    id: "A.",
    name: "A. 90846 - Familty psychotherapist without patient present",
  },
];

export const Care = [
  {
    id: "A.",
    name: "A. Care Plan",
  },
];
function SignCheck() {
  const classes = intakeFormStyle();

  return (
    <div>
      <Box sx={sxs.headerContainer}>
        <div className={classes.header}>
          <div className={classes.headerContent}>
            <Typography sx={sxs.headerContentKey}>Visit Time</Typography>
            <Typography sx={sxs.headerContentValue}>
              Fri, Apr 16,2022
            </Typography>
          </div>
          <div className={classes.headerContent}>
            <Typography>
              <AccessTimeIcon sx={sxs.headerContentKey}></AccessTimeIcon>
            </Typography>
            <Typography sx={sxs.headerContentValue}>12:32</Typography>
          </div>
          <div className={classes.headerContent}>
            <Typography sx={sxs.headerContentKey}>Provider</Typography>
            <Typography sx={sxs.headerContentValue}>Alex John</Typography>
          </div>
          <div className={classes.headerContent}>
            <Typography sx={sxs.headerContentKey}>Appointment Type</Typography>
            <Typography sx={sxs.headerContentValue}>In-person Visit</Typography>
          </div>
        </div>
        <div>
          <div className={classes.headerContent}>
            <Typography>
              <PrintIcon sx={sxs.headerContentValue}></PrintIcon>
            </Typography>
            <Typography sx={sxs.headerContentValue}>Print Encounter</Typography>
          </div>
        </div>
      </Box>
      <div>
        <Box>
          <div className={classes.heading}>
            <Typography sx={sxs.headingKey}>Chief Complaint</Typography>
            <Typography sx={sxs.headingValue}>
              Unspecified essential hypertension
            </Typography>
            {/* <hr style={{ borderBottom: "1px solid black" }}></hr> */}
          </div>
        </Box>
        <Box>
          <div className={classes.subHeading}>
            <Typography sx={sxs.headingKey}>Subjective</Typography>
          </div>

          <div>
            <Typography sx={sxs.contentHeading}>1. Fear of animals</Typography>

            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Allergy</Typography>
              <List>
                {Allergy.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>PMH</Typography>
              <List>
                {PMH.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>PSH</Typography>
              <List>
                {PSH.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>FH</Typography>
              <List>
                {FH.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Med</Typography>
              <List>
                {Med.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>ROS</Typography>
              <List>
                {ROS.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <div className={classes.rosStyle}>
                        <Typography
                          variant="h2"
                          noWrap={true}
                          title={tab.id}
                          sx={sxs.tabStyle}
                        >
                          {tab.id}
                        </Typography>
                        <Typography
                          variant="h2"
                          noWrap={true}
                          title={tab.name}
                          sx={sxs.tabStyle}
                        >
                          {tab.name}
                        </Typography>
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </Box>
      </div>

      <div>
        <Box>
          <div className={classes.subHeading}>
            <Typography sx={sxs.hr}></Typography>
            <Typography sx={sxs.headingKey}>Objective</Typography>
          </div>

          <div>
            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Vitals</Typography>
              <div>
                <div className={classes.vitalContainer}>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>BP</Typography>
                    <Typography sx={sxs.tabStyle}>120/80</Typography>
                  </div>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>HR</Typography>
                    <Typography sx={sxs.tabStyle}>92</Typography>
                  </div>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>O2</Typography>
                    <Typography sx={sxs.tabStyle}>98</Typography>
                  </div>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>Temp</Typography>
                    <Typography sx={sxs.tabStyle}>98.4</Typography>
                  </div>
                </div>
                <div className={classes.vitalContainer}>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>Weight</Typography>
                    <Typography sx={sxs.tabStyle}>180</Typography>
                  </div>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>Height</Typography>
                    <Typography sx={sxs.tabStyle}>6'2"</Typography>
                  </div>
                  <div className={classes.vitalContent}>
                    <Typography sx={sxs.tabValueStyle}>BMI</Typography>
                    <Typography sx={sxs.tabStyle}>22.4</Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>PE</Typography>
              <List>
                {PE.map((tab: any) => {
                  return (
                    <ListItem
                      key={tab.id}
                    >
                      <div className={classes.rosStyle}>
                        <Typography
                          variant="h2"
                          noWrap={true}
                          title={tab.id}
                          sx={sxs.tabStyle}
                        >
                          {tab.id}
                        </Typography>
                        <Typography
                          variant="h2"
                          noWrap={true}
                          title={tab.name}
                          sx={sxs.tabStyle}
                        >
                          {tab.name}
                        </Typography>
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Data</Typography>
              <List>
                {Data.map((tab: any) => {
                  return (
                    <ListItem
                      key={tab.id}
                    >
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </Box>
      </div>

      <div>
        <Box>
          <div className={classes.subHeading}>
            <Typography sx={sxs.hr}></Typography>
            <Typography sx={sxs.headingKey}>Assessment/Plan</Typography>
          </div>

          <div>
            <Typography sx={sxs.contentHeading}>
              1. Fear of animals F40.218
            </Typography>
            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Tx</Typography>
              <List>
                {Tx.map((tab: any) => {
                  return (
                    <ListItem
                      key={tab.id}
                    >
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Proc</Typography>
              <List>
                {Proc.map((tab: any) => {
                  return (
                    <ListItem
                      key={tab.id}
                    >
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <div className={classes.pageContent}>
              <Typography sx={sxs.contentKey}>Care</Typography>
              <List>
                {Care.map((tab: any) => {
                  return (
                    <ListItem key={tab.id}>
                      <Typography
                        variant="h2"
                        noWrap={true}
                        title={tab.name}
                        sx={sxs.tabStyle}
                      >
                        {tab.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </Box>
      </div>

      <div>
        <Box>
          <div className={classes.subHeading}>
            <Typography sx={sxs.hr}></Typography>
            <Typography sx={sxs.headingKey}>Follow Up</Typography>
          </div>

          <div>
            <Typography sx={sxs.endline}>Need to come after 15 days</Typography>
            <Typography sx={sxs.hr}></Typography>
          </div>
        </Box>
      </div>

      <div>
        <Box>
          <div>
            <Typography sx={sxs.endingLine}>
              Signed eletronically by test doctor on july 06 2023 06:08 AM.
            </Typography>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default SignCheck;

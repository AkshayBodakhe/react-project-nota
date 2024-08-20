import { Grid, Tab, Tabs } from "@mui/material";
import CardDetailsComponent from "./card-details";
import { makeStyles } from "@mui/styles";
import React from "react";
import CardHistoryList from "./card-history";

interface cardDetailProps {
  patientData?: any;
}

export const cardIndexStyle = makeStyles(() => ({
  addButtonTypo: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "2px",
  },
  buttonTypo: {
    color: "#36588C !important",
    // fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    // height: "64vh",
    // overflowY: "scroll",
  },
}));

const PatientCardsInfo = (props: cardDetailProps) => {
  const { patientData } = props;
  const [value, setValue] = React.useState(0);
  const classes = cardIndexStyle();

  const availableTabs = [
    {
      label: "Card Details",
      component: (
        // <PastMedicalHistoryIndex
        //   patientData={props.patientData}
        //   refetch={refetchMedicalHistory}
        //   data={medicalHistory}
        //   isLoading={loadMedicalHistory}
        //   pagination={medicalHistoryPagination}
        //   setPagination={setMedicalHistoryPagination}
        // />
        <CardDetailsComponent patientData={patientData} />
      ),
    },
    {
      label: "Payment History",
      component: (
        // <PastMedicalHistoryIndex
        //   patientData={props.patientData}
        //   refetch={refetchMedicalHistory}
        //   data={medicalHistory}
        //   isLoading={loadMedicalHistory}
        //   pagination={medicalHistoryPagination}
        //   setPagination={setMedicalHistoryPagination}
        // />
        // <CardDetailsComponent patientData={patientData} />
        <CardHistoryList patientData={patientData} />
      ),
    },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container px={2}>
        <Grid item xs={8}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {availableTabs.map((tab: any, index) => (
              <Tab
                key={index}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold !important",
                  fontSize: "16px",
                }}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid className={classes.tabSwitchGrid}>
          {availableTabs[value]?.component}
        </Grid>
      </Grid>
    </>
  );
};

export default PatientCardsInfo;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
// import { adminConstants } from "../../../../constants/admin";
// import encounter from "../../../../assets/icon/encounter.png";
import providerGroup from "../../../../assets/icon/Group 72252.svg";
import providerIcon from "../../../../assets/icon/Group 72257.svg";
import patient from "../../../../assets/icon/Group 75873.svg";
import calendar from "../../../../assets/icon/calendar.png";
import featherTrendingUp from "../../../../assets/icon/featherTrendingUp.png";
import CalendarPrime from "./calendar";
// import { commonWidget } from "../../../../styles/common";
import CardsDashboard from "./dashboard-cards";
import { makeStyles } from "@mui/styles";
import {
  useAnalyticsControllerServiceGetTotalAnalyticsCount,
  useEncounterControllerServiceGetAllEncounterCount,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
// import { adminConstants } from "../../../../constants/admin";
// import { commonWidget } from "../../../../styles/common";

// const {
//   DASHBOARD
// } = adminConstants;

export const dashboardStyle = makeStyles(() => ({
  dashboardMainGrid: {
    width: "auto !important",
    // padding: "10px",
    marginBottom: "15px",
    // marginTop: "5px",
    // marginLeft: "-20px !important",
    // marginRight: "5px !important",
  },
  myGrid1: {
    paddingTop: "10px !important",
  },
  calendarGrid: {
    display: "flex",
    justifyContent: "end",
    paddingLeft: "275px !important",
  },
  myGrid: {
    paddingTop: "10px !important",
  },
}));

function Dashboard() {
  const classes = dashboardStyle();
  // const commonClasses = commonWidget();
  // const { DASHBOARD } = adminConstants;
  const [showCalendar] = useState(false);
  const [visitDataCount, setVisitDataCount] = useState<any>(0);
  // const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  // const [selectedEndDate, setSelectedEndDate] =useState<Date | null>(
  //   null
  // );

  const handleDateSelect = () => {
    // setSelectedStartDate(startDate);
    // setSelectedEndDate(endDate);
  };
  const [cardData, setCardData] = useState([
    {
      key: "providerGroupCount",
      icon: providerGroup,
      count: "",
      title: "Provider Groups",
      content: "5% higher than last month",
      percentageIcon: featherTrendingUp,
    },
    {
      key: "providerCount",
      icon: providerIcon,
      count: "",
      title: "Providers",
      content: "5% higher than last month",
      percentageIcon: featherTrendingUp,
    },
    {
      key: "patientCount",
      icon: patient,
      count: "",
      title: "Patients",
      content: "5% higher than last month",
      percentageIcon: featherTrendingUp,
    },
    {
      key: "visitCount",
      icon: calendar,
      count: "48",
      title: "Total Visit",
      content: "5% higher than last month",
      percentageIcon: featherTrendingUp,
    },
    // {
    //   icon: encounter,
    //   count: "35",
    //   title: "Encounters",
    //   content: "5% higher than last month",
    //   percentageIcon: featherTrendingUp,
    // },
  ]);

  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const { data: visitCount } =
    useEncounterControllerServiceGetAllEncounterCount({
      providerGroupUuid: userDetails?.data?.providerGroup,
    });

  useEffect(() => {
    setVisitDataCount(visitCount && visitCount?.data);
  }, [visitCount]);

  const { data } = useAnalyticsControllerServiceGetTotalAnalyticsCount();

  useEffect(() => {
    if (data?.data) {
      const visitNote = {
        visitCount: visitDataCount,
      };
      const newCount = new Map<string, string>();
      Object.entries({ ...data.data, ...visitNote }).map((val: any[]) => {
        newCount.set(val[0], val[1]?.toString());
      });
      setCardData((prev: any[]) => [
        ...prev?.map((card: any) => {
          card.count = newCount.get(card.key);
          return card;
        }),
      ]);
    }
  }, [data?.data, visitCount]);

  return (
    <div>
      {showCalendar && <CalendarPrime onDateSelect={handleDateSelect} />}
      <Grid
        container
        // rowSpacing={4.5}
        columnSpacing={2.75}
        className={classes.dashboardMainGrid}
      >
        {/* <Grid item xs={8}>
          <Typography
            variant="h2"
            sx={{ mt: 1, ml: 1 }}
            className={commonClasses.pageTitle}
          >
            {DASHBOARD}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.calendarGrid}>
          <CalendarPrime onDateSelect={handleDateSelect} />
        </Grid> */}
        {cardData.map((card, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className={index === 0 ? classes.myGrid1 : classes.myGrid}
          >
            <CardsDashboard {...card} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;

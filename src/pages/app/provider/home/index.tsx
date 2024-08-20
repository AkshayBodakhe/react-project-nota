import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import Home from "./home";
import { RevenueGraph } from "./revenue-graph";
import { AccountsPieChart } from "./accounts-pie-chart";
import { ReportsTable } from "./reports-table";
import { RecentlyAddedPatientTable } from "./recently-added-patient";
import { UpcomingAppointmentsTable } from "./upcoming-appointments";
import { providerConstants } from "../../../../constants/provider";
import MonthlyBarChart from "./monthly-bar-chart";
import {
  LIST_OF_TO_TASK,
  cardStyle,
  dashboardCardIcon,
} from "./provider-dashboard-const";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  useAppointmentControllerServiceGetProviderAppointmentCount,
  useEncounterControllerServiceGetAllEncounterCount,
  usePatientControllerServiceGetProviderPatientCount,
  useTasksControllerServiceGetOpenTaskCount,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patientSvg from "../../../../assets/icon/Group 75873.svg";
import upcomingApp from "../../../../assets/icon/calendarAppt.png";

const { PROVIDER } = adminConstants;

const {
  PRACTICE_PROVIDER_REVENUES,
  VIEW_DETAILS,
  UPCOMING_APPOINTMENTS,
  VIEW_ALL,
  ACCOUNTS,
  REPORTS,
  RECENTLY_ADDED_PATIENT,
} = providerConstants;

const sxs = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    gap: "30px",
  },
  item1: {
    display: "flex",
    gap: "3%",
  },
  item2: {
    display: "flex",
    gap: "3%",
    width: "100%",
  },
  detailsTab: {
    borderRadius: "5px",
    width: "100%",
    flexGrow: 1,
    background: "white",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
  },
  detailTitle: {
    background: "#1B5984",
    color: "white !important",
    display: "flex",
    padding: "1%",
    borderRadius: "4px 4px 0 0",
    justifyContent: "space-between",
  },
  viewBtn: {
    fontSize: "14px",
    textDecoration: "underline",
    letterSpacing: "1px",
  },
};

function ProviderHomePage() {
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const [taskCount, setTaskCount] = useState(0);
  const [encounterCount, setEncounterCount] = useState(0);
  const [patientCount, setPatientCount] = useState<any>(0);
  const [upcomingAppointmentCount, setUpcomingAppointmentCount] =
    useState<any>(0);
  const { data } = useTasksControllerServiceGetOpenTaskCount({
    providerUuid: userDetails?.data?.uuid,
  });
  const navigate = useNavigate();
  const { data: encounterData } =
    useEncounterControllerServiceGetAllEncounterCount({
      providerGroupUuid: userDetails?.data?.providerGroup,
    });

  const { data: patientCountData } =
    usePatientControllerServiceGetProviderPatientCount({
      providerUuid: userDetails?.data?.uuid,
    });

  const { data: upcomingApptData } =
    useAppointmentControllerServiceGetProviderAppointmentCount({
      providerUuid: userDetails?.data?.uuid,
    });

  useEffect(() => {
    setUpcomingAppointmentCount(upcomingApptData && upcomingApptData?.data);
  }, [upcomingApptData]);

  useEffect(() => {
    setPatientCount((patientCountData && patientCountData?.data) || 0);
  }, [patientCountData]);

  useEffect(() => {
    setTaskCount(data && (data?.data as any));
  }, [data]);

  useEffect(() => {
    setEncounterCount(encounterData && (encounterData.data as any));
  }, [encounterData]);

  const handleNavigateTask = () => {
    navigate("/provider/communications/tasks");
  };

  const handleNavigateAppointment = () => {
    navigate("../appointment/calendar");
  };

  return (
    <Grid sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "49.5% 49.5%",
          columnGap: "1%",
          rowGap: "4%",
          my: "10px",
        }}
      >
        <Grid
          display={"grid"}
          gridTemplateColumns={"48.9% 48.9%"}
          columnGap={"2%"}
          height={"35vh"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "2vh",
            }}
          >
            <Grid
              sx={{
                height: "16.5vh",
                ...cardStyle,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                px={2}
              >
                <Box sx={dashboardCardIcon}>
                  <AssignmentIcon sx={{ color: "#224694", fontSize: "32px" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "30px",
                    alignItems: "end",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold" }}
                    color="primary"
                  >
                    {taskCount}
                  </Typography>
                  <Typography variant="h3" fontWeight={"bold"}>
                    {"Task"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid
              sx={{
                height: "16.5vh",
                ...cardStyle,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                px={2}
              >
                <Box sx={dashboardCardIcon}>
                  <AssignmentTurnedInIcon
                    sx={{ color: "#224694", fontSize: "32px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "30px",
                    alignItems: "end",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold" }}
                    color="primary"
                  >
                    {encounterCount}
                  </Typography>
                  <Typography variant="h3" fontWeight={"bold"}>
                    {"Encounter"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "2vh",
            }}
          >
            <Grid
              sx={{
                height: "16.5vh",
                ...cardStyle,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                px={2}
              >
                <Box>
                  <img
                    src={patientSvg}
                    style={{ height: "70px", width: "70px" }}
                  />
                  {/* <AssignmentIcon sx={{ color: "#224694", fontSize: "32px" }} /> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "30px",
                    alignItems: "end",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold" }}
                    color="primary"
                  >
                    {patientCount}
                  </Typography>
                  <Typography variant="h3" fontWeight={"bold"}>
                    {"Patients"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid
              sx={{
                height: "16.5vh",
                ...cardStyle,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                px={2}
              >
                <Box sx={dashboardCardIcon}>
                  {/* <AssignmentTurnedInIcon
                    sx={{ color: "#224694", fontSize: "32px" }}
                  /> */}
                  <img
                    src={upcomingApp}
                    style={{ height: "33px", width: "33px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "30px",
                    alignItems: "end",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold" }}
                    color="primary"
                  >
                    {upcomingAppointmentCount || "0"}
                  </Typography>
                  <Typography variant="h3" fontWeight={"bold"}>
                    {"Appointments"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid>
          <Box
            sx={{ display: "flex", justifyContent: "center", ...cardStyle }}
            height={"35vh"}
          >
            <MonthlyBarChart />
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "49.5% 49.5%",
          columnGap: "1%",
          rowGap: "4%",
          my: "10px",
        }}
      >
        <Grid>
          <Box
            sx={{ ...cardStyle, padding: "0px", overflow: "hidden" }}
            height={"47vh"}
          >
            <Box sx={sxs.detailsTab}>
              <Box sx={sxs.detailTitle}>
                {LIST_OF_TO_TASK}
                <ButtonBase sx={sxs.viewBtn} onClick={handleNavigateTask}>
                  {VIEW_ALL}
                </ButtonBase>
              </Box>
              <RecentlyAddedPatientTable />
            </Box>
          </Box>
        </Grid>
        <Grid>
          <Box
            height={"47vh"}
            sx={{
              ...cardStyle,
              padding: "0px",
              overflow: "hidden",
            }}
          >
            <Box sx={sxs.detailsTab}>
              <Box sx={sxs.detailTitle}>
                {UPCOMING_APPOINTMENTS}
                <ButtonBase
                  sx={sxs.viewBtn}
                  onClick={handleNavigateAppointment}
                >
                  {VIEW_ALL}
                </ButtonBase>
              </Box>
              <UpcomingAppointmentsTable />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
export default ProviderHomePage;

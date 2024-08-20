import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cardStyle, dashboardCardIcon } from "./provider-dashboard-const";
import theme from "../../../../theme";
import { makeStyles } from "@mui/styles";
import { tableUseStyles } from "../appointment/calendar/appointmentWithLocations";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import providerIcon from "../../../../assets/icon/Group 72257.svg";
import patientIcon from "../../../../assets/icon/Group 75873.svg";
import appointmentIcon from "../../../../assets/icon/calendarAppt.png";
import encounterIcon from "../../../../assets/icon/listNew.png";
import {
  useAppointmentControllerServiceGetProviderGroupAppointmentCount,
  useEncounterControllerServiceGetProviderGroupEncounterCount,
  usePatientControllerServiceGetProviderGroupPatientCount,
  useProviderControllerServiceGetProviderGroupProviders,
  useProviderControllerServiceGetProviderGroupProvidersCount,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import { transformText } from "../../../../components/common/helper";
import { PaginationState } from "../../../../components/common/enums-and-interfaces/interfaces";
import CustomPagination from "../../../../components/common/pagination";
import Loading from "../../../../components/common/spinner/loading";

export const rightColumn = {
  display: "flex",
  flexDirection: "column",
  rowGap: "30px",
  alignItems: "end",
};

export const outerBox = {
  display: "flex",
  alignItems: "center",
  height: "16.5vh",
};

export const mainContainer = {
  display: "grid",
  gridTemplateColumns: "24% 24% 24% 24%",
  columnGap: "1.3%",
  marginTop: "10px",
};

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

function createData(
  providerId: string,
  providerName: string,
  specialty: string,
  contact: string,
  totalPatient: string,
  totalAppointment: string,
  totalEncounter: string
): any {
  return {
    providerId,
    providerName,
    specialty,
    contact,
    totalPatient,
    totalAppointment,
    totalEncounter,
  };
}

const columns: Column[] = [
  { id: "providerId", label: "Provider Id", minWidth: 70, displaySort: true },
  {
    id: "providerName",
    label: "Provider Name",
    minWidth: 100,
    displaySort: true,
  },
  { id: "specialty", label: "Specialty", minWidth: 100, displaySort: true },
  { id: "contact", label: "Contact", minWidth: 100, displaySort: true },
  {
    id: "totalPatient",
    label: "Total Patients",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "totalAppointment",
    label: "Total Appointments",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "totalEncounter",
    label: "Total Encounters",
    minWidth: 100,
    displaySort: true,
  },
];

const commontableWidget = makeStyles(
  () => ({
    tableHeadRowContainer: {
      // backgroundColor: "#4C4C4C1A !important",

      "& th": {
        // color: "#1A1A1A",
        backgroundColor: "#DAEAF8 !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "500",
        padding: "10px 10px !important",
      },

      "& td": {
        padding: "12px 12px !important",
      },
    },
    tablePagination: {
      // marginTop: "-20x !important",
      border: "none !important",
    },
  }),
  { defaultTheme: theme }
);

const ProviderAdminDashboard = () => {
  const classes = commontableWidget();
  const clsses1 = tableUseStyles();
  const [tableRow, setTableRow] = useState<any>();
  const [searchRecord, setSearchRecord] = useState("");
  const [providersCount, setProvidersCount] = useState<any>(0);
  const [patientCount, setPatientCount] = useState<any>(0);
  const [appointmentCount, setAppointmentCount] = useState<any>(0);
  const [encounterCount, setEncounterCount] = useState<any>(0);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });

  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const { data: providersCountData } =
    useProviderControllerServiceGetProviderGroupProvidersCount({
      providerGroupUuid: userDetails?.data?.providerGroup,
    });

  useEffect(() => {
    setProvidersCount(providersCountData && providersCountData?.data);
  }, [providersCountData]);

  const { data: patientCountData } =
    usePatientControllerServiceGetProviderGroupPatientCount({
      providerGroupUuid: userDetails?.data?.providerGroup,
    });

  useEffect(() => {
    setPatientCount(patientCountData && patientCountData?.data);
  }, [patientCountData]);

  const { data: appointmentCountData } =
    useAppointmentControllerServiceGetProviderGroupAppointmentCount({
      providerGroupUuid: userDetails?.data?.providerGroup,
    });

  useEffect(() => {
    setAppointmentCount(appointmentCountData && appointmentCountData?.data);
  }, [appointmentCountData]);

  const { data: encounterCountData } =
    useEncounterControllerServiceGetProviderGroupEncounterCount({
      providerGroupUuid: userDetails?.data?.providerGroup,
    });

  useEffect(() => {
    setEncounterCount(encounterCountData && encounterCountData?.data);
  }, [encounterCountData]);

  const { data: providerListData } =
    useProviderControllerServiceGetProviderGroupProviders({
      providerGroupUuid: userDetails?.data?.providerGroup,
      searchBy: searchRecord,
      page: pagination?.page,
      size: pagination?.size,
      sort: ["created,desc"],
    });

  useEffect(() => {
    const tableRows = providerListData?.data?.content?.map((provider: any) => {
      const providerSpecialities = provider?.specialities
        ?.map((spec: any) => {
          return spec.name;
        })
        .join(", ");

      return createData(
        provider?.uuid,
        provider?.firstName + "" + provider?.lastName,
        provider?.specialities?.length < 3 ? providerSpecialities : "Multiple",
        provider?.contactNumber,
        provider?.patientCount,
        provider?.appointmentCount,
        provider?.encounterCount
      );
    });
    setTableRow(tableRows);
    setPagination({
      ...pagination,
      totalElements: providerListData?.data?.totalElements,
      totalPages: providerListData?.data?.totalPages,
    });
  }, [providerListData, searchRecord, pagination]);

  // provider?.specialities

  return (
    <>
      <Box sx={mainContainer}>
        {/* <Typography variant="h2">{"Provider Admin"}</Typography> */}
        <Grid
          sx={{
            ...cardStyle,
            ...outerBox,
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
                src={providerIcon}
                style={{ height: "70px", width: "70px" }}
              />
              {/* <AssignmentIcon sx={{ color: "#224694", fontSize: "32px" }} /> */}
            </Box>
            <Box sx={rightColumn}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                {providersCount || "0"}
              </Typography>
              <Typography variant="h3" fontWeight={"bold"}>
                {"Providers"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          sx={{
            ...cardStyle,
            ...outerBox,
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
          >
            <Box>
              {/* <AssignmentIcon sx={{ color: "#224694", fontSize: "32px" }} /> */}
              <img
                src={patientIcon}
                style={{ height: "70px", width: "70px" }}
              />
            </Box>
            <Box sx={rightColumn}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                {patientCount || "0"}
              </Typography>
              <Typography variant="h3" fontWeight={"bold"}>
                {"Patients"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          sx={{
            ...cardStyle,
            ...outerBox,
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
          >
            <Box sx={dashboardCardIcon}>
              <img
                src={appointmentIcon}
                style={{ height: "33px", width: "33px" }}
              />
              {/* <AssignmentIcon sx={{ color: "#224694", fontSize: "32px" }} /> */}
            </Box>
            <Box sx={rightColumn}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                {appointmentCount || "0"}
              </Typography>
              <Typography variant="h3" fontWeight={"bold"}>
                {"Appointments"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          sx={{
            ...cardStyle,
            ...outerBox,
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
          >
            <Box sx={dashboardCardIcon}>
              <img
                src={encounterIcon}
                style={{ height: "40px", width: "50px", color: "36588c" }}
              />
            </Box>
            <Box sx={rightColumn}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                {encounterCount || "0"}
              </Typography>
              <Typography variant="h3" fontWeight={"bold"}>
                {"Encounters"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        py={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            {"Providers"}
          </Typography>
        </Grid>
        <Grid mr={1}>
          <Paper
            component="form"
            className={clsses1.paperSearch}
            sx={{
              height: "35px",
              border: "1px solid #a7a7a761",
              width: "212px",
            }}
          >
            <InputBase
              style={{ fontSize: "14px", height: "40px" }}
              className={clsses1.inputBase}
              placeholder="Search by specialty, name"
              onChange={(e) => setSearchRecord(e.target.value)}
            />
            <IconButton
              type="button"
              className={clsses1.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Box>
      <Box>
        <Paper
          sx={{
            boxShadow: "none",
            maxHeight: "600px",
            overflowY: "scroll",
          }}
        >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableHeadRowContainer}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableHeadRowContainer}>
                {tableRow &&
                  tableRow.map((providers: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={providers?.id}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} align={"center"}>
                              {column.id === "providerId" ? (
                                <Box sx={{ cursor: "pointer" }}>
                                  <Typography
                                    variant="h5"
                                    color={"#36588c"}
                                    fontWeight={"600"}
                                    title={providers["providerId"]}
                                  >
                                    {providers["providerId"].substring(0, 5)}
                                  </Typography>
                                </Box>
                              ) : (
                                <Box> {providers[column.id]}</Box>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {providerListData?.data?.content?.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                py={2}
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  {"No records found"}
                </Typography>
              </Box>
            )}
          </TableContainer>
          <CustomPagination
            pagination={pagination}
            setPagination={setPagination}
          />
        </Paper>
      </Box>
    </>
  );
};

export default ProviderAdminDashboard;

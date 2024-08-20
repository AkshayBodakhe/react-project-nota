import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "../../../../theme";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import reports from "../../../../mock-data/reports.json";
import { getCustomStyle } from "../../../../styles/common";
import { useSelector } from "react-redux";
import Loading from "../../../../components/common/spinner/loading";
import { getActionColor } from "../appointment/calendar/helper";
import { transformText } from "../../../../components/common/helper";
import moment from "moment";
import { useAppointmentControllerServiceGetAppointmentByProvider } from "../../../../sdk/thinkemr-core-0.0.1/queries";

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

function createData(
  startTime: string,
  patientName: string,
  providerName: string,
  appointmentType: string,
  appointmentMode: string,
  reasonOfVisit: string,
  appointmentStatus: string
): any {
  return {
    startTime,
    patientName,
    providerName,
    appointmentType,
    appointmentMode,
    reasonOfVisit,
    appointmentStatus,
  };
}

const columns: Column[] = [
  { id: "startTime", label: "Start Time", minWidth: 70, displaySort: true },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "providerName",
    label: "Provider",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "appointmentType",
    label: "Appointment Type",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "appointmentMode",
    label: "Appointment Mode",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "reasonOfVisit",
    label: "Reason For Visit",
    minWidth: 70,
    displaySort: true,
  },
  // {
  //   id: "intakeFormStatus",
  //   label: "Intake Form Status",
  //   minWidth: 70,
  //   displaySort: true,
  // },
  // { id: "copay", label: "Copay", minWidth: 70, displaySort: true },
  { id: "appointmentStatus", label: "Status", minWidth: 70, displaySort: true },
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

function UpcomingAppointmentsTable() {
  const classes = commontableWidget();
  const [report, setReports] = useState<any>();
  const [tableRow, setTableRow] = useState<any>();

  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const { data } = useAppointmentControllerServiceGetAppointmentByProvider({
    providerUuid: userDetails?.data?.uuid,
    page: 0,
    size: 10,
    sort: ["created,desc"],
  });

  useEffect(() => {
    const newRows: any =
      data &&
      data?.data?.content?.map((apt: any) => {
        return createData(
          moment(apt.appointmentDate).format("MM-DD-YYYY") +
            " " +
            apt.startTime,
          apt.patientName,
          apt.providerName,
          apt.appointmentType,
          apt.presentType,
          apt.reasonOfVisit,
          apt.appointmentStatus
        );
      });
    setTableRow(newRows);
  }, [data]);

  return (
    <>
      <Paper
        sx={{
          boxShadow: "none",
          maxHeight: "42.5vh",
          overflowY: "scroll",
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.tableHeadRowContainer}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={
                      getCustomStyle(column.id, "dateAndtime")
                        ? "left"
                        : "center"
                    }
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableHeadRowContainer}>
              {tableRow &&
                tableRow.map((appointment: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={appointment?.id}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell
                            key={column.id}
                            // sx={sxs.tableBodycell}
                            sx={{
                              color: getActionColor(appointment[column.id]),
                            }}
                            align={"center"}
                          >
                            {transformText(appointment[column.id])}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {tableRow && tableRow?.length === 0 && (
        <Grid container justifyContent={"center"} p={2}>
          <Typography>{"No data available"}</Typography>
        </Grid>
      )}
      {!tableRow && (
        <Grid mt={10}>
          <Loading />
        </Grid>
      )}
    </>
  );
}

export { UpcomingAppointmentsTable };

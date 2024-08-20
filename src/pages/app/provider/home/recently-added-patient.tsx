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
import { useTasksControllerServiceGetAllProviderTask } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import Loading from "../../../../components/common/spinner/loading";
import { getActionColor } from "../appointment/calendar/helper";
import { transformText } from "../../../../components/common/helper";
import moment from "moment";

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

function createData(
  createdDate: string,
  taskType: string,
  assignedBy: string,
  taskTitle: string,
  assignedTO: string,
  patientName: string,
  dueDate: string,
  status: string,
  priority: string
): any {
  return {
    createdDate,
    taskType,
    assignedBy,
    taskTitle,
    assignedTO,
    patientName,
    dueDate,
    status,
    priority,
  };
}

const columns: Column[] = [
  { id: "createdDate", label: "Date", minWidth: 70, displaySort: true },
  // { id: "taskType", label: "Task Type", minWidth: 100, displaySort: true },
  { id: "assignedBy", label: "Assign By", minWidth: 100, displaySort: true },
  { id: "taskTitle", label: "Task Title", minWidth: 100, displaySort: true },
  { id: "assignedTO", label: "Assign To", minWidth: 100, displaySort: true },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 100,
    displaySort: true,
  },
  { id: "dueDate", label: "Due Date", minWidth: 100, displaySort: true },
  { id: "status", label: "Status", minWidth: 100, displaySort: true },
  { id: "priority", label: "Priority", minWidth: 100, displaySort: true },
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

function RecentlyAddedPatientTable() {
  const classes = commontableWidget();
  const [tableRow, setTableRow] = useState<any>();
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  // const { data } = useAppointmentControllerServiceGetAppointmentByProviderGroup(
  //   {
  //     providerGroupUuid: userDetails?.data?.providerGroup,
  //   }
  // );

  const { data, isSuccess } = useTasksControllerServiceGetAllProviderTask({
    providerUuid: userDetails?.data?.uuid,
    page: 0,
    size: 10,
    sort: ["created,desc"],
  });

  useEffect(() => {
    const tableRows: any =
      data &&
      data?.data?.content?.map((task: any) => {
        return createData(
          task.createdDate
            ? moment(task.createdDate).format("MM-DD-YYYY")
            : "-",
          task.taskType,
          task.assignedBy?.firstName + " " + task.assignedBy?.lastName,
          task?.taskTitle || "-",
          task.assignedTO?.firstName + " " + task.assignedTO?.lastName,
          task.patient?.firstName
            ? task.patient?.firstName + " " + task?.patient?.lastName
            : "-",
          task?.dueDate ? moment(task?.dueDate).format("MM-DD-YYYY") : "-",
          task?.status || "-",
          task?.priority || "-"
        );
      });
    setTableRow(tableRows);
  }, [data, isSuccess]);

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
                tableRow.map((task: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={task?.id}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell
                            key={column.id}
                            // sx={sxs.tableBodycell}
                            sx={{
                              color:
                                column.id === "priority" ||
                                column.id === "status"
                                  ? getActionColor(task[column.id])
                                  : undefined,
                            }}
                            align={"center"}
                          >
                            {transformText(task[column.id])}
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
          <Typography variant="h5">{"No data available"}</Typography>
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

export { RecentlyAddedPatientTable };

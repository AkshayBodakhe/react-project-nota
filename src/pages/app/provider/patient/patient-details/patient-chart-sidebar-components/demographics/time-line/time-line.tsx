import {
  Box,
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
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Column,
  PaginationState,
} from "../../../../../../../../components/common/enums-and-interfaces/interfaces";
import { tableUseStyles } from "../../../../../appointment/calendar/appointmentWithLocations";
import CustomPagination from "../../../../../../../../components/common/pagination";
import { usePatientControllerServiceGetTimelineForPatient } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import Loading from "../../../../../../../../components/common/spinner/loading";

interface TimeLineProps {
  patientData?: any;
}
interface TimelineItem {
  id: number;
  type: string;
  description: string;
  provideName: string;
  dateTime: string;
}
export const tabColumns: Column[] = [
  { id: "dateTime", label: "Date Time" },
  { id: "time", label: "Time" },
  { id: "type", label: "Type" },
  { id: "description", label: "Description" },
  { id: "provideName", label: "Created By" },
];

const TimeLine: React.FC<TimeLineProps> = ({ patientData }) => {
  const classes = tableUseStyles();
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

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

  const providerGroupUuid = useSelector(
    (state: any) => state.commonReducer.userDetail?.data?.providerGroup
  );

  const { data, isError, isLoading, isSuccess, error } =
    usePatientControllerServiceGetTimelineForPatient({
      patientUuid: patientData?.uuid,
      providerGroupUuid: providerGroupUuid,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
    });

  useEffect(() => {
    if (data?.data) {
      const newRows = data.data.content?.map((data: any) => {
        return {
          id: data.id,
          type: data.type,
          description: data.description || "-",
          provideName: data.provideName || "-",
          dateTime: data.dateTime || "-",
          time: data.dateTime || "-",
          uuid: data.uuid || "-",
        };
      });
      setTimelineData(newRows);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data?.totalPages,
        totalElements: data.data?.totalElements,
      }));
    }
  }, [data]);

  return (
    <>
      <Box sx={{ background: "#fff", padding: "20px" }}>
        <Grid>
          <TableContainer component={Paper} sx={{ maxHeight: "700px" }}>
            <Table>
              <TableHead>
                <TableRow className={classes.headingBackground}>
                  {tabColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={classes.tableHeaderCell}
                    >
                      <Typography
                        variant="h5"
                        className={classes.TabelheadingTypo}
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  timelineData &&
                  timelineData.map((row: any) => (
                    <TableRow
                      key={row.id}
                      className={classes.tableBodyRow}
                      hover
                    >
                      {tabColumns?.map((column) => (
                        <TableCell
                          key={column.id}
                          className={classes.tableRowCell}
                        >
                          {column.id === "dateTime"
                            ? moment(row[column.id]).format("MM-DD-YYYY")
                            : column.id === "time"
                            ? moment(row[column.id]).format("HH:mm:ss")
                            : row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {isLoading && <Loading />}
            {!isLoading && timelineData && timelineData.length === 0 && (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ padding: "10px" }}
              >
                <Typography variant="body1">No Data Found</Typography>
              </Grid>
            )}
          </TableContainer>
          <CustomPagination
            pagination={pagination}
            setPagination={setPagination}
          />
        </Grid>
      </Box>
    </>
  );
};

export default TimeLine;

import {
    Box,
    Grid,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { useEffect, useState } from "react";
import { pastappointmentsdata } from "../../../../../../../mock-data/appointmentstabledetails";
  
  export const tableStyle = makeStyles(() => ({
    tableHeader: {
      backgroundColor: "#DAEAF8 !important",
    },
    tableHeaderText: {
      fontWeight: "400  !important",
      // color: "#1A1A1A99",
      fontSize: "16px !important",
    },
    tableRow: {
      color: "#1A1A1A99 !important",
    },
    editButton: {
      backgroundColor: "#CCECFF !important",
      color: "#0097F0 !important",
      height: "30px !important",
      padding: "8px !important",
      borderRadius: "5px !important",
      border: " 1px solid #0097F0 !important",
    },
    deleteButton: {
      backgroundColor: "#FF39390D !important",
      color: "#FF3939 !important",
      height: "30px !important",
      padding: "8px !important",
      borderRadius: "5px !important",
      border: " 1px solid #FF3939 !important",
      marginLeft: "10px !important",
      "@media  (min-width: 1366px) and (min-height: 678px)": {
        marginLeft: "0 !important",
      },
    },
    activeButton: {
      fontSize: "16px",
      fontWeight: "600 !important",
      fontFamily: "Roboto",
      color: "#00B917 !important",
    },
    inactiveButton: {
      fontSize: "16px",
      fontWeight: "600 !important",
      fontFamily: "Roboto",
      color: "#FF3939 !important",
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
    },
    pagination: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 16,
    },
    root: {
      "& .MuiPaginationItem-root": {
        color: "#000",
        "&:hover": {
          backgroundColor: "#ccc",
        },
  
        "&.Mui-selected": {
          backgroundColor: "#004186 !important",
          color: "#fff",
        },
      },
  
      "& .MuiPaginationItem-icon": {
        color: "#004186 !important",
      },
    },
  }));
  
  export interface Row {
    [key: string]: string | JSX.Element | number | any;
  }
  
  export interface Column {
    id: string;
    label: string | JSX.Element;
    minWidth?: number;
  }
  
  export const pastAppointmentTableColumns: Column[] = [
    { id: "scheduletime", label: "Schedule Time", minWidth: 130 },
    { id: "provider", label: "Provider", minWidth: 150 },
    { id: "reason", label: "Reason", minWidth: 150 },
    { id: "appointmenttype", label: "Appointment Type", minWidth: 110 },
    { id: "appointmentstatus", label: "Appointment Status", minWidth: 120 },
    { id: "billstatus", label: "Bill Status", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 100 },
  ];
  
  function createPastAppointmentTable(
    scheduletime: string,
    provider: string,
    reason: string,
    time: string,
    speciality: string,
    appointmenttype: string,
    appointmentstatus: string,
    billstatus: string,
    action: boolean
  ): Row {
    return {
      scheduletime,
      provider,
      time,
      speciality,
      reason,
      appointmenttype,
      appointmentstatus,
      billstatus,
      action,
    };
  }
  
  function PastAppointment() {
    const classes = tableStyle();
    const [page, setPage] = useState(0);
    const rowsPerPage = 3;
    const [pastappointmentdata, setPastAppointmentData] = useState<Row[]>([]);
    
    const displayedRows = pastappointmentdata.slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
    useEffect(() => {
        const newRows = pastappointmentsdata?.content.map((data: any) => {
          return createPastAppointmentTable(
            data.scheduletime,
            data.provider,
            data.provider,
            data.time,
            data.reason,
            data.appointmenttype,
            data.appointmentstatus,
            data.billstatus,
            data.action
          );
        });
        setPastAppointmentData(newRows);
      }, []);

    const handleChangePage = (_event: any, newPage: number) => {
      setPage(newPage);
    };
    return (
      <div>
        <>
          <Grid container p={2} pb={0}>
            <Grid container xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#004186",
                    fontWeight: "bold",
                    fontSize: "16px !important",
                  }}
                >
                  Past Appointments
                </Typography>
              </Grid>
            </Grid>
            <Grid item mt={1} xs={12} sx={{ marginTop: "20px" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {pastAppointmentTableColumns.map((column: any) => (
                        <TableCell
                          key={column.id}
                          className={classes.tableHeader}
                          style={{
                            padding: "10px",
                            minWidth: column.minWidth,
                          }}
                        >
                          <Typography
                            variant="h4"
                            className={classes.tableHeaderText}
                          >
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedRows.map((row: any, index: any) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {pastAppointmentTableColumns.map((column: any) => {
                            const value = row[column.id];
  
                            return (
                              <TableCell
                                key={column.id}
                                sx={{
                                  padding: "8px",
                                  backgroundColor:
                                    index % 2 === 1 ? "#EAF4FF80" : "",
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={
                                    {
                                      // fontWeight: "bold !important",
                                      // color: "#1A1A1ACC",
                                    }
                                  }
                                >
                                  {column.id === "status"
                                    ? // <ButtonBaseActiveInactiveStyle status={value} />
                                      null
                                    : column.id === "action"
                                    ? // <ButtonBaseStyle />
                                      null
                                    : value}
                                </Typography>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Box className={classes.paginationBox} pl={2}>
            <Typography variant="h6" className={classes.paginationTypo}>
              Showing {page * rowsPerPage + 1} to{" "}
              {Math.min((page + 1) * rowsPerPage, pastappointmentdata.length)} of{" "}
              {pastappointmentdata.length} entries
            </Typography>
            <Pagination
              count={Math.ceil(pastappointmentdata.length / rowsPerPage)}
              page={page + 1}
              onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
              className={classes.pagination}
              classes={{ root: classes.root }}
              shape="rounded"
            />
          </Box>
        </>
      </div>
    );
  }
  
  export default PastAppointment;
  
import {
  Box,
  Checkbox,
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
import { useState } from "react";
import CustomPagination from "../../../../components/common/pagination";
import Loading from "../../../../components/common/spinner/loading";
import { getActionColor } from "../appointment/calendar/helper";
import { toCamelCase } from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";

export const style = makeStyles(() => ({
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
  tableHeader: {
    backgroundColor: "#1A1A1A0D !important",
    opacity: 1,
  },
  tableHeaderText: {
    fontWeight: "500",
    color: "#1A1A1ACC !important",
    fontSize: "16px !important",
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

export interface TableProps {
  Columns: any;
  dataTable: any;
  pagination?: any;
  setPagination?: any;
  isLoading?: any;
}
const ReportTable: React.FC<TableProps> = ({
  Columns,
  dataTable,
  pagination,
  setPagination,
  isLoading,
}) => {
  const classes = style();

  return (
    <>
      <Grid item mt={1} xs={12}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {Columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    className={classes.tableHeader}
                    style={{
                      padding: "10px",
                      minWidth: column.minWidth,
                      textAlign: column.id === "checkbox" ? "center" : "left",
                    }}
                  >
                    {column.id === "checkbox" ? (
                      <Checkbox
                        sx={{
                          padding: 0,
                          color: "#1A1A1A33",
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                      />
                    ) : (
                      <Typography
                        variant="h4"
                        className={classes.tableHeaderText}
                      >
                        {column.label}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                dataTable &&
                dataTable?.map((row: any, index: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {Columns.map((column: any) => {
                        const value = row?.[column.id];

                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              padding: "20px 8px",
                              textAlign:
                                column.id === "checkbox" ? "center" : "left",
                              // backgroundColor: index % 2 === 1 ? "#EAF4FF80" : "",
                            }}
                          >
                            {column.id === "patientId" ? (
                              <Typography
                                variant="h5"
                                title={value}
                                sx={{
                                  // fontWeight: "bold !important",
                                  // cursor: "pointer",
                                  color: "#0097F0",
                                }}
                              >
                                {value?.substring(0, 4)}
                              </Typography>
                            ) : column.id === "checkbox" ? (
                              <Checkbox
                                sx={{
                                  padding: 0,
                                  color: "#1A1A1A33",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 24,
                                  },
                                }}
                              />
                            ) : column.id === "status" ? (
                              <Typography
                                variant="h5"
                                title={value}
                                sx={{
                                  // fontWeight: "bold !important",
                                  cursor: "pointer",
                                  color:column.id==="status"?getActionColor(row[column.id]):undefined
                                }}
                              >
                                {toCamelCase(value)}
                              </Typography>
                            ) : (
                              <Typography
                                variant="h5"
                                sx={
                                  {
                                    // fontWeight: "bold !important",
                                    // color: "#1A1A1A80",
                                  }
                                }
                              >
                                {value}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {isLoading && <Loading />}
          {!isLoading && dataTable && dataTable?.length === 0 && (
            <Grid
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Typography variant="h5">No Data Found</Typography>
            </Grid>
          )}
        </TableContainer>
      </Grid>
      <CustomPagination pagination={pagination} setPagination={setPagination} />
    </>
  );
};

export default ReportTable;

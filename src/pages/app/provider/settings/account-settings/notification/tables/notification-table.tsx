import {
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { notifications } from "../../../../../../../mock-data/notification-list";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../styles/common";
import { Data } from "../../../../common-files/interfaces";
import { sxs } from "../style/common-style";
import { Column } from "../../../../../../../components/common/enums-and-interfaces/interfaces";

const columns: Column[] = [
  { id: "title", label: "Title", minWidth: 200, displaySort: false },
  { id: "push", label: "Push", minWidth: 80, displaySort: false },
  { id: "text", label: "Text", minWidth: 80, displaySort: true },
  { id: "email", label: "Email", minWidth: 80, displaySort: true },
];

function NotificationTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = commonWidget();
  const [tableData, setTableData] = useState<Data[]>([]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    _newPage: number
  ) => {
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    // setPage(0);
  };

  const handleChangeStatus = (data: Data, columnName: keyof Data) => {
    const newData: Data[] = tableData.map((notification: any) => {
      if (notification === data) {
        notification[columnName] = !notification[columnName] as boolean;
      }
      return notification;
    });
    setTableData(newData);
  };

  useEffect(() => {
    setTableData(notifications);
  }, []);

  return (
    <>
      <Grid container>
        <Typography
          sx={{
            letterSpacing: "0px",
            color: "#1A1A1ACC",
            opacity: 1,
            fontWeight: "bold",
          }}
        >
          Appointments
        </Typography>
      </Grid>
      <Paper
        sx={{
          boxShadow: "none",
          background: "white",
          marginTop: "20px",
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={sxs.tableHeadRowContainer}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={
                      getCustomStyle(column.id, "title") ? "left" : "center"
                    }
                    style={{ width: column.minWidth }}
                  >
                    {column.label}{" "}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableHeadRowContainer}>
              {tableData?.map((notification: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={notification?.id}
                  >
                    {columns.map((column) => {
                      if (column.id === "title") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(column.id, "title")
                                ? "left"
                                : "center"
                            }
                          >
                            {notification[column.id]}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            sx={sxs.tableBodycell}
                          >
                            <Checkbox
                              checked={notification[column.id]}
                              onClick={() =>
                                handleChangeStatus(
                                  notification,
                                  column.id as keyof Data
                                )
                              }
                            />
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          // className={classes.tablePagination}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={0}
          rowsPerPage={rowsPerPage}
          page={0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default NotificationTable;

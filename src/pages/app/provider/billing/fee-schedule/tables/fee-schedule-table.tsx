import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { commonWidget, getCustomStyle } from "../../../../../../styles/common";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useState } from "react";
import { feeSchedule } from "../../../../../../mock-data/fee-schudule";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

interface Column {
  id: string;
  label: string;
  minWidth: number | "auto";
  displaySort?: boolean;
}

const columns: Column[] = [
  { id: "codeType", label: "Code Type", minWidth: 50, displaySort: false },
  {
    id: "procedureCode",
    label: "Procedure Code",
    minWidth: 120,
    displaySort: false,
  },
  { id: "provider", label: "Provider", minWidth: 120, displaySort: true },
  { id: "state", label: "State", minWidth: 120, displaySort: true },
  { id: "price", label: "Price", minWidth: 140, displaySort: true },
  { id: "modifiers", label: "Modifiers", minWidth: 100, displaySort: true },
  { id: "ndcCode", label: "NDC Code", minWidth: 80, displaySort: true },
  { id: "ndcUnit", label: "NDC Unit", minWidth: 50, displaySort: false },
  { id: "status", label: "Status", minWidth: 50, displaySort: false },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    // marginTop: '6px',
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
    // marginLeft: '2px',
  },
  tableBodycell: {
    // color: "#1A1A1A80",
    fontSize: "0.875rem",
    padding: "10px !important",
  },
};

function FeeScheduleTable() {
  const classes = commonWidget();
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleEdit = (_col: any) => {};

  return (
    <>
      <Paper
        sx={{
          boxShadow: "none",
          background: "white",
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
                      getCustomStyle(column.id, "procedureCode")
                        ? "left"
                        : "center"
                    }
                  >
                    {column.label}{" "}
                    {column.displaySort && (
                      <SyncAltIcon sx={sxs.iconArrowWort} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableHeadRowContainer}>
              {feeSchedule?.map((schedule: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={schedule?.id}
                  >
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align="center"
                          >
                            <ModeEditOutlineOutlinedIcon
                              onClick={() => handleEdit(schedule)}
                            />
                          </TableCell>
                        );
                      } else if (column.id === "status") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align="center"
                            style={{
                              color:
                                schedule[column.id] == "Active"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {schedule[column.id]}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(column.id, "procedureCode")
                                ? "left"
                                : "center"
                            }
                          >
                            {schedule[column.id]}
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

export default FeeScheduleTable;

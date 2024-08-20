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
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../styles/common";
import { useEffect, useState } from "react";
import { visitNotes } from "../../../../../../../mock-data/visit-notes-list";
import { AssessmentList } from "../../../../../../../mock-data/assessment-list";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Column } from "../../../../../../../components/common/enums-and-interfaces/interfaces";

const columns: Column[] = [
  { id: "type", label: "Type", minWidth: 70, displaySort: false },
  { id: "name", label: "Template Name", minWidth: 150, displaySort: false },
  { id: "createdBy", label: "Created By", minWidth: 100, displaySort: false },
  {
    id: "updatedDate",
    label: "Updated Date",
    minWidth: 50,
    displaySort: false,
  },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
  },
  tableBodycell: {
    fontSize: "0.875rem",
    padding: "12px!important",
    cursor: "pointer",
  },
};

function AssessmentTable() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = commonWidget();

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

  useEffect(() => {
    setTableData(AssessmentList);
  }, [visitNotes]);

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
                      getCustomStyle(column.id, "name") ? "left" : "center"
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
                      if (column.id === "action") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(column.id, "name")
                                ? "left"
                                : "center"
                            }
                          >
                            <ContentCopyIcon />
                            {/* {notification[column.id]} */}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            align={
                              getCustomStyle(column.id, "name")
                                ? "left"
                                : "center"
                            }
                            sx={sxs.tableBodycell}
                          >
                            {notification[column.id]}
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

export default AssessmentTable;

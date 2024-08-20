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
import { TableType } from "../../../../common-files/enums";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Column } from "../../../../../../../components/common/enums-and-interfaces/interfaces";

const columns: Column[] = [
  { id: "type", label: "Title", minWidth: 100, displaySort: false },
  {
    id: "specialities",
    label: "Specialities",
    minWidth: 150,
    displaySort: false,
  },
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
    padding: "12px!important",
    cursor: "pointer",
  },
};

type Props = {
  tableType: TableType;
};

function ReviewAndPhysicalTables(props: Props) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = commonWidget();
  const navigate = useNavigate();

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
    switch (props.tableType) {
      case TableType.ROS:
        setTableData(visitNotes);
        break;
      case TableType.PE:
        setTableData(visitNotes);
        break;
      default:
        break;
    }
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
                      getCustomStyle(column.id, "specialities")
                        ? "left"
                        : "center"
                    }
                    style={{ width: column.minWidth }}
                  >
                    {column.label}{" "}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableHeadRowContainer}>
              {tableData?.map((detail: any) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={detail?.id}
                  >
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <TableCell
                            key={column.id}
                            sx={sxs.tableBodycell}
                            align={
                              getCustomStyle(column.id, "specialities")
                                ? "left"
                                : "center"
                            }
                          >
                            <ContentCopyIcon />
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            onClick={() =>
                              navigate(
                                props.tableType === TableType.ROS
                                  ? "review-details"
                                  : "physical-details",
                                {
                                  state: {
                                    props: props,
                                    data: detail,
                                  },
                                }
                              )
                            }
                            align={
                              getCustomStyle(column.id, "specialities")
                                ? "left"
                                : "center"
                            }
                            sx={sxs.tableBodycell}
                          >
                            {detail[column.id]}
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

export default ReviewAndPhysicalTables;

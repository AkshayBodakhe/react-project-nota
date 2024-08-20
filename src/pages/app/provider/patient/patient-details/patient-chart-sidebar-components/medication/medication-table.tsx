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
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useState } from "react";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../styles/common";
import Loading from "../../../../../../../components/common/spinner/loading";
import AddMedication from "./add-edit-medication";

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    // marginTop: '6px',
    fontSize: "14px",
    transform: "rotate(90deg)",
    // color: "#4C4C4CCC",
    cursor: "pointer",
    // marginLeft: '2px',
  },
  tableBodycell: {
    // color: "#1A1A1A80",
    fontSize: "0.875rem",
    padding: "5px 10px !important",
    // cursor: "pointer",
  },
};

type Props = {
  tableData: any[];
  patientData: any[];
  columns: any[];
  refetch: any;
  isLoading: boolean;
  pagination: any;
  setPagination: any;
};

function MedicationTable(props: Props) {
  const classes = commonWidget();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddMedication, setMedications] = useState(false);
  const [editData, setEditData] = useState({});

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.setPagination({
      ...props.pagination,
      page: newPage,
      size: 10,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    // setPagination(0);
  };

  const handleEdit = (medication: any) => {
    setEditData(medication);
    setMedications(true);
  };

  const handleClose = () => {
    setMedications(false);
    props.refetch();
  };

  return (
    <>
      <Paper
        sx={{
          boxShadow: "none",
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.tableHeadRowContainer}>
                {props.columns.map((column) => (
                  <TableCell
                    align={
                      getCustomStyle(column.id, "name") ? "left" : "center"
                    }
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
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
              {props.tableData &&
                !props.isLoading &&
                props.tableData?.map((med: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={med?.id}>
                      {props.columns.map((column) => {
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
                              <ModeEditOutlineOutlinedIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleEdit(med)}
                              />
                            </TableCell>
                          );
                        } else {
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
                              {med[column.id] || "-"}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {props.isLoading && <Loading />}
          {props.tableData?.length === 0 && !props.isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "4% 0",
              }}
            >
              No Data Available
            </div>
          ) : null}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.pagination.totalElements}
          rowsPerPage={rowsPerPage}
          page={props.pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {openAddMedication && (
        <AddMedication
          isEditData={editData}
          patientData={props}
          open={openAddMedication}
          onClose={handleClose}
          title="Edit Medication"
        />
      )}
    </>
  );
}

export default MedicationTable;

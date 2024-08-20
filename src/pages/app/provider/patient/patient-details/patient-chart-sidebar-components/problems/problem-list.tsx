import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import {
    Box,
    ButtonBase,
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
import EventSucessModal from "../../../../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../../../../components/core/delete-dialog";
import { problemsforms } from "../../../../../../../mock-data/problemstabledetails";
import { formButtonStyle } from "../../../../../../../styles/common";
import AddEditProblem from "./add-edit-problem";

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
    fontWeight: "500 !important",
    fontFamily: "Roboto",
    // color: "#00B917 !important",
  },
  inactiveButton: {
    fontSize: "16px",
    fontWeight: "500 !important",
    fontFamily: "Roboto",
    // color: "#FF3939 !important",
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
  confirm: {},
}));

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}

export const problemsFormColumns: Column[] = [
  { id: "problems", label: "Problems", minWidth: 400 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "diagnoseddate", label: "Diagnosed Date", minWidth: 100 },
  { id: "updateddate", label: "Updated Date", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "note", label: "Note", minWidth: 400 },
  { id: "action", label: "Action", minWidth: 100 },
];

function ProblemList() {
  const classes = tableStyle();
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [problemData, setProblemsData] = useState<Row[]>([]);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
  const [openAddProblem, setAddProblems] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = () => {
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
    // setSuccessMessage("Allergy Deleted Successfully");
  };
  const ButtonBaseStyle = () => {
    return (
      <>
        <Grid sx={{ display: "flex" }}>
          <ButtonBase
            sx={{
              ...formButtonStyle.mainButtonStyle,
            }}
            onClick={() => setIsEditModelOpen(true)}
          >
            <EditIcon
              sx={{ fontSize: "17px !important", marginRight: "5px" }}
            />
            <Typography variant="h6">Edit</Typography>
          </ButtonBase>
          <Grid pl={2}>
            <ButtonBase
              sx={{
                ...formButtonStyle.mainButtonStyle,
              }}
              onClick={handleOpenDeleteDialog}
            >
              <DeleteOutlineIcon
                sx={{ fontSize: "17px !important", marginRight: "5px" }}
              />
              <Typography variant="h6">Delete</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </>
    );
  };

  const ButtonBaseActiveInactiveStyle = (status: any) => {
    return (
      <>
        <ButtonBase>
          {status.status ? (
            <Typography variant="h5" className={classes.activeButton}>
              Active
            </Typography>
          ) : (
            <Typography variant="h5" className={classes.inactiveButton}>
              Inactive
            </Typography>
          )}
        </ButtonBase>
      </>
    );
  };
  const handleClose = () => {
    setAddProblems(false);
    setIsEditModelOpen(false);
  };

  const displayedRows = problemData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  function createProblemsForms(
    problems: string,
    type: string,
    diagnoseddate: string,
    updateddate: string,
    status: boolean,
    note: string,
    action: boolean
  ): Row {
    return {
      problems,
      type,
      diagnoseddate,
      updateddate,
      status,
      note,
      action,
    };
  }

  useEffect(() => {
    const newRows = problemsforms?.content.map((data: any) => {
      return createProblemsForms(
        data.problems,
        data.type,
        data.diagnoseddate,
        data.updateddate,
        data.status,
        data.note,
        data.action
      );
    });
    setProblemsData(newRows);
  }, []);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const openModal = () => {
    setAddProblems(true);
  };

  return (
    <div>
      <>
        <Grid container p={2} pb={0}>
          <Grid container xs={12} justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  color: "#004186",
                  fontWeight: "bold",
                  fontSize: "16px !important",
                }}
              >
                Problems
              </Typography>
            </Grid>
            <Grid item display="flex" gap="20px;">
              <Grid>
                <ButtonBase
                  sx={{
                    ...formButtonStyle.mainButtonStyle,
                  }}
                  onClick={openModal}
                >
                  <AddIcon />
                  <Typography variant="h4">Add Problem</Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mt={1} xs={12} sx={{ marginTop: "20px !important" }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {problemsFormColumns.map((column: any) => (
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
                        {problemsFormColumns.map((column: any) => {
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
                                {/* {column.id === "action" ? ( // <ButtonBaseActiveInactiveStyle status={value} />
                                    <Grid className={classes.confirm}>
                                      <ButtonBase
                                        sx={{
                                          ...formButtonStyle.mainButtonStyle,
                                        }}
                                        onClick={openModal}
                                      >
                                        <CheckIcon sx={{ fontSize: "14px" }} />{" "}
                                        &nbsp;Confirm
                                      </ButtonBase>
                                    </Grid>
                                  ) : (
                                    value
                                  )} */}

                                {column.id === "status" ? (
                                  <ButtonBaseActiveInactiveStyle
                                    status={value}
                                  />
                                ) : column.id === "action" ? (
                                  <ButtonBaseStyle />
                                ) : (
                                  value
                                )}
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
            {Math.min((page + 1) * rowsPerPage, problemData.length)} of{" "}
            {problemData.length} entries
          </Typography>
          <Pagination
            count={Math.ceil(problemData.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
            className={classes.pagination}
            classes={{ root: classes.root }}
            shape="rounded"
          />
        </Box>
        {openAddProblem && (
          <AddEditProblem
            open={openAddProblem}
            onClose={handleClose}
            title="Add Problem"
          />
        )}

        {isEditModalOpen && (
          <AddEditProblem
            open={isEditModalOpen}
            onClose={handleClose}
            title="Edit Problem"
          />
        )}
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete problem"}
          message={"problem"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Problem Added successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </>
    </div>
  );
}

export default ProblemList;

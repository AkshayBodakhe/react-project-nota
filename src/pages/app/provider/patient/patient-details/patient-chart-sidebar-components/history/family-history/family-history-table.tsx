import EditIcon from "@mui/icons-material/EditOutlined";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import EventSucessModal from "../../../../../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../../../../../components/core/delete-dialog";
// import { formButtonStyle } from "../../../../../../../../styles/common";
// import AddEditPastMedicalHistory from "./add-edit-lab-results";
// import { FamilyHistoryData } from "../../../../../../../../mock-data/family-history";
import AddEditFamilyHistory from "./add-edit-family-history";
import { PatientData } from "../../diagnoses";
import Loading from "../../../../../../../../components/common/spinner/loading";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../../styles/common";
import { mmddyyFormat } from "../../../../../../../../components/common/enums-and-interfaces/common-functions";
import CustomPagination from "../../../../../../../../components/common/pagination";
// import AddEditPastMedicalHistory from "./add-edit-past-medical-history";

export const tableStyle = makeStyles(() => ({
  tableHeader: {
    backgroundColor: "#f3f3f3 !important",
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

export const pastMedicalHistoryColumns: Column[] = [
  { id: "name", label: "Problem", minWidth: 200 },
  { id: "relative", label: "Relative", minWidth: 200 },
  { id: "onSetAge", label: "Onset Age", minWidth: 200 },
  { id: "created", label: "Recorded Date", minWidth: 200 },
  { id: "note", label: "Note", minWidth: 300 },
  { id: "action", label: "Action", minWidth: 50 },
];

type TableProps = {
  isLoading: boolean;
  tableData: any[];
  patientData: PatientData;
  pagination: any;
  setPagination: any;
  refetch: any;
};

function FamilyHistoryTable(props: TableProps) {
  const classes = tableStyle();
  const commonStyles = commonWidget();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pastFamilyHistory, setPastMedicalData] = useState<Row[]>([]);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectedFamilyHistory, setSelectedFamilyHistory] = useState("");
  //   const [successMessage, setSuccessMessage] = useState("");
  const [openFamilyHistory, setAddFamilyHistory] = useState(false);

  //   const handleOpenDeleteDialog = () => {
  //     setOpenDeleteDialog(true);
  //   };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = () => {
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
    // setSuccessMessage("Allergy Deleted Successfully");
  };

  // const ButtonBaseActiveInactiveStyle = (status: any) => {
  //   return (
  //     <>
  //       <ButtonBase>
  //         {status.status ? (
  //           <Typography variant="h5" className={classes.activeButton}>
  //             Active
  //           </Typography>
  //         ) : (
  //           <Typography variant="h5" className={classes.inactiveButton}>
  //             Inactive
  //           </Typography>
  //         )}
  //       </ButtonBase>
  //     </>
  //   );
  // };

  const handleClose = () => {
    setAddFamilyHistory(false);
    setIsEditModelOpen(false);
    props.refetch();
  };

  useEffect(() => {
    if (props.tableData) {
      const newRows = props.tableData.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          name: data.name,
          relative: data.relative,
          onSetAge: data.onSetAge,
          diedDate: data.diedDate,
          note: data.note,
          created: data.created,
        };
      });
      setPastMedicalData(newRows);
    }
  }, [props.tableData]);

  const isNotEmpty = pastFamilyHistory
    ?.map((item) => item.name !== "")
    .includes(true);

  const handleChangePage = (_event: any, newPage: number) => {
    props.setPagination((prev: any) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const handleEdit = (familyHistory: any) => {
    setSelectedFamilyHistory(familyHistory);
    setIsEditModelOpen(true);
  };

  return (
    <div>
      <>
        <Grid container p={2} pb={0}>
          <Grid item mt={1} xs={12}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {pastMedicalHistoryColumns.map((column: any) => (
                      <TableCell
                        key={column.id}
                        align={
                          getCustomStyle(column.id, "name") ? "left" : "center"
                        }
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
                  {!props.isLoading &&
                    pastFamilyHistory &&
                    pastFamilyHistory
                      .filter((item) => item.name !== "")
                      .map((row: any, index: any) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {pastMedicalHistoryColumns.map((column: any) => {
                              const value = row[column.id];

                              return (
                                <TableCell
                                  align={
                                    getCustomStyle(column.id, "name")
                                      ? "left"
                                      : "center"
                                  }
                                  key={column.id}
                                  sx={{
                                    padding: "8px",
                                  }}
                                >
                                  <Typography variant="h5">
                                    {column.id === "action" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <EditIcon
                                          sx={{ cursor: "pointer" }}
                                          onClick={() => handleEdit(row)}
                                        />
                                      </div>
                                    ) : column.id === "created" ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {mmddyyFormat(value) || "-"}
                                      </div>
                                    ) : (
                                      value || "-"
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
              {props.isLoading && <Loading />}
              {props.tableData?.length === 0 || !isNotEmpty ? (
                <div className={commonStyles.noDataMsg}>No Data Available</div>
              ) : null}
              <CustomPagination
                pagination={props.pagination}
                setPagination={props.setPagination}
              />
            </TableContainer>
          </Grid>
        </Grid>
        {openFamilyHistory && (
          <AddEditFamilyHistory
            patientData={props?.patientData}
            open={openFamilyHistory}
            onClose={handleClose}
            title="Add Family History"
          />
        )}

        {isEditModalOpen && (
          <AddEditFamilyHistory
            patientData={props?.patientData}
            familyHistory={selectedFamilyHistory}
            open={isEditModalOpen}
            onClose={handleClose}
            title="Edit Family History"
          />
        )}
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete Family History"}
          message={"Family History"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Past Medical History Added Successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </>
    </div>
  );
}

export default FamilyHistoryTable;

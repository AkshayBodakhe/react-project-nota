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
// import AddEditPastMedicalHistory from "./add-edit-lab-results";
// import { pastMedicalDetailsForms } from "../../../../../../../../mock-data/pastMedicalData";
import AddEditSurgicalHistoryTable from "./add-edit-surgical-history";
import { PatientData } from "../../diagnoses";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../../styles/common";
import Loading from "../../../../../../../../components/common/spinner/loading";
import CustomPagination from "../../../../../../../../components/common/pagination";
import moment from "moment";

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

export const pastMedicalHistoryColumns: Column[] = [
  { id: "name", label: "Surgery", minWidth: 200 },
  { id: "date", label: "Surgery Date", minWidth: 250 },
  { id: "recordedDate", label: "Recorded Date", minWidth: 250 },
  { id: "note", label: "Note", minWidth: 250 },
  { id: "action", label: "Action", minWidth: 100 },
];

type TableProps = {
  isLoading: boolean;
  tableData: any[];
  patientData: PatientData;
  pagination: any;
  setPagination: any;
  refetch: any;
};

function PastSurgicalHistoryTable(props: TableProps) {
  const commonStyles = commonWidget();
  const classes = tableStyle();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pastMedicalData, setPastMedicalData] = useState<Row[]>([]);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [surgicalHistory, setSurgicalHistory] = useState("");
  //   const [successMessage, setSuccessMessage] = useState("");
  const [openAddLabResults, setAddLabResults] = useState(false);

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

  const handleClose = () => {
    setAddLabResults(false);
    setIsEditModelOpen(false);
    props.refetch();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    if (props.tableData) {
      const newRows = props.tableData.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          name: data.name,
          recordedDate: moment(data.created).format("MM-DD-YYYY"),
          note: data.note,
          date: data.surgeryDate
            ? moment(data.surgeryDate).format("MM-DD-YYYY")
            : "",
        };
      });
      setPastMedicalData(newRows);
    }
  }, [props]);

  const isNotEmpty = pastMedicalData
    .map((item) => item.name !== "")
    .includes(true);

  const handleEdit = (medicalHistory: any) => {
    setSurgicalHistory(medicalHistory);
    setIsEditModelOpen(true);
  };

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

  return (
    <div>
      <>
        <Grid container p={2} pb={0}>
          <Grid item mt={1} xs={12}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow className={commonStyles.tableHeadRowContainer}>
                    {pastMedicalHistoryColumns.map((column: any) => (
                      <TableCell
                        align={
                          getCustomStyle(column.id, "name") ? "left" : "center"
                        }
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
                <TableBody className={commonStyles.tableHeadRowContainer}>
                  {!props.isLoading &&
                    pastMedicalData &&
                    pastMedicalData
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
                                  key={column.id}
                                  align={
                                    getCustomStyle(column.id, "name")
                                      ? "left"
                                      : "center"
                                  }
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
        {openAddLabResults && (
          <AddEditSurgicalHistoryTable
            patientDetails={props?.patientData}
            open={openAddLabResults}
            onClose={handleClose}
            title="Add Past Surgical History"
          />
        )}

        {isEditModalOpen && (
          <AddEditSurgicalHistoryTable
            patientDetails={props?.patientData}
            surgicalHistory={surgicalHistory}
            open={isEditModalOpen}
            onClose={handleClose}
            title="Edit Past Surgical History"
          />
        )}
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete Past Surgical History"}
          message={"Past Surgical History"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Past Surgical History Added Successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </>
    </div>
  );
}

export default PastSurgicalHistoryTable;

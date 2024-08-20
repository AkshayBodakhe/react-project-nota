import {
  Menu,
  MenuItem,
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
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../../styles/common";
import { tableStyle } from "../lab-order/lab-orders-table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../../../../../../../components/common/spinner/loading";
import { ResultFormType } from "../../enums-interfaces/enums";
import EventSucessModal from "../../../../../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../../../../../components/core/delete-dialog";
import { ModalMessages } from "../../../../../../../../components/common/enums-and-interfaces/enums";
import AddEditLabResult from "./add-edit-lab-result";
import { usePatientLabResultsControllerServiceArchiveLabResults } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PatientLabResultsControllerService } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";

type Props = {
  tableData: any[];
  pagination: any;
  setPagination: any;
  refetch: any;
  isLoading: any;
  patientData: any;
};

export const labResultsFormColumns: any[] = [
  { id: "test", label: "Test", minWidth: 200 },
  { id: "labName", label: "Lab", minWidth: 200 },
  { id: "reviewerName", label: "Reviewer", minWidth: 100 },
  { id: "Results", label: "Results", minWidth: 100 },
  { id: "receivedDate", label: "Received Date", minWidth: 200 },
  { id: "interpretation", label: "Interpretation", minWidth: 200 },
  { id: "action", label: "Action", minWidth: 50 },
];

export default function LabResultsTable(props: Props) {
  const classes = tableStyle();
  const commomClasses = commonWidget();
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalMsg, setModalMsg] = useState("");
  const [result, setResult] = useState<any>("");
  const [modal, setOpenModal] = useState({
    open: false,
    formType: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutateAsync } =
    usePatientLabResultsControllerServiceArchiveLabResults();
  // const { data } = usePatientLabResultsControllerServiceDownloadPatientLabResultsList({
  //     exportType: 'PDF',
  //     patientUuid: props.patientData.uuid
  // });
  // console.log("🚀 ~ file: lab-results-table.tsx:67 ~ LabResultsTable ~ data:", data)

  useEffect(() => {
    if (props.tableData.length) {
      const newRows = props.tableData.map((result: any) => {
        return {
          id: result.id,
          uuid: result.uuid,
          test: result.test,
          reviewer: result.reviewer,
          uploadOption: result.uploadOption,
          reviewerName: `${result.reviewer.firstName} ${result.reviewer.lastName}`,
          patient: result.patient,
          recordedDate: result.recordedDate,
          recordedTime: result.recordedTime,
          resultValue: result.resultValue,
          patientLabOrder: result.patientLabOrder,
          lab: result.labName,
          testName: result.testName,
          labName: result.labName.name,
          unit: result.unit,
          interpretation: result.interpretation,
          note: result.note,
        };
      });
      setTableData(newRows);
    }
  }, [props.tableData]);

  const downloadResultAsPDF = () => {
    const _data =
      PatientLabResultsControllerService.downloadPatientLabResultsList(
        props.patientData.uuid,
        "CSV"
      );
    // console.log("🚀 ~ file: lab-results-table.tsx:99 ~ downloadResultAsPDF ~ data:", data)
  };

  const handleEventSuccessModalOpen = () => {
    setModalMsg(ModalMessages.LAB_RESULT_DELETED);
    try {
      mutateAsync({ patientLabResultUuid: result?.uuid || "" }).then(() => {
        setOpenModal((prev) => ({ ...prev, formType: "SUCCESS" }));
      });
    } catch (error) {
      console.error("Error while deleting lab order :: ", error);
    }
    // setOpenSuccessModal(true);
    // setSuccessMessage("Allergy Deleted Successfully");
  };

  const handleCloseAction = (formType: string, result: any) => {
    setAnchorEl(null);
    setOpenModal({ open: true, formType: formType });
    setResult(result);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    // setOpenModal((prev) => ({...prev , open: true}));
  };

  const handleChangePage = (_event: any, newPage: number) => {
    props.setPagination((prev: any) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleClose = () => {
    setOpenModal((prev) => ({ ...prev, open: false }));
    props.refetch();
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  };

  return (
    <div>
      <>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={commomClasses.tableHeadRowContainer}>
                {labResultsFormColumns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    className={classes.tableHeader}
                    align={
                      getCustomStyle(column.id, "test") ? "left" : "center"
                    }
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
            <TableBody className={commomClasses.tableHeadRowContainer}>
              {tableData &&
                !props.isLoading &&
                tableData.map((row: any, index: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {labResultsFormColumns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={
                              getCustomStyle(column.id, "test")
                                ? "left"
                                : "center"
                            }
                            sx={{
                              padding: "8px",
                            }}
                          >
                            <Typography variant="h5">
                              {column.id === "action" ? (
                                <>
                                  <MoreVertIcon
                                    sx={{ cursor: "pointer", width: "6vw" }}
                                    onClick={handleClick}
                                  />
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleCloseAction}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                  >
                                    <MenuItem
                                      onClick={() =>
                                        handleCloseAction(
                                          ResultFormType.REVIEW,
                                          row
                                        )
                                      }
                                    >
                                      {"Review"}
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handleCloseAction(
                                          ResultFormType.EDIT_LAB_RESULT,
                                          row
                                        )
                                      }
                                    >
                                      {"Edit Result"}
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() => {
                                        handleCloseAction(
                                          ResultFormType.EXPORT_AS_PDF,
                                          row
                                        );
                                        downloadResultAsPDF();
                                      }}
                                    >
                                      {"Export as PDF"}
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handleCloseAction(
                                          ResultFormType.FAX,
                                          row
                                        )
                                      }
                                    >
                                      {"Fax"}
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handleCloseAction(
                                          ResultFormType.DELETE,
                                          row
                                        )
                                      }
                                    >
                                      {"Delete"}
                                    </MenuItem>
                                  </Menu>
                                </>
                              ) : column.id === "interpretation" ? (
                                <Typography
                                  sx={{
                                    color:
                                      value === "ABNORMAL"
                                        ? "#FF3939CC"
                                        : "#00B917",
                                  }}
                                >
                                  {value || "-"}
                                </Typography>
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
          {props.tableData?.length === 0 && !props.isLoading && (
            <div className={commomClasses.noDataMsg}>No Data Available</div>
          )}
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

        {modal.open && (
          <>
            {(() => {
              switch (modal.formType) {
                case ResultFormType.REVIEW:
                  return (
                    <AddEditLabResult
                      open={modal.open}
                      onClose={handleClose}
                      patientData={props.patientData}
                      title={"Add Lab Result"}
                    />
                  );
                case ResultFormType.EDIT_LAB_RESULT:
                  return (
                    <>
                      <AddEditLabResult
                        editData={result}
                        patientData={props.patientData}
                        open={modal.open}
                        onClose={handleClose}
                        title="Edit Lab Result"
                      />
                    </>
                  );
                case ResultFormType.DELETE:
                  return (
                    <>
                      <DeleteDialog
                        open={modal.open}
                        onClose={handleClose}
                        onEventSuccessModalOpen={handleEventSuccessModalOpen}
                        title={"Delete lab result"}
                        message={"lab result"}
                      />
                    </>
                  );
                case "SUCCESS":
                  return (
                    <>
                      <EventSucessModal
                        message={modalMsg}
                        onClose={handleClose}
                      />
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </>
        )}
      </>
    </div>
  );
}

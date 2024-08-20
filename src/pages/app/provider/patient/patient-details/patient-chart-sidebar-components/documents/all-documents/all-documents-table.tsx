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
import React, { useEffect, useState } from "react";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../../styles/common";
import { tableStyle } from "../../allergies/allergies-list";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../../../../../../../components/common/spinner/loading";
import { OrderFormType } from "../../enums-interfaces/enums";
import { PatientDocumentControllerService } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { alertAction } from "../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { DeleteDialog } from "../../../../../../../../components/core/delete-dialog";
import { useDispatch } from "react-redux";
import CustomPagination from "../../../../../../../../components/common/pagination";
import { PaginationState } from "../../../../../../../../components/common/enums-and-interfaces/interfaces";
import { usePatientDocumentControllerServiceGetAllDocumentsOfPatient } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

const cols: any[] = [
  { id: "name", label: "Document Name", minWidht: 200 },
  { id: "type", label: "Document Type", minWidht: 200 },
  { id: "date", label: "Document Date", minWidht: 200 },
  { id: "uploadedBy", label: "Uploaded By", minWidht: 200 },
  { id: "action", label: "Action", minWidht: 200 },
];

type Props = {
  patientData: any;
  pagination: any;
  setPagination: any;
  isLoading: boolean;
  refetch: any;
};

function AllDocumentsTable(props: Props) {
  const dispatch = useDispatch();
  const classes = tableStyle();
  const commomClasses = commonWidget();
  const [tableData, setTableData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDelete, setIsDelete] = useState(false);
  const [tableRes, setTableRes] = useState<any[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });

  //   const getAllDocuments = async () => {
  //     await PatientDocumentControllerService.getAllDocumentsOfPatient(
  //       props.pagination.patientUuid as string,
  //       ...pagination
  //     ).then((res) => {
  //       setTableRes(res?.data?.content);
  //     });
  //   };
  const { data: tabData } =
    usePatientDocumentControllerServiceGetAllDocumentsOfPatient({
      patientUuid: props.pagination.patientUuid as string,
      ...pagination,
      sort:["created,desc"]
    });

  useEffect(() => {
    const newRows =
      tabData &&
      tabData?.data?.content.map((document: any) => {
        return {
          name: document.documentName,
          type: document.documentType.type,
          date: document.recordedDate,
          uploadedBy: document?.createdByName,
          uuid: document.uuid,
          url: document.url,
        };
      });
    setTableData(newRows);
    setPagination({
      ...pagination,
      totalElements: tabData?.data?.totalElements,
      totalPages: tabData?.data?.totalPages,
    });
  }, [tabData]);

  const handleCloseAction = (_formType: string, _order: any) => {
    setAnchorEl(null);
    // setOpenModal({ open: true, formType: formType });
    // setOrder(order);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    // setOpenModal((prev) => ({...prev , open: true}));
  };

  const deleteDocument = async () => {
    setIsDelete(false);
    let response = await PatientDocumentControllerService.archiveDocument(
      selectedDoc?.uuid
    );
    if (response?.message) {
      props.refetch();
      dispatch(
        alertAction.setAlert({
          open: true,
          message: response?.message as unknown as string,
          severity: "success",
        })
      );
    }
  };

  const openDelete = (row: any) => {
    setSelectedDoc(row);
    setIsDelete(true);
  };

  const handleClose = () => {
    setIsDelete(false);
  };

  const openDocumentInNewWindow = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <React.Fragment key={"AllDocumentsTable"}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={commomClasses.tableHeadRowContainer}>
              {cols.map((column: any) => (
                <TableCell
                  key={column.id}
                  className={classes.tableHeader}
                  align={getCustomStyle(column.id, "name") ? "left" : "center"}
                  style={{
                    padding: "10px",
                    minWidth: column.minWidth,
                  }}
                >
                  <Typography variant="h4" className={classes.tableHeaderText}>
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
                    {cols.map((column: any) => {
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
                                      openDocumentInNewWindow(row.url)
                                    }
                                  >
                                    {"View"}
                                  </MenuItem>
                                  <MenuItem onClick={() => openDelete(row)}>
                                    {"Delete"}
                                  </MenuItem>
                                </Menu>
                              </>
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
        {tableData?.length === 0 && !props.isLoading && (
          <div className={commomClasses.noDataMsg}>No Data Available</div>
        )}
      </TableContainer>
      {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.pagination.totalElements}
                rowsPerPage={rowsPerPage}
                page={props.pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
      <CustomPagination pagination={pagination} setPagination={setPagination} />

      {isDelete && (
        <DeleteDialog
          open={isDelete}
          onClose={handleClose}
          onEventSuccessModalOpen={deleteDocument}
          title={"Delete Document"}
          message={"Document"}
        />
      )}
    </React.Fragment>
  );
}

export default AllDocumentsTable;

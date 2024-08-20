// import AddIcon from "@mui/icons-material/Add";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import EditIcon from "@mui/icons-material/EditOutlined";
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
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import EventSucessModal from "../../../../../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../../../../../components/core/delete-dialog";
// import { labdetailsforms } from "../../../../../../../../mock-data/labtabledetails";
import { commonWidget, getCustomStyle } from "../../../../../../../../styles/common";
import AddEditLabOrders from "./forms/add-edit-lab-order";
import Loading from "../../../../../../../../components/common/spinner/loading";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OrderFormType } from "../../enums-interfaces/enums";
import { usePatientLabOrderControllerServiceDeletePatientLabOrder } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { ModalMessages } from "../../../../../../../../components/common/enums-and-interfaces/enums";

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

export const labResultsFormColumns: any[] = [
  { id: "labType", label: "Lab Type", minWidth: 100 },
  { id: "Appointment", label: "Appointment", minWidth: 200 },
  { id: "Provider", label: "Provider", minWidth: 100 },
  { id: "collectionDateTime", label: "Date", minWidth: 100 },
  { id: "Test Description", label: "Test Description", minWidth: 200 },
  { id: "Requisition Form", label: "Requisition Form", minWidth: 100 }, ,
  { id: "status", label: "Status", minWidth: 50 },
  { id: "action", label: "Action", minWidth: 50 }
];

type Props = {
  patientDetails: any;
  tableData: any[];
  pagination: any;
  setPagination: any;
  isLoading: boolean;
  refetch: any;
}

function LabOrdersTable(props: Props) {

  const classes = tableStyle();
  const commomClasses = commonWidget();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [labData, setLabData] = useState<Row[]>([]);
  const [order, setOrder] = useState<any>('');
  const [modalMsg, setModalMsg] = useState('');
  const [modal, setOpenModal] = useState({
    open: false,
    formType: ''
  });
  // const [openSuccessModal, setOpenSuccessModal] = useState(false);
  //   const [successMessage, setSuccessMessage] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const handleOpenDeleteDialog = () => {
  //   setOpenDeleteDialog(true);
  // };

  const { mutateAsync, isError } = usePatientLabOrderControllerServiceDeletePatientLabOrder();

  useEffect(() => {
    if (props.tableData) {
      const newRows = props.tableData?.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          labdescription: data.labdescription,
          tests: data.tests,
          chartNote: data.chartNote,
          billTypes: data.billTypes,
          diagnosticCentre: data.diagnosticCentre,
          location: data.location,
          labInstructions: data.labInstructions,
          patientInstructions: data.patientInstructions,
          status: data.status,
          reminderTime: data.reminderTime,
          collectionDateTime: data.collectionDateTime,
          action: data.action
        };
      });
      setLabData(newRows);
    }
  }, [props.tableData]);

  useEffect(() => {
    if (isError) handleEventSuccessModalOpen;
  }, [])

  const handleEventSuccessModalOpen = () => {
    setModalMsg(ModalMessages.LAB_DELETED);
    try {
      mutateAsync({ patientLabOrderUuid: order.uuid }).then(() => {
        props.refetch();
        setOpenModal((prev) => ({ ...prev, formType: 'SUCCESS' }))
      })
    } catch (error) {
      console.error("Error while deleting lab order :: ", error);
    }
    // setOpenSuccessModal(true);
    // setSuccessMessage("Allergy Deleted Successfully");
  };

  const handleCloseAction = (formType: string, order: any) => {
    setAnchorEl(null);
    setOpenModal({ open: true, formType: formType });
    setOrder(order);
  }

  const handleClose = () => {
    setOpenModal((prev) => ({ ...prev, open: false }));
    props.refetch();
  };

  const handleChangePage = (_event: any, newPage: number) => {
    props.setPagination((prev: any) => ({
      ...prev,
      page: newPage
    }))

  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    // setOpenModal((prev) => ({...prev , open: true}));
  };

  // const openModal = () => {
  //   setAddLabResults(true);
  // };

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
                    align={getCustomStyle(column.id, 'labType') ? 'left' : 'center'}
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
              {labData && !props.isLoading && labData.map((row: any, index: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {labResultsFormColumns.map((column: any) => {
                      const value = row[column.id];

                      return (
                        <TableCell
                          key={column.id}
                          align={getCustomStyle(column.id, 'labType') ? 'left' : 'center'}
                          sx={{
                            padding: "8px",
                          }}
                        >
                          <Typography variant="h5">
                            {column.id === "action" ? (
                              <>
                                <MoreVertIcon sx={{ cursor: 'pointer', width: '6vw' }} onClick={handleClick} />
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleCloseAction}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                >
                                  <MenuItem onClick={() => handleCloseAction(OrderFormType.ADD_RESULT, row)}>
                                    {'Add Result'}
                                  </MenuItem>
                                  <MenuItem onClick={() => handleCloseAction(OrderFormType.EDIT_ORDER, row)}>
                                    {'Edit Order'}
                                  </MenuItem>
                                  <MenuItem onClick={() => handleCloseAction(OrderFormType.PRINT_ORDER, row)}>
                                    {'Print Order'}
                                  </MenuItem>
                                  <MenuItem onClick={() => handleCloseAction(OrderFormType.FAX_ORDER, row)}>
                                    {'Fax Order'}
                                  </MenuItem>
                                  <MenuItem onClick={() => handleCloseAction(OrderFormType.MARK_AS_COMPLETED, row)}>
                                    {'Mark As Completed'}
                                  </MenuItem>
                                  <MenuItem onClick={() => handleCloseAction(OrderFormType.DELETE_ORDER, row)}>
                                    {'Delete Order'}
                                  </MenuItem>
                                </Menu>
                              </>
                            ) : (
                              value || '-'
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
                case OrderFormType.ADD_RESULT:
                  return (
                    <AddEditLabOrders
                      patientData={props.patientDetails}
                      open={modal.open}
                      onClose={handleClose}
                      title="Lab Requisition Form"
                    />
                  )
                case OrderFormType.EDIT_ORDER:
                  return (
                    <AddEditLabOrders
                      editData={order}
                      patientData={props.patientDetails}
                      open={modal.open}
                      onClose={handleClose}
                      title="Edit Lab Requisition Form"
                    />
                  );
                case OrderFormType.DELETE_ORDER:
                  return (
                    <DeleteDialog
                      open={modal.open}
                      onClose={handleClose}
                      onEventSuccessModalOpen={handleEventSuccessModalOpen}
                      title={"Delete lab order"}
                      message={"lab order"}
                    />
                  );
                case 'SUCCESS':
                  return (
                    <EventSucessModal
                      message={modalMsg}
                      onClose={handleClose}
                    />
                  )
                default:
                  return null;
              }
            })()}
          </>
        )}

        {/* {openAddLabResults && (
          <AddEditLabResults
            patientData={props.patientDetails}
            open={openAddLabResults}
            onClose={handleClose}
            title="Lab Requisition Form"
          />
        )}

        {isEditModalOpen && (
          <AddEditLabResults
            patientData={props.patientDetails}
            open={isEditModalOpen}
            onClose={handleClose}
            title="Edit Lab Result"
          />
        )}
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete lab result"}
          message={"lab result"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Lab Result Added Successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )} */}
      </>
    </div>
  );
}

export default LabOrdersTable;

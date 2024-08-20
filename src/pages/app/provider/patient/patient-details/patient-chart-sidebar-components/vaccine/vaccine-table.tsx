import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  ButtonBase,
  Fade,
  Grid,
  Menu,
  MenuItem,
  Popper,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import EventSucessModal from "../../../../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../../../../components/core/delete-dialog";
import {
  commonWidget,
  formButtonStyle,
  getCustomStyle,
} from "../../../../../../../styles/common";
import AddEditVaccine from "./add-edit-vaccine";
import { PatientData } from "../diagnoses";
import {
  useVaccineControllerServiceArchivePatientVaccine,
  useVaccineControllerServiceGetPatientVaccineDetails,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import Loading from "../../../../../../../components/common/spinner/loading";
import { UI } from "../../../../../admin/settings/roles-responsibility/roles-responsibility-table";
import ViewVaccineDetails from "./view-vaccine-details";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { calculateAge } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import CustomPagination from "../../../../../../../components/common/pagination";
import { transformText } from "../../../../../../../components/common/helper";
import moment from "moment";

export interface PaginationState {
  page: number;
  size: number;
  uuid: string;
  sortBy: string;
  sortDirection: string;
  searchString: string;
  status?: boolean;
  state?: string;
  totalPages: number;
  totalElements: number;
}

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

const sxs = {
  action: {
    width: "100%",
    cursor: "pointer",
    border: "none",
    background: "white",
    padding: "5px",
  },
  actionBox: {
    border: 1,
    p: 1,
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    width: "4vw",
    alignItems: "center",
  },
};
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export enum ActionType {
  EDIT = "Edit",
  VIEW = "View",
  DELETE = "Delete",
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}

export const vaccinesFormColumns: Column[] = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "vaccine", label: "Vaccine Name", minWidth: 180 },
  { id: "route", label: "Route", minWidth: 50 },
  { id: "site", label: "Site", minWidth: 50 },
  { id: "administerDate", label: "Administered Date", minWidth: 135 },
  { id: "age", label: "Age", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 145 },
  { id: "action", label: "Action", minWidth: 50 },
];

function VaccineTable(props: PatientData) {
  const rolesStyle = UI();
  const classes = tableStyle();
  const commomClasses = commonWidget();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsActionModelOpen] = useState(false);
  const [formType, setFormType] = useState<ActionType>(ActionType.EDIT);
  const [vaccine, setVaccine] = useState<any>("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openAddVaccine, setAddAllergies] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [viewVaccine, setViewVaccine] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    uuid: props?.patientData?.uuid,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const { refetch, data, isLoading } =
    useVaccineControllerServiceGetPatientVaccineDetails({
      page: pagination.page,
      size: pagination.size,
      uuid: props?.patientData?.uuid,
    });
  const { mutateAsync } = useVaccineControllerServiceArchivePatientVaccine();

  useEffect(() => {
    if (data?.data && data.data?.content) {
      const newRows = data.data?.content.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          type: data.type,
          vaccineName: data.vaccine.name,
          vaccine: data.vaccine,
          administerDate: data.administerDate,
          administerTime: data.administerTime,
          administeredByName: `${data.administeredBy.firstName} ${data.administeredBy.lastName}`,
          administeredBy: data.administeredBy,
          orderedBy: data.orderedBy,
          ndcCode: data.ndcCode,
          lot: data.lot,
          dose: data.dose,
          units: data.units,
          manufacturer: data.manufacturer,
          expiryDate: data.expiryDate,
          route: data.route,
          site: data.site,
          reaction: data.reaction,
          reason: data.reason,
          note: data.note,
          dob: data?.patient?.birthDate,
        };
      });
      setTableData(newRows);
      setPagination((prev) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [data?.data, formType, isModalOpen]);

  const handleCloseDeleteDialog = () => {
    setIsActionModelOpen(false);
    //setOpen(false);
  };

  const handleEventSuccessModalOpen = () => {
    deleteVaccine();
    setOpenSuccessModal(true);
    setIsActionModelOpen(false);
    //setOpen(false);
    // setSuccessMessage("Allergy Deleted Successfully");
  };

  const handleClose = () => {
    setAddAllergies(false);
    setIsActionModelOpen(false);
    //setOpen(false);
    refetch();
  };

  const handleChangePage = (_event: any, newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleClick = (event: any, index: number) => {
    setAnchorEl(event.currentTarget);
    //setOpen(true);
    setSelectedIndex(index);
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(20);
  };

  const handleAction = (actionType: ActionType) => {
    setVaccine(tableData[selectedIndex]);
    setFormType(actionType);
    setIsActionModelOpen(true);
    setAnchorEl(null);
  };

  const openModal = () => {
    setAddAllergies(true);
  };

  const editVaccine = () => {
    setFormType(ActionType.EDIT);
    setIsActionModelOpen(true);
    setVaccine(tableData[selectedIndex]);
    setAnchorEl(null);
  };

  const viewVaccineDetails = () => {
    setIsActionModelOpen(true);
    setFormType(ActionType.VIEW);
    setViewVaccine(true);
    setVaccine(tableData[selectedIndex]);
    setAnchorEl(null);
  };

  const handleCloseView = () => {
    setIsActionModelOpen(false);
    //setOpen(false);
    setViewVaccine(false);
  };

  function deleteVaccine() {
    mutateAsync({ patientVaccineUuid: vaccine.uuid }).then((res: any) => {
      refetch();
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message,
          severity: "success",
        })
      );
    });
  }

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
                Vaccines
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
                  <AddIcon sx={{ fontSize: "20px" }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Add Vaccine
                  </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            mt={1}
            xs={12}
            sx={{
              maxHeight: "605px !important",
              overflowY: "scroll",
              marginTop: "20px !important",
            }}
          >
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow className={commomClasses.tableHeadRowContainer}>
                    {vaccinesFormColumns.map((column: any) => (
                      <TableCell
                        key={column.id}
                        align={
                          getCustomStyle(column.id, "vaccine")
                            ? "left"
                            : "center"
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
                <TableBody className={commomClasses.tableHeadRowContainer}>
                  {tableData.map((row: any, index: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {vaccinesFormColumns.map((column: any) => {
                          const value = row[column.id];
                          if (column.id === "vaccine") {
                            return (
                              <TableCell
                                key={column.id}
                                align={
                                  getCustomStyle(column.id, "vaccine")
                                    ? "left"
                                    : "center"
                                }
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    padding: "10px 0",
                                    fontSize: "17px !important",
                                  }}
                                >
                                  {value.name || "-"}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box>
                                    <span
                                      style={{
                                        fontWeight: "300",
                                        color: "gray",
                                      }}
                                    >
                                      Dosages :{" "}
                                    </span>{" "}
                                    {row.dose || "-"}
                                  </Box>
                                  {/* <Box>
                                    <span
                                      style={{
                                        fontWeight: "300",
                                        color: "gray",
                                      }}
                                    >
                                      Route :{" "}
                                    </span>{" "}
                                    {row.route || "-"}
                                  </Box>
                                  <Box>
                                    <span
                                      style={{
                                        fontWeight: "300",
                                        color: "gray",
                                      }}
                                    >
                                      Site :{" "}
                                    </span>{" "}
                                    {row?.site?.replace("_", " ") || "-"}
                                  </Box> */}
                                </Typography>
                              </TableCell>
                            );
                          } else if (column.id === "status") {
                            return (
                              <TableCell
                                align={
                                  getCustomStyle(column.id, "vaccine")
                                    ? "left"
                                    : "center"
                                }
                                key={column.id}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{ padding: "10px 0" }}
                                >
                                  {row.type
                                    ?.toLowerCase()
                                    ?.replace(/^\w/, (match: string) =>
                                      match.toUpperCase()
                                    ) || "-"}
                                </Typography>
                                <Typography variant="h5">
                                  <span
                                    style={{ fontWeight: "300", color: "gray" }}
                                  >
                                    By - {row.administeredByName || "-"}
                                  </span>
                                </Typography>
                              </TableCell>
                            );
                          } else if (column.id === "age") {
                            return (
                              <TableCell
                                align={
                                  getCustomStyle(column.id, "vaccine")
                                    ? "left"
                                    : "center"
                                }
                                key={column.id}
                              >
                                {calculateAge(row?.dob) || "-"}
                              </TableCell>
                            );
                          } else if (
                            column.id === "route" ||
                            column.id === "site"
                          ) {
                            return (
                              <TableCell
                                align={
                                  getCustomStyle(column.id, "vaccine")
                                    ? "left"
                                    : "center"
                                }
                                key={column.id}
                              >
                                {transformText(value || "")}
                              </TableCell>
                            );
                          } else if (column.id === "action") {
                            return (
                              <TableCell sx={{ textAlign: "center" }}>
                                <Grid>
                                  <MoreVertIcon
                                    sx={{ cursor: "pointer", width: "6vw" }}
                                    onClick={(e) => handleClick(e, index)}
                                  />
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                  >
                                    <MenuItem
                                      className={rolesStyle.menuStyle}
                                      onClick={viewVaccineDetails}
                                    >
                                      View
                                    </MenuItem>
                                    <MenuItem
                                      className={rolesStyle.menuStyle}
                                      onClick={editVaccine}
                                    >
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      className={rolesStyle.menuStyle}
                                      onClick={() =>
                                        handleAction(ActionType.DELETE)
                                      }
                                    >
                                      Delete
                                    </MenuItem>
                                  </Menu>
                                </Grid>
                              </TableCell>
                            );
                          } else if (column.id === "administerDate") {
                            return (
                              <TableCell
                                align={
                                  getCustomStyle(column.id, "vaccine")
                                    ? "left"
                                    : "center"
                                }
                                key={column.id}
                              >
                                {moment(value).format("MM-DD-YYYY") || "-"}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                align={
                                  getCustomStyle(column.id, "vaccine")
                                    ? "left"
                                    : "center"
                                }
                                key={column.id}
                              >
                                {value || "-"}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {isLoading && <Loading />}
              {tableData?.length === 0 && !isLoading ? (
                <div className={commomClasses.noDataMsg}>No Data Available</div>
              ) : null}
            </TableContainer>
            <CustomPagination
              pagination={pagination}
              setPagination={setPagination}
            />
            {/* <TablePagination
              // className={classes.tablePagination}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={pagination.totalElements || 0}
              rowsPerPage={rowsPerPage}
              page={pagination.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Grid>
        </Grid>
        {openAddVaccine && (
          <AddEditVaccine
            patientData={props?.patientData}
            open={openAddVaccine}
            onClose={handleClose}
            title="Add Vaccine"
          />
        )}
        {isModalOpen && (
          <>
            {(() => {
              switch (formType) {
                case ActionType.EDIT:
                  return (
                    <AddEditVaccine
                      vaccineUuid={vaccine}
                      patientData={props?.patientData}
                      open={isModalOpen}
                      onClose={handleClose}
                      title="Edit Vaccine"
                    />
                  );
                case ActionType.DELETE:
                  return (
                    <DeleteDialog
                      open={isModalOpen}
                      onClose={handleCloseDeleteDialog}
                      onEventSuccessModalOpen={handleEventSuccessModalOpen}
                      title={"Delete vaccine"}
                      message={"vaccine"}
                    />
                  );
                default:
                  return (
                    <ViewVaccineDetails
                      open={viewVaccine}
                      vaccine={vaccine}
                      onClose={handleCloseView}
                    />
                  );
              }
            })()}
          </>
        )}

        {openSuccessModal && (
          <EventSucessModal
            message="Vaccine Deleted successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </>
    </div>
  );
}

export default VaccineTable;

import AddIcon from "@mui/icons-material/Add";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import {
  ButtonBase,
  Grid,
  Menu,
  MenuItem,
  Select,
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
import EventSucessModal from "../../../../../../../components/common/success-modal";
// import { DeleteDialog } from "../../../../../../../components/core/delete-dialog";
// import { allergiesforms } from "../../../../../../../mock-data/allergiestabledetails";
import {
  formButtonStyle,
  getCustomStyle,
} from "../../../../../../../styles/common";
import AddAllergies from "./add-allergies";
import { useAllergyControllerServiceGetPatientAllergies } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import Loading from "../../../../../../../components/common/spinner/loading";
import { PatientData } from "../diagnoses";
import { capitalizeInitial } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UI } from "../../../../../admin/settings/roles-responsibility/roles-responsibility-table";
import { DeleteDialog } from "../../../../../../../components/core/delete-dialog";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { toCamelCase } from "../../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { style } from "../../../../referral/style/common-style";
import { AllergyControllerService } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import CustomPagination from "../../../../../../../components/common/pagination";

export const tableStyle = makeStyles(() => ({
  tableHeader: {
    backgroundColor: "#F3F3F3 !important",
  },
  tableHeaderText: {
    fontWeight: "600  !important",
    // color: "#1A1A1A99",
    // fontSize: "16px !important",
  },
  tableRow: {
    color: "#1A1A1A99 !important",
  },
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
    fontSize: "14px !important",
  },
  buttonTypo: {
    color: "#36588C !important",
    // fontWeight: "bold !important",
    fontSize: "16px !important",
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
    color: "#00B917 !important",
  },
  inactiveButton: {
    fontSize: "16px",
    fontWeight: "500 !important",
    fontFamily: "Roboto",
    color: "#FF3939 !important",
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

export const allergiesFormColumns: Column[] = [
  { id: "id", label: "No", minWidth: 70 },
  { id: "type", label: "Allery Type", minWidth: 100 },
  { id: "allergies", label: "Allergies", minWidth: 150 },
  { id: "reaction", label: "Reaction", minWidth: 150 },
  { id: "severity", label: "Severity", minWidth: 150 },
  { id: "setDate", label: "Onset Date", minWidth: 150 },
  { id: "recordedDate", label: "Recorded Date", minWidth: 150 },
  { id: "recordedBy", label: "Recorded By", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
  { id: "action", label: "Action", minWidth: 50 },
];

interface Allergy {
  allergyUuid: string;
}

function AllergyList(props: PatientData) {
  const rolesStyle = UI();
  const classes = tableStyle();
  const UIClass = style();
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState({
    patientUuid: props?.patientData?.uuid,
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });
  const rowsPerPage = 10;
  const dispatch = useDispatch();
  const [AllergyData, setAllergyData] = useState<any>([]);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [allergyUuid, setAllergyUuid] = useState<string>("");
  //   const [successMessage, setSuccessMessage] = useState("");
  const [openAddAllergies, setAddAllergies] = useState(false);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState<any>("All");
  const statusList = ["All", "Active", "Inactive"];
  const { data, isLoading, refetch } =
    useAllergyControllerServiceGetPatientAllergies({
      ...pagination,
      patientUuid: props?.patientData?.uuid,
      status: filter == "All" ? undefined : filter == "Active" ? true : false,
    });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [editAllergyData, setEditAllergyData] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const deleteAllergy = async (id: string) => {
    await AllergyControllerService.archivePatientAllergies(id).then(
      (res: any) => {
        refetch();
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      }
    );
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = () => {
    const uuid = AllergyData[selectedIndex]?.uuid || "";
    deleteAllergy(uuid);
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
  };

  const handleEditForm = (uuid: string) => {
    setAllergyUuid(uuid);
    setIsEditModelOpen(true);
  };

  useEffect(() => {
    if (reload) {
      refetch();
    }
  }, [reload]);

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
    setAddAllergies(false);
    setIsEditModelOpen(false);
  };

  const displayedRows = AllergyData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  useEffect(() => {
    if (data?.data) {
      const newRows = data.data.content?.map((data: any) => {
        return {
          id: data.id,
          uuid: data.uuid,
          type: capitalizeInitial(data.allergyType),
          allergy: data?.allergy,
          allergies: data?.allergy,
          reaction: data.reaction,
          severity: data?.severity,
          setDate: data.onSetDate,
          recordedDate: data.recordedDate?.slice(0, 10),
          recordedBy: data.recordedBy,
          status: data.status,
          note: data.note,
        };
      });
      setAllergyData(newRows);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data?.totalPages,
        totalElements: data.data?.totalElements,
      }));
    }
  }, [data?.data]);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = () => {};

  const openModal = () => {
    setAddAllergies(true);
  };

  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const editAllergy = () => {
    setIsEditModelOpen(true);
    setEditAllergyData(AllergyData[selectedIndex]);
  };

  return (
    <div>
      <>
        <Grid container p={2} pb={0}>
          <Grid
            container
            xs={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography
                variant="h4"
                sx={{
                  color: "#004186",
                  fontWeight: "bold",
                  fontSize: "16px !important",
                }}
              >
                Allergies
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Grid item xs={4}>
                <Select
                  className={UIClass.selectInputStyle}
                  value={filter}
                  name="status"
                  onChange={(e: any) => setFilter(e.target.value)}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span>
                          <Typography
                            variant="h5"
                            sx={{
                              color: "#1A1A1A80 !important",
                            }}
                          >
                            Select Status
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {statusList.map((data: any) => {
                    return (
                      <MenuItem
                        key={data}
                        value={data}
                        className={UIClass.menuItemColorStyle}
                      >
                        {data}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item>
                <ButtonBase
                  sx={{
                    ...formButtonStyle.mainButtonStyle,
                    height: "42px",
                  }}
                  onClick={openModal}
                >
                  <AddIcon sx={{ fontSize: "20px" }} />
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Add Allergies
                  </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mt={1} xs={12} sx={{ marginTop: "20px" }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {allergiesFormColumns.map((column: any) => {
                      return (
                        <TableCell
                          align={
                            getCustomStyle(column.id, "type")
                              ? "left"
                              : "center"
                          }
                          key={column.id}
                          className={classes.tableHeader}
                          style={{
                            padding: "10px",
                            minWidth: column.minWidth,
                          }}
                        >
                          <Typography
                            variant="h5"
                            className={classes.tableHeaderText}
                          >
                            {column.label}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRows &&
                    !isLoading &&
                    displayedRows.map((row: any, index: any) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {allergiesFormColumns.map((column: any) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={
                                  getCustomStyle(column.id, "type")
                                    ? "left"
                                    : "center"
                                }
                                sx={{
                                  padding: "8px",
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
                                    <Grid>
                                      <MoreVertIcon
                                        sx={{
                                          cursor: "pointer",
                                          width: "6vw",
                                        }}
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
                                          onClick={editAllergy}
                                        >
                                          Edit
                                        </MenuItem>
                                        <MenuItem
                                          className={rolesStyle.menuStyle}
                                          onClick={handleOpenDeleteDialog}
                                        >
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                    </Grid>
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
              {isLoading && <Loading />}
              {AllergyData.length === 0 && !isLoading && (
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
              )}
            </TableContainer>
            {/* <TablePagination
              // className={classes.tablePagination}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={0}
              rowsPerPage={rowsPerPage}
              page={0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            <CustomPagination
              pagination={pagination}
              setPagination={setPagination}
            />
          </Grid>
        </Grid>
        {/* <Box className={classes.paginationBox} pl={2}>
          <Typography variant="h6" className={classes.paginationTypo}>
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, AllergyData.length)} of{" "}
            {AllergyData.length} entries
          </Typography>
          <Pagination
            count={Math.ceil(AllergyData.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
            className={classes.pagination}
            classes={{ root: classes.root }}
            shape="rounded"
          />
        </Box> */}
        {openAddAllergies && (
          <AddAllergies
            open={openAddAllergies}
            patientDetails={props?.patientData}
            onClose={handleClose}
            title="Add Allergy"
            refetch={setReload}
          />
        )}

        {isEditModalOpen && (
          <AddAllergies
            patientDetails={props?.patientData}
            open={isEditModalOpen}
            allergyUuid={allergyUuid}
            onClose={handleClose}
            editAllergyData={editAllergyData}
            title="Edit Allergy"
            refetch={refetch}
          />
        )}

        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete Allergy"}
          message={"allergy"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Allergy deleted successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </>
    </div>
  );
}

export default AllergyList;

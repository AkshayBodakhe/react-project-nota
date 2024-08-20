import {
  Grid,
  Menu,
  MenuItem,
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
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../../../styles/common";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Loading from "../../../../../../../../../components/common/spinner/loading";
import { useState } from "react";
import AddMedication from "../../add-edit-medication";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UI } from "../../../../../../../admin/settings/roles-responsibility/roles-responsibility-table";
import { DeleteDialog } from "../../../../../../../../../components/core/delete-dialog";
import EventSucessModal from "../../../../../../../../../components/common/success-modal";
import { alertAction } from "../../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { MedicationsControllerService } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import CustomPagination from "../../../../../../../../../components/common/pagination";
import dayjs from "dayjs";

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
  const rolesStyle = UI();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddMedication, setMedications] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [editData, setEditData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const editMedication = () => {
    setMedications(true);
    setEditData(props.tableData[selectedIndex]);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const deleteMedication = async (id: string) => {
    await MedicationsControllerService.archivePatientMedication(id);
    props.refetch();
    // .then(
    //   (res: any) => {
    //     props.refetch();
    //     dispatch(
    //       alertAction.setAlert({
    //         open: true,
    //         message: res.message,
    //         severity: "success",
    //       })
    //     );
    //   }
    // );
  };

  const handleEventSuccessModalOpen = () => {
    let uuid = props.tableData[selectedIndex]?.uuid;
    deleteMedication(uuid);
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
  };

  const getFormattedDate = (formDate: any) => {
    if (!formDate) return "-";
    return dayjs(formDate).format("MM/DD/YYYY");
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
                {props.columns.map((column) => {
                  return (
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
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableHeadRowContainer}>
              {props.tableData &&
                !props.isLoading &&
                props.tableData?.map((med: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={med?.id}>
                      {props.columns.map((column) => {
                        if (column.id === "action") {
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
                                    onClick={editMedication}
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
                            </TableCell>
                          );
                        } else if (column.id === "pastAction") {
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
                                    onClick={editMedication}
                                  >
                                    Add to current medication
                                  </MenuItem>
                                </Menu>
                              </Grid>
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
                              {column.id === "startDate" ||
                              column.id === "endDate"
                                ? med[column.id]
                                : med[column.id] || "-"}
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
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.pagination.totalElements}
          rowsPerPage={rowsPerPage}
          page={props.pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        <CustomPagination
          pagination={props.pagination}
          setPagination={props.setPagination}
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

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onEventSuccessModalOpen={handleEventSuccessModalOpen}
        title={"Delete Medication"}
        message={"Medication"}
      />

      {openSuccessModal && (
        <EventSucessModal
          message="Medication deleted successfully"
          onClose={() => setOpenSuccessModal(false)}
        />
      )}
    </>
  );
}

export default MedicationTable;

import {
  ButtonBase,
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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  commonWidget,
  getCustomStyle,
} from "../../../../../../../../styles/common";
import Loading from "../../../../../../../../components/common/spinner/loading";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddEditDiagnosesModal from "../add-edit-diagnoses-modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UI } from "../../../../../../admin/settings/roles-responsibility/roles-responsibility-table";
import { DeleteDialog } from "../../../../../../../../components/core/delete-dialog";
import EventSucessModal from "../../../../../../../../components/common/success-modal";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { mmddyyFormat } from "../../../../../../../../components/common/enums-and-interfaces/common-functions";
import { ProblemsControllerService } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import CustomPagination from "../../../../../../../../components/common/pagination";

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    fontSize: "14px",
    transform: "rotate(90deg)",
    cursor: "pointer",
  },
  tableBodycell: {
    fontSize: "0.875rem",
    padding: "5px 10px !important",
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
};

const columns: any[] = [
  { id: "id", label: "No", minWidth: 50, displaySort: false },
  { id: "name", label: "Diagnoses", minWidth: 80, displaySort: false },
  { id: "type", label: "Type", minWidth: 50, displaySort: false },
  {
    id: "diagnosedDate",
    label: "Onset Date",
    minWidth: 100,
    displaySort: false,
  },
  {
    id: "recordedDate",
    label: "Recorded Date",
    minWidth: 80,
    displaySort: false,
  },
  // { id: "resolvedDate", label: "Resolve Date", minWidth: 140, displaySort: false },
  { id: "status", label: "Status", minWidth: 50, displaySort: false },
  { id: "note", label: "Note", minWidth: 150, displaySort: false },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

type Props = {
  pagination: any;
  setPagination: any;
  tableData: any[];
  isLoading: boolean;
  patientDetails: any;
  refetch: any;
};

function DiagnosesTable(props: Props) {
  const classes = commonWidget();
  const rolesStyle = UI();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<any[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editDiagnoses, setDiagnoses] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  useEffect(() => {
    const rows = props.tableData.map((res) => {
      return {
        id: res.id,
        uuid: res.uuid,
        active: res.active,
        name: res.billingCodes,
        type: res.type,
        diagnosedDate: res.diagnosedDate,
        recordedDate: res.recordedDate,
        resolvedDate: res.resolvedDate,
        note: res.note,
        status: res.active,
      };
    });
    setTableData(rows);
  }, [props]);

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

  const handleEditDiagnoses = (diagnoses: any) => {
    setOpenEditModal(true);
    setDiagnoses(diagnoses);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    // setPagination(0);
  };

  const handleClose = () => {
    setOpenEditModal(false);
    props.refetch();
  };

  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const editAllergy = () => {
    setOpenEditModal(true);
    setDiagnoses(tableData[selectedIndex]);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = () => {
    let uuid = tableData[selectedIndex]?.uuid;
    deleteProblem(uuid);
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const deleteProblem = async (id: string) => {
    await ProblemsControllerService.archivePatientProblems(id).then(
      (res: any) => {
        props.refetch();
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

  const ButtonBaseActiveInactiveStyle = (status: any) => {
    return (
      <>
        <ButtonBase>
          {status.status ? (
            <Typography variant="h5" sx={sxs.activeButton}>
              Active
            </Typography>
          ) : (
            <Typography variant="h5" sx={sxs.inactiveButton}>
              Historical
            </Typography>
          )}
        </ButtonBase>
      </>
    );
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
                {columns.map((column) => {
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
              {tableData &&
                !props.isLoading &&
                tableData?.map((diagnoses: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={diagnoses?.id}
                    >
                      {columns.map((column) => {
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
                            </TableCell>
                          );
                        } else if (column.id === "status") {
                          return (
                            <TableCell>
                              <ButtonBaseActiveInactiveStyle
                                status={diagnoses[column.id]}
                              />
                            </TableCell>
                          );
                        } else if (column.id === "name") {
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
                              {diagnoses[column.id]?.code &&
                              diagnoses[column.id]?.description ? (
                                <>
                                  {diagnoses[column.id]?.code}{" "}
                                  {diagnoses[column.id]?.description}
                                </>
                              ) : (
                                <>-</>
                              )}
                            </TableCell>
                          );
                        } else if (column.id === "diagnosedDate") {
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
                              {mmddyyFormat(diagnoses[column.id]) || "-"}
                            </TableCell>
                          );
                        } else if (column.id === "recordedDate") {
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
                              {mmddyyFormat(diagnoses[column.id]) || "-"}
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
                              {diagnoses[column.id] || "-"}
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
          {tableData?.length === 0 && !props.isLoading ? (
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

        <CustomPagination
          pagination={props.pagination}
          setPagination={props.setPagination}
        />
        {openEditModal && (
          <AddEditDiagnosesModal
            open={openEditModal}
            onClose={handleClose}
            editDiagnoses={editDiagnoses}
            patientDetails={props?.patientDetails}
            title="Edit Diagoses"
          />
        )}

        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete Diagnosis"}
          message={"Diagnosis"}
        />

        {openSuccessModal && (
          <EventSucessModal
            message="Diagnosis deleted successfully"
            onClose={() => setOpenSuccessModal(false)}
          />
        )}
      </Paper>
    </>
  );
}

export default DiagnosesTable;

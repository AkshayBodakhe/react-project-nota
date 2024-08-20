import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ButtonBase,
  Grid,
  Menu,
  MenuItem,
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
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import CustomPagination from "../../../../../components/common/pagination";
import Loading from "../../../../../components/common/spinner/loading";
import EventSucessModal from "../../../../../components/common/success-modal";
import { DeleteDialog } from "../../../../../components/core/delete-dialog";
import { useRoleControllerServiceGetAllRolesExceptDefaults } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { RoleControllerService } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import { style } from "../../new-master/master-table";
import RolesAndResponsibility from "../roles-and-responsibility";
import { useSelector } from "react-redux";
import { transformText } from "../../../../../components/common/helper";

export const columns = [
  { id: "name", label: "Role", minWidth: 200 },
  { id: "description", label: "Description", minWidth: 650 },
  { id: "action", label: "Action", minWidth: 20 },
];

export const UI = makeStyles(() => ({
  title: {
    color: "#1B5984 !important",
    fontWeight: "bold !important",
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    paddingRight: "2px",
    cursor: "pointer",
    opacity: 0.9,
  },
  addUserRoleBtnTypo: {
    color: "#ffffff",
    display: "flex",
  },
  menuStyle: {
    color: "#00000066 !important",
  },
  mainContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    borderRadius: "5px !important",
    opacity: 1,
    padding: "20px !important",
  },
}));

interface RoleTableProps {
  headerHide?: any;
}

function RoleTable(props: RoleTableProps) {
  const commonStyles = commonWidget();
  const classes = style();
  const rolesStyle = UI();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openAddNewRoleModal, setOpenAddNewRoleModal] = useState(false);
  const [openEditNewRoleModal, setOpenEditNewRoleModal] = useState(false);
  const [view, setView] = useState(false);
  const [permissionByRole, setPermissionByRole] = useState<any>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [rows, setRows] = useState<any>(null);
  const [deleteId, setDeleteId] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(false);
  const providerGroupUuid = useSelector(
    (state: any) => state.commonReducer.userDetail?.data?.providerGroup
  );

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 1000,
    sortBy: "",
    searchString: "",
    totalPages: 0,
    totalElements: 0,
    sortDirection: "",
    status: true,
    state: "",
  });

  const { data, refetch } = useRoleControllerServiceGetAllRolesExceptDefaults({
    providerGroupUuid: providerGroupUuid,
    page: pagination.page,
    size: pagination.size,
  });

  useEffect(() => {
    if (props.headerHide) setShow(true);
  }, [props.headerHide]);

  useEffect(() => {
    if (!!data) {
      setIsLoading(false);
      setRows(data?.data?.content);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [data]);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEventSuccessModalOpen = async () => {
    await deleteRole();
    refetch();
    setOpenSuccessModal(true);
    setOpenDeleteDialog(false);
  };

  const overView = () => {
    setEditData(rows[selectedIndex]);
    setView(true);
    getRolesById(rows[selectedIndex]?.uuid);
    setAnchorEl(null);
  };

  const openDeleteRole = () => {
    setDeleteId(rows[selectedIndex]?.uuid ?? "");
    setOpenDeleteDialog(true);
    setAnchorEl(null);
  };

  const deleteRole = async () => {
    await RoleControllerService.deleteRole(deleteId);
    setDeleteId("");
    setAnchorEl(null);
  };

  const editPermissionsByRole = () => {
    setEditData(rows[selectedIndex]);
    getRolesById(rows[selectedIndex]?.uuid);
    setOpenEditNewRoleModal(true);
    setAnchorEl(null);
  };

  const getRolesById = async (uuid: string) => {
    const permissions = await RoleControllerService.getRoleByUuid(uuid);
    setPermissionByRole(permissions?.data);
  };

  const handleAddNewUserButton = () => {
    setOpenAddNewRoleModal(true);
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  return (
    <Grid container pt={1} pb={0}>
      <Grid item xs={12}>
        {!show && (
          <Grid item xs={12}>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h3" className={rolesStyle.title}>
                Roles & Responsibility
              </Typography>
              <Grid item>
                <ButtonBase
                  sx={formButtonStyle.saveButtonStyle}
                  onClick={handleAddNewUserButton}
                >
                  <span className={rolesStyle.addButtonTypo}>
                    <AddIcon />
                  </span>
                  <Typography
                    className={rolesStyle.addUserRoleBtnTypo}
                    variant="h5"
                  >
                    Add New Role
                  </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item mt={1} xs={12}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={commonStyles.tableHeadRowContainer}>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      className={classes.tableHeader}
                      style={{
                        padding: "10px",
                        minWidth: column.minWidth,
                      }}
                      align={column.id === "action" ? "center" : "left"}
                    >
                      <Typography
                        variant="h5"
                        className={classes.tableHeaderText}
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={commonStyles.tableHeadRowContainer}>
                {rows?.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{ "&:nth-child(even)": { background: "#EAF4FF80" } }}
                    >
                      <TableCell
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                        // onClick={() => overView()}
                      >
                        {transformText(row?.name)}
                        {/* {row.name.charAt(0).toUpperCase() +
                          row.name.slice(1).toLowerCase()} */}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell sx={{ textAlign: "center !important" }}>
                        {/* <> */}
                        <MoreVertIcon
                          sx={{ cursor: "pointer", width: "6vw" }}
                          onClick={(e) => handleClick(e, index)}
                        />
                        {
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
                              className={rolesStyle.menuStyle}
                              onClick={() => overView()}
                            >
                              View
                            </MenuItem>
                            {
                              <MenuItem
                                className={rolesStyle.menuStyle}
                                onClick={() => editPermissionsByRole()}
                              >
                                Edit
                              </MenuItem>
                            }
                            {
                              <MenuItem
                                className={rolesStyle.menuStyle}
                                onClick={openDeleteRole}
                              >
                                Delete
                              </MenuItem>
                            }
                          </Menu>
                        }
                        {/* </> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {isLoading && <Loading />}
            {rows?.length === 0 && !isLoading ? (
              <div className={commonStyles.noDataMsg}>No Data Available</div>
            ) : null}
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </Grid>
      {openAddNewRoleModal && (
        <RolesAndResponsibility
          open={openAddNewRoleModal}
          setOpen={setOpenAddNewRoleModal}
          scroll="auto"
          isEditRole={true}
          title="Add New Role"
          getList={refetch}
        />
      )}
      {openEditNewRoleModal && (
        <RolesAndResponsibility
          open={openEditNewRoleModal}
          setOpen={setOpenEditNewRoleModal}
          scroll="auto"
          isEditRole={true}
          title="Edit New Role"
          permissionByRole={permissionByRole}
          editPermissionByRole={editData}
          getList={refetch}
        />
      )}
      {view && (
        <RolesAndResponsibility
          open={view}
          setOpen={setView}
          scroll="auto"
          isEditRole={false}
          title="View Role"
          editPermissionByRole={editData}
          permissionByRole={permissionByRole}
        />
      )}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onEventSuccessModalOpen={handleEventSuccessModalOpen}
        title={"Delete Role"}
        message={"role"}
      />
      {openSuccessModal && (
        <EventSucessModal
          message="Role Deleted"
          onClose={() => setOpenSuccessModal(false)}
        />
      )}
    </Grid>
  );
}

export default RoleTable;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import {
  Box,
  ButtonBase,
  // ButtonBase,
  Drawer,
  Grid,
  MenuItem,
  Paper,
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
import React, { useEffect, useState } from "react";
import {
  Row,
  adminTable,
} from "../../../../../components/core/layout/table/adminTable";
import {
  useMigrationControllerServiceGetAuditLog,
  useProviderGroupControllerServiceGetAllProviderGroups,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import ViewPatientRecord from "./view-patient-record";
import Loading from "../../../../../components/common/spinner/loading";
import { commonWidget } from "../../../../../styles/common";
import { Column } from "../../../../../components/common/enums-and-interfaces/interfaces";
export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  height: "35px !important",
  width: "100%",
};
export const auditLogColumns: Column[] = [
  { id: "id", label: "Sr.No", minWidth: 80 },
  { id: "entity", label: "Entity", minWidth: 100 },
  { id: "createdOn", label: "Created On", minWidth: 80 },
  { id: "createdBy", label: "Created By", minWidth: 50 },
  { id: "numberOfRecord", label: "Number Of Record", minWidth: 90 },
  { id: "providerGroupName", label: "Provider Group Name", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 70 },
];

function ViewAuditLog({
  onCloseDrawer,
  category,
  viewAuditTitle,
}: {
  onCloseDrawer: () => void;
  category?: any;
  viewAuditTitle?: any;
}) {
  // const sxs = {
  //   iconArrowWort: {
  //     marginBottom: "-2px",
  //     // marginTop: '6px',
  //     fontSize: "14px",
  //     transform: "rotate(90deg)",
  //     color: "#000000",
  //     cursor: "pointer",
  //     marginLeft: "2px",
  //   },
  // };
  const classes = adminTable();
  const commonStyles = commonWidget();
  const [page, setPage] = useState(0);
  const [auditLogList, setAuditLogList] = useState<Row[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [providerGroup, setProviderGroup] = useState({ providerGroup: "" });
  const [isPatientDataOpen, setPatientDataOpen] = useState(false);
  const [sourceId, setSourceId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [providerGroupData, setProviderGroupData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setCategoryName(category);
  }, [category]);

  const { data } = useMigrationControllerServiceGetAuditLog({
    category: category,
  });

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: getProviderGroup } =
    useProviderGroupControllerServiceGetAllProviderGroups({
      page: page,
      size: 10,
      sortBy: "",
      sortDirection: "",
      searchString: "",
      status: false,
      state: "",
    });

  useEffect(() => {
    if (!!getProviderGroup) {
      setProviderGroupData(getProviderGroup?.data?.content);
    }
  }, [getProviderGroup]);

  useEffect(() => {
    if (!!data) {
      setIsLoading(false);
      const newRows = data?.data?.map((auditData: any) => ({
        entity: auditData.title,
        createdOn: auditData.createdBy,
        createdBy: auditData.created,
        numberOfRecord: auditData.records,
        providerGroupName: auditData.providerGroup?.name,
        status: auditData.status,
        auditId: auditData.id,
      }));
      setAuditLogList(newRows);
    }
  }, [data]);

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setProviderGroup((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseAuditLog = () => {
    setPatientDataOpen(false);
  };
  const handleCloseDrawer = () => {
    setPatientDataOpen(false);
  };
  const handleClick = (row: any) => {
    setPatientDataOpen(true);
    setSourceId(row?.sourceId);
  };

  const dateFormat = (inputDateString: string) => {
    const date = new Date(inputDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
  };
  return (
    <>
      <Box>
        <Grid container m={1}>
          <Grid
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginRight: "39px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Grid
              item
              ml={"10px"}
              sx={{ display: "flex", alignItems: "center", color: "#004186" }}
            >
              <ButtonBase onClick={onCloseDrawer}>
                <ArrowBackOutlined />
              </ButtonBase>
              &nbsp;
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Audit Log
              </Typography>
            </Grid>
            {/* <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBackIosIcon sx={backIcon} />
              <Typography onClick={onCloseDrawer} sx={backToText}>
                Back
              </Typography>
            </Grid> */}
          </Grid>
          {/* <Grid item xs={10} m={"2px"}>
            <Typography variant="h4" sx={{ fontWeight: 600 , marginBottom: "25px"}}>
              Audit Log
            </Typography>
          </Grid> */}
          <Grid item xs={8.46} m={1}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, marginLeft: "7px" }}
            >
              {viewAuditTitle}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ marginBottom: "8px" }}>
            <Select
              sx={selectInputStyle}
              value={providerGroup.providerGroup}
              name="providerGroup"
              onChange={(e: any) => handleSelectOption(e)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#000000",
                      }}
                    >
                      Provider Group
                    </Typography>
                  );
                }
                return <Typography variant="h4">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {providerGroupData &&
                providerGroupData.length > 0 &&
                providerGroupData.map((providerGroup: any) => (
                  <MenuItem key={providerGroup.uuid} value={providerGroup.uuid}>
                    {providerGroup.groupName}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                margin: "10px !important",
                boxShadow: "none",
                overflow: "hidden",
                marginTop: "10px",
                background: "#F5F6F9",
              }}
            >
              <TableContainer
                sx={{
                  width: "98%",
                  // margin:"5px 10px"
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {auditLogColumns.map((column) => (
                        <TableCell
                          key={column.id}
                          className={classes.tableHeader}
                          style={{
                            minWidth: column.minWidth,
                          }}
                        >
                          <Grid container>
                            <Grid item sx={{ marginTop: "5px" }}>
                              <Typography
                                variant="h5"
                                sx={{ fontWeight: "300" }}
                              >
                                {column.label}
                              </Typography>
                            </Grid>
                            {/* <Grid item sx={{ marginTop: "1px" }}>
                              {" "}
                              <SyncAltIcon sx={sxs.iconArrowWort} />
                            </Grid> */}
                          </Grid>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ background: "#fff" }}>
                    {auditLogList &&
                      auditLogList.length > 0 &&
                      auditLogList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              {auditLogColumns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    className={classes.auditRowCell}
                                  >
                                    {column.id === "status" ? (
                                      <Grid
                                        className={
                                          value
                                            ? classes.successStatus
                                            : classes.failStatus
                                        }
                                      >
                                        <Typography
                                          variant="h5"
                                          sx={{
                                            justifyContent: "flex-start",
                                          }}
                                        >
                                          {value ? "Success" : "Fail"}
                                        </Typography>
                                      </Grid>
                                    ) : column.id === "entity" ? (
                                      <Typography
                                        variant="h5"
                                        sx={{
                                          color: "#000000",
                                          textDecoration: "underline",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => handleClick(row)}
                                      >
                                        {value}
                                      </Typography>
                                    ) : column.id === "id" ? (
                                      <Typography
                                        variant="h5"
                                        sx={{ color: "#000000" }}
                                      >
                                        {index + 1}
                                      </Typography>
                                    ) : column.id === "createdOn" ? (
                                      <Typography
                                        variant="h5"
                                        sx={{ color: "#000000" }}
                                      >
                                        {dateFormat(value)}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant="h5"
                                        sx={{ color: "#000000" }}
                                      >
                                        {value}
                                      </Typography>
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
              {isLoading && <Loading />}
              {auditLogList?.length === 0 && !isLoading ? (
                <div className={commonStyles.noDataMsg}>No Data Available</div>
              ) : null}
              <TablePagination
                sx={{ marginTop: "-20x !important", border: "none !important" }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={auditLogList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>

        <Drawer
          anchor="right"
          open={isPatientDataOpen}
          onClose={handleCloseAuditLog}
        >
          <div
            style={{
              width: "65vw",
              overflowX: "hidden",
              height: "100vh",
              backgroundColor: "#F5F6F9",
            }}
          >
            <ViewPatientRecord
              onCloseDrawer={handleCloseDrawer}
              sourceId={sourceId}
              categoryName={categoryName}
            />
          </div>
        </Drawer>
      </Box>
    </>
  );
}

export default ViewAuditLog;

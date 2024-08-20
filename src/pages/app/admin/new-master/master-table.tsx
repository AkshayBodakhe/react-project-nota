import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  ButtonBase,
  Drawer,
  Fade,
  Grid,
  Modal,
  Paper,
  Popper,
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
import ActiveInactiveSwitch from "../../../../components/common/custom-switch";
import Loading from "../../../../components/common/spinner/loading";
import { adminConstants } from "../../../../constants/admin";
import {
  DrugCatalogControllerService,
  MedicalCodeControllerService,
} from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { commonWidget } from "../../../../styles/common";
import UploadComponent from "./data-import/upload-data-import";
import ViewAuditLog from "./data-import/view-audit-log";
import AddDrugCatalog2 from "./drug-catalog/add-drug-catalog2";

export const style = makeStyles(() => ({
  tableHeader: {
    background: "#FFC77B33 0% 0% no-repeat padding-box !important",
    fontWeight: "600 !important",
  },
  tableHeaderText: {
    fontWeight: "600  !important",
    color: "#1A1A1A80",
    fontSize: "16px !important",
  },
  actionBtn: {
    background: "#CCECFF 0% 0% no-repeat padding-box !important",
    border: "1px solid #0097F0 !important",
    borderRadius: "3px !important",
    padding: "3px 10px !important",
    opacity: 1,
    cursor: "pointer",
    "&:hover": {
      color: "#36588C",
    },
    color: "#0097F0 !important",
  },
}));

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
  width?: string;
}

export const boxUpload = {
  width: 350,
  backgroundColor: "white",
  p: 2,
  borderRadius: 2,
  outline: "none",
};
export const iconDownloadUpload = {
  // marginBottom: "-8px",
  fontSize: "18px",
  color: "#0097F0 !important",
};
export const iconUploadButton = {
  marginBottom: "-8px",
  fontSize: "18px",
};

export const dataImportStyle = makeStyles(() => ({
  iconStyle: {
    marginTop: "-3px !important",
    marginRight: "2px !important",
  },
  typographyHoverColor: {
    cursor: "pointer",
    "&:hover": {
      color: "#36588C",
    },
  },
}));

export interface ReusableTableProps {
  columns: Column[];
  rows: any[];
  page?: any;
  rowsPerPage?: any;
  setPage?: any;
  setRowsPerPage?: any;
  isLoading: any;
  getUpdatedList?: any;
  showTextStatus?: boolean;
  codeType?: any;
  providerGroupUuid?: string;
}

function MasterTable(props: ReusableTableProps) {
  const {
    columns,
    rows,
    showTextStatus,
    // page,
    // rowsPerPage,
    // setPage,
    // setRowsPerPage,
    isLoading,
    getUpdatedList,
    codeType,
    providerGroupUuid,
  } = props;
  const { EDIT_DRUG_CATALOG } = adminConstants;
  const commonStyles = commonWidget();
  const classes = style();
  const UI = dataImportStyle();
  const [editDrugMaster, setEditDrugMaster] = useState(false);
  const [drugMasterData, setdrugMasterData] = useState(null);
  const [isAuditLogOpen, setAuditLogOpen] = useState(false);
  const [category, setCategory] = useState("CPT");
  const [title, setTitle] = useState("");
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [, setCode] = useState("");
  const [tableRow, setTableRow] = useState<any>([]);
  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorEls, setAnchorEls] = useState<(HTMLButtonElement | null)[]>(
    Array(tableRow.length).fill(null)
  );

  useEffect(() => {
    if (rows) {
      setTableRow(rows);
    }
  }, [rows]);

  const handleCloseUpload = () => {
    setUploadOpen(false);
  };

  const handleCloseAuditLog = () => {
    setAuditLogOpen(false);
  };

  const handleCloseDrawer = () => {
    setAuditLogOpen(false);
  };

  const editMaster = (row: any) => {
    setEditDrugMaster(true);
    setdrugMasterData(row);
  };

  useEffect(() => {
    if (codeType) {
      setCode(codeType);
    }
  }, [codeType]);
  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   console.log(event);
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const getEntity = (entity: string) => {
    switch (entity) {
      case "LOINC":
        return "LOINC Code Catalog";
      case "CPT":
        return "CPT Code Catalog";
      case "ICD":
        return "ICD 10 Code Catalog";
      case "DRUG":
        return "DRUG";
      case "HCPCS":
        return "HCPCS Data";
      case "PATIENT":
        return "Patient Data";
      case "PROVIDER":
        return "Provider Data";
      default:
        return "-";
    }
  };

  const handleSwitchChange = async (event: any, row: any) => {
    if (codeType === "Drug") {
      let updatedRows = tableRow.map((element: any) => {
        if (element?.id == row?.id) {
          element.status = !element?.status;
        }
        return element;
      });
      setTableRow(updatedRows);
      const data = await DrugCatalogControllerService.updateStatus3(
        row?.uuid,
        event.target.checked
      );
      if (data?.code == "UPDATED") {
        getUpdatedList();
      }
    } else {
      let updatedRows = tableRow.map((element: any) => {
        if (element?.uuid === row?.uuid) {
          element.status = !element?.status;
        }
        return element;
      });
      setTableRow(updatedRows);
      const data = await MedicalCodeControllerService.updateStatus1(
        row?.uuid,
        event.target.checked
      );
      if (data?.code == "UPDATED") {
        getUpdatedList();
      }
    }
  };

  const handleDownLoadCSV = (url: any) => {
    if (url) {
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "filename.txt");

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
    // if (!status) {
    // if(!url){
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.click();
    // }
    // }
  };

  const openPopper = (e: any, index: number) => {
    const newAnchorEls: any = Array(tableRow.length).fill(null);

    if (anchorEls[index]) {
      setAnchorEls(newAnchorEls);
    } else {
      newAnchorEls[index] = e.currentTarget;
      setAnchorEls(newAnchorEls);
    }
  };

  // const handleMouseLeave = () => {
  //   // setAnchorEl(null);
  //   setAnchorEls(Array(tableRow.length).fill(null));
  // };

  const handleActionClick = (entity: string) => {
    setAuditLogOpen(true);
    setTitle(getEntity(entity));
    setCategory(entity);
  };

  const handleUploadClick = (type: string) => {
    setCategory(type);
    setUploadOpen(true);
  };

  return (
    <Grid container pt={1} pb={0}>
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
                    align={
                      column.id === "status" || column.id === "edit"
                        ? "center"
                        : "left"
                    }
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
              {tableRow &&
                !isLoading &&
                tableRow?.map((row: any, index: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{ "&:nth-child(even)": { background: "#EAF4FF80" } }}
                    >
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            sx={{
                              padding: "8px",
                              color: "#1A1A1ACC !important",
                            }}
                            align={
                              column.id === "status" || column.id === "edit"
                                ? "center"
                                : "left"
                            }
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 600,
                                color: "#1A1A1ACC",
                                letterSpacing: "0.3px",
                              }}
                            >
                              {column.id === "dataImportAction" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <ButtonBase
                                    className={classes.actionBtn}
                                    // onClick={(e) => handleDownload(e, dataImport.entity)}
                                  >
                                    <Grid
                                      container
                                      sx={{ alignItems: "center" }}
                                    >
                                      <Grid item className={UI.iconStyle}>
                                        <SaveAltIcon sx={iconDownloadUpload} />
                                      </Grid>
                                      <Grid item>
                                        <Typography variant="h5">
                                          Download Template
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </ButtonBase>

                                  <ButtonBase
                                    onClick={() =>
                                      handleUploadClick(row?.entity)
                                    }
                                    className={classes.actionBtn}
                                  >
                                    <Grid container>
                                      <Grid item className={UI.iconStyle}>
                                        <FileUploadOutlinedIcon
                                          sx={iconUploadButton}
                                        />
                                      </Grid>
                                      <Grid item>
                                        <Typography variant="h5">
                                          Upload File
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </ButtonBase>

                                  <ButtonBase
                                    onClick={() =>
                                      handleActionClick(row?.entity)
                                    }
                                    className={classes.actionBtn}
                                  >
                                    <VisibilityOutlined
                                      sx={iconDownloadUpload}
                                    />
                                    &nbsp;View
                                  </ButtonBase>
                                </div>
                              ) : column.id === "status" ? (
                                <>
                                  {showTextStatus ? (
                                    <Grid
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box
                                        // variant="h5"
                                        sx={{
                                          fontWeight: 600,
                                          letterSpacing: "0.3px",
                                          color:
                                            value === true
                                              ? "#00C15D"
                                              : value === "Processing"
                                              ? "#FABA4F"
                                              : "#FF3939CC",
                                          // : "#FABA4F",
                                          width: "5rem",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDownLoadCSV(row.fileUrl)
                                        }
                                      >
                                        {value === true
                                          ? "Pass"
                                          : value === "Processing"
                                          ? "Processing"
                                          : "Fail"}
                                      </Box>
                                      <InfoOutlinedIcon
                                        onClick={(e: any) =>
                                          openPopper(e, index)
                                        }
                                      />
                                      <Popper
                                        sx={{ zIndex: 1200 }}
                                        open={Boolean(anchorEls[index])}
                                        anchorEl={anchorEls[index]}
                                        placement={"top-end"}
                                        transition
                                      >
                                        {({ TransitionProps }) => (
                                          <Fade
                                            {...TransitionProps}
                                            timeout={350}
                                          >
                                            <Paper>
                                              <Typography
                                                sx={{
                                                  backgroundColor: "#FFFFFF",
                                                  borderRadius: "10px",
                                                  opacity: 1,
                                                  boxShadow:
                                                    "0px 0px 8px #00000029",
                                                  p: 2,
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "10rem",
                                                    gap: "5px",
                                                  }}
                                                >
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                    }}
                                                  >
                                                    <Box
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color: "#1A1A1ACC",
                                                        letterSpacing: "0.3px",
                                                      }}
                                                    >
                                                      Total
                                                    </Box>
                                                    <Box
                                                      sx={{ color: "#1B5984" }}
                                                    >
                                                      {row.totalRecords || 0}
                                                    </Box>
                                                  </Box>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                    }}
                                                  >
                                                    <Box
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color: "#1A1A1ACC",
                                                        letterSpacing: "0.3px",
                                                      }}
                                                    >
                                                      Uploaded
                                                    </Box>
                                                    <Box
                                                      sx={{ color: "#1B5984" }}
                                                    >
                                                      {row.passRecords || 0}
                                                    </Box>
                                                  </Box>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                    }}
                                                  >
                                                    <Box
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color: "#1A1A1ACC",
                                                        letterSpacing: "0.3px",
                                                      }}
                                                    >
                                                      Pending
                                                    </Box>
                                                    <Box
                                                      sx={{ color: "#1B5984" }}
                                                    >
                                                      {row.pendingRecords || 0}
                                                    </Box>
                                                  </Box>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      handleDownLoadCSV(
                                                        row.fileUrl
                                                      )
                                                    }
                                                  >
                                                    <Box
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color: "#1A1A1ACC",
                                                        letterSpacing: "0.3px",
                                                      }}
                                                    >
                                                      Failed
                                                    </Box>
                                                    <Box
                                                      sx={{ color: "#1B5984" }}
                                                    >
                                                      {row.failRecords || 0}
                                                    </Box>
                                                  </Box>
                                                </Box>
                                              </Typography>
                                            </Paper>
                                          </Fade>
                                        )}
                                      </Popper>
                                    </Grid>
                                  ) : (
                                    <Grid
                                    // sx={{
                                    //   background:
                                    //     "#1A1A1A0F 0% 0% no-repeat padding-box",
                                    //   borderRadius: "13px",
                                    //   opacity: 1,
                                    //   padding: "0px 3px",
                                    //   cursor: "pointer",
                                    //   width: "99px",
                                    // }}
                                    >
                                      {/* <Switch
                                        checked={value}
                                        color="success"
                                        size="small"
                                        onChange={(event) =>
                                          handleSwitchChange(event, row)
                                        }
                                      /> */}
                                      <ActiveInactiveSwitch
                                        state={value}
                                        onChange={(event: any) =>
                                          handleSwitchChange(event, row)
                                        }
                                      />
                                      {/* &nbsp;{value ? "Active" : "Inactive"} */}
                                    </Grid>
                                  )}
                                </>
                              ) : column.id === "edit" ? (
                                <ButtonBase
                                  className={classes.actionBtn}
                                  onClick={() => editMaster(row)}
                                >
                                  <ModeEditOutlinedIcon
                                    sx={iconDownloadUpload}
                                  />
                                  &nbsp;Edit
                                </ButtonBase>
                              ) : column.id === "entity" ? (
                                // <Grid>{getEntity(row?.entity)}</Grid>
                                <Grid>{row?.entity}</Grid>
                              ) : column.id === "speciality" ? (
                                row?.speciality?.name
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
          {tableRow?.length === 0 && !isLoading ? (
            <div className={commonStyles.noDataMsg}>No Data Available</div>
          ) : null}
        </TableContainer>
      </Grid>
      {editDrugMaster && (
        <AddDrugCatalog2
          title={EDIT_DRUG_CATALOG}
          source="Add"
          open={editDrugMaster}
          setOpen={setEditDrugMaster}
          drugData={drugMasterData}
          setIsDataAdded={() => getUpdatedList()}
          providerGroupUuid={providerGroupUuid}
        />
      )}
      <Modal
        open={isUploadOpen}
        onClose={handleCloseUpload}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={boxUpload}>
          <UploadComponent onClose={handleCloseUpload} category={category} />
        </Box>
      </Modal>
      <Drawer
        anchor="right"
        open={isAuditLogOpen}
        onClose={handleCloseAuditLog}
      >
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <ViewAuditLog
            onCloseDrawer={handleCloseDrawer}
            category={category}
            viewAuditTitle={title}
          />
        </Grid>
      </Drawer>
    </Grid>
  );
}

export default MasterTable;

import AddIcon from "@mui/icons-material/Add";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  Avatar,
  ButtonBase,
  Checkbox,
  CssBaseline,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  // TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Column,
  PaginationState,
} from "../../../../components/common/enums-and-interfaces/interfaces";
import AppLayout from "../../../../components/core/layout/layout";
import {
  Row,
  // adminTable,
} from "../../../../components/core/layout/table/adminTable";
import {
  usePatientControllerServiceDownloadPatientList,
  usePatientControllerServiceExportPatientReport,
  usePatientControllerServiceGetPatients,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import { patientStyle } from "./style/commonStyle";
import { adminConstants } from "../../../../constants/admin";
import Loading from "../../../../components/common/spinner/loading";
import { useSelector } from "react-redux";
import CustomPagination from "../../../../components/common/pagination";
import { tableUseStyles } from "../appointment/calendar/appointmentWithLocations";
import SearchIcon from "@mui/icons-material/Search";

const { PROVIDER } = adminConstants;

export const patientListStyle = makeStyles(() => ({
  successStatus: {
    display: "flex",
    // justifyContent: "center",
    color: "white",
    borderRadius: "20px",
    padding: "2px 0px",
  },
  failStatus: {
    display: "flex",
    // justifyContent: "center",
    color: "white",
    borderRadius: "20px",
    padding: "2px 0px",
  },

  tableTitle: {
    color: "#000",
    // background: "#e1e8ed",
    padding: "0px 5px 10px 0px !important",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },
  tableCell: {
    padding: "5px 5px !important",
  },
  avatarStyle: {
    width: "32px !important",
    height: "32px !important",
  },
  patientDetails: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start",
    cursor: "pointer",
    alignItems: "center !important",
  },
  addButtonTypo: {
    color: "white !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px !important",
    opacity: 0.7,
  },
}));

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    // marginTop: '6px',
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#000000",
    cursor: "pointer",
    marginLeft: "2px",
  },
};

function createPatientData(
  id: string,
  city: string,
  country: string,
  line1: string,
  state: string,
  zipcode: string,
  phoneNumber: string,
  birthDate: string,
  providerLastName: string,
  providerFirstName: string,
  lastVisit: string,
  legalFirstName: string,
  legalLastName: string,
  email: string,
  gender: string,
  avatar: JSX.Element | string,
  uuid: string,
  ssn: string,
  registrationDate: string,
  active: boolean
): Row {
  return {
    id,
    city,
    country,
    line1,
    state,
    zipcode,
    phoneNumber,
    birthDate,
    providerLastName,
    providerFirstName,
    lastVisit,
    legalFirstName,
    legalLastName,
    email,
    gender,
    avatar,
    uuid,
    ssn,
    registrationDate,
    active,
  };
}

export const patientListColumns: Column[] = [
  { id: "id", label: "", minWidth: 20 },
  { id: "details", label: "Patient Name", minWidth: 100 },
  { id: "birthDate", label: "Date of Birth", minWidth: 100 },
  { id: "phoneNumber", label: "Contact Details", minWidth: 100 },
  { id: "provider", label: "Primary Care Provider(PCP)", minWidth: 100 },
  { id: "lastVisit", label: "Last visit", minWidth: 100 },
];

interface CsvRow {
  [key: string]: string;
}
function PatientList() {
  // const classes = adminTable();
  const style = patientStyle();
  const commonStyle = commonWidget();
  const [patientData, setpatientData] = useState<Row[]>([]);
  const classes = tableUseStyles();
  const [searchRecord, setSearchRecord] = useState("");
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [page, setPage] = useState(0);
  const Navigate = useNavigate();
  const { id } = useParams();
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "",
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    if (searchRecord !== undefined && searchRecord !== null) {
      const timeOut = setTimeout(() => {
        setPagination((prev: any) => ({
          ...prev,
          searchString: searchRecord,
        }));
      }, 500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [searchRecord]);

  let providerGroupUuid = id as string;
  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }
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

  // const [headerCheckbox, setHeaderCheckbox] = useState(false);
  // const [rowCheckbox, setRowCheckbox] = useState(false);
  const statusOptions = ["All", "Active", "Inactive"];
  // const [toggleAddModal, setToggleAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [status, setStatus] = useState<boolean>();
  const [exportType] = useState<"CSV" | "PDF">("CSV");
  const [CSVData, setCSVData] = useState();
  const { data, isSuccess, refetch, isLoading } =
    usePatientControllerServiceGetPatients({
      providerGroupUuid,
      ...(status !== undefined && { status }),
      ...pagination,
    });

  const [isExportCSV, setIsExportCSV] = useState(false);
  const {
    data: ExportCSVData,
    isSuccess: isExportSuccess,
    // refetch: reCall,
    isRefetching,
  } = usePatientControllerServiceExportPatientReport({
    exportType: exportType,
  });

  useEffect(() => {
    if (
      isExportSuccess &&
      ExportCSVData &&
      !isRefetching &&
      isExportCSV &&
      exportType == "CSV"
    ) {
      downloadCSV(ExportCSVData);
    }
  }, [isExportSuccess, ExportCSVData, isRefetching]);

  const parseCSV = (csvString: string): CsvRow[] => {
    const lines = csvString.split("\n");
    const header = lines[0].split(",");
    const result: CsvRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const obj: CsvRow = {};

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = values[j];
      }
      result.push(obj);
    }
    return result;
  };

  const downloadCSV = (data: any): void => {
    setIsExportCSV(false);
    const csvData = parseCSV(data);

    const csvContent = csvData
      .map((row) => {
        return Object.values(row).join(",");
      })
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const printPDF = () => {
  //   // setExportType("PDF");
  //   // if(exportType == "PDF"){
  //   //   reCall();
  //   // }
  //   // setIsExportCSV(true);
  // };

  useEffect(() => {
    if (isSuccess && !!data) {
      const newRows = data?.data?.content.map((patientData: any) => {
        return createPatientData(
          patientData.id,
          patientData.address?.city || "",
          patientData.address?.country || "",
          patientData.address?.line1 || "",
          patientData.address?.state || "",
          patientData.address?.zipcode || "",
          patientData.contactNumber,
          patientData.birthDate,
          patientData.provider?.lastName || "",
          patientData.provider?.firstName || "",
          patientData.lastVisit,
          patientData.legalFirstName,
          patientData.legalLastName,
          patientData.email,
          patientData.gender,
          patientData.avatar,
          patientData.uuid,
          patientData.ssn,
          patientData.registrationDate,
          patientData.active
        );
      });
      setpatientData(newRows);
      setPagination({
        ...pagination,
        totalElements: data?.data?.totalElements,
        totalPages: data?.data?.totalPages,
      });
    }
  }, [isLoading, data, searchRecord]);

  // const handleHeaderCheck = () => {
  //   setHeaderCheckbox(!headerCheckbox);
  //   setRowCheckbox(!rowCheckbox);
  // };

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   console.log(event);
  //   setPage(newPage);
  // };

  const handleToggleAddModal = () => {
    const titleData = "Add Patient";
    Navigate("/provider/add-patient", { state: { titleData } });
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handlePatientChart = (row: any) => {
    Navigate("/provider/patient-details", { state: { row } });
  };

  const handleSelectOption = (e: any) => {
    setSelectedStatus(e.target.value);
    if (e.target.value == "Inactive") {
      setStatus(false);
      refetch();
    } else if (e.target.value == "Active") {
      setStatus(true);
      refetch();
    } else if (e.target.value == "All") {
      setStatus(undefined);
      refetch();
    }
  };

  const convertString = (str: string) => {
    if (!str) return "";
    const convertedString = str.charAt(0) + str.slice(1).toLowerCase();
    return convertedString;
  };

  const formatdate = (date: any) => {
    const originalDate = new Date(date);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const formatVisit = (date: any) => {
    if (date) {
      const originalDate = new Date(date);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = formatter.format(originalDate);
      return formattedDate;
    }
  };

  const { data: patientCsvData } =
    usePatientControllerServiceDownloadPatientList({
      providerGroupUuid: providerGroupUuid,
      exportType: "CSV",
      size: pagination.totalElements,
    });

  useEffect(() => {
    if (patientCsvData) {
      setCSVData(patientCsvData as any);
    }
  }, [patientCsvData, pagination]);

  const handleClick = () => {
    if (CSVData) {
      const blob = new Blob([CSVData as any], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Grid>
      <CssBaseline />
      <Grid item xs={12}>
        <Paper
          sx={{
            boxShadow: "none",
            overflow: "hidden",
            padding: "12px 15px",
            borderRadius: "5px",
            height: "86vh",
          }}
        >
          <TableContainer
            sx={{
              width: "100%",
            }}
          >
            <Grid
              container
              display={"flex"}
              // flexDirection={"column"}
              // className={style.tableTitle}
              // spacing={2}
              // alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  Patients
                </Typography>
              </Grid>
              <Grid item alignItems={"center"}>
                <Grid container gap={2} mb={2}>
                  <Grid
                    onClick={handleClick}
                    item
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <FileUploadOutlinedIcon sx={{ color: "#1B5984" }} />
                    &nbsp;
                    <Typography
                      variant="h5"
                      sx={{ color: "#1B5984", fontWeight: 600 }}
                    >
                      Export CSV
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Paper
                      component="form"
                      className={classes.paperSearch}
                      sx={{
                        height: "35px",
                        border: "1px solid #a7a7a761",
                        width: "150px",
                      }}
                    >
                      <InputBase
                        style={{ fontSize: "14px", height: "40px" }}
                        className={classes.inputBase}
                        placeholder="Search here"
                        onChange={(e) => setSearchRecord(e.target.value)}
                      />
                      <IconButton
                        type="button"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Select
                      className={style.selectInputStyle}
                      sx={{
                        height: "37px !important",
                        boxShadow: "none",
                        border: "1px solid #00000029",
                        marginTop: "0px",
                        "& .MuiSelect-select ": {
                          display: "flex",
                          alignItems: "center",
                        },
                      }}
                      value={selectedStatus}
                      name="status"
                      onChange={(e: any) => handleSelectOption(e)}
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
                      {statusOptions.map((data) => {
                        return (
                          <MenuItem
                            key={data}
                            value={data}
                            className={style.menuItemColorStyle}
                          >
                            {data}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item>
                    <ButtonBase
                      type="submit"
                      sx={{
                        ...formButtonStyle.mainButtonStyle,
                        color: "white",
                        background: "#2C57B3 !important",
                      }}
                      onClick={handleToggleAddModal}
                    >
                      {" "}
                      <span className={commonStyle.addButtonTypo}>
                        <AddIcon sx={{ color: "#fff" }} />
                      </span>
                      Add Patient
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ maxHeight: "78vh !important", overflowY: "scroll" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow
                    className={commonStyle.providerTableHeadRowContainer}
                  >
                    {patientListColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        // sx={{
                        //   padding: "0px 5px !important",
                        //   backgroundColor: "#E7E7E7 !important",
                        // }}
                        // style={{ maxWidth: column.minWidth }}
                        // align={column.id === "details" ? "center" : "left"}
                        // className={classes.tableHeader}
                      >
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              variant="h5"
                              sx={{ fontWeight: "600", color: "#1A1A1A" }}
                            >
                              {/* {column.id === "id" && (
                                <Checkbox
                                  classes={{ checked: style.checkBoxColor }}
                                  checked={headerCheckbox}
                                  onChange={handleHeaderCheck}
                                  value={undefined}
                                />
                              )} */}
                              {column.label}
                            </Typography>
                          </Grid>
                          {column.id != "id" && (
                            <Grid item>
                              {/* <SyncAltIcon sx={sxs.iconArrowWort} /> */}
                            </Grid>
                          )}
                        </Grid>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody
                  className={commonStyle.providerTableHeadRowContainer}
                  sx={{ maxHeight: "500px !important" }}
                >
                  {patientData
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {patientListColumns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                // className={style.tableCell}
                                align={
                                  column.id === "details" ? "center" : "left"
                                }
                              >
                                {column.id === "status" ? (
                                  <Grid
                                    className={
                                      value
                                        ? style.successStatus
                                        : style.failStatus
                                    }
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <Switch checked={value} color="success" />
                                    </Typography>
                                  </Grid>
                                ) : column.id === "details" ? (
                                  <Grid
                                    className={style.patientDetails}
                                    onClick={() => handlePatientChart(row)}
                                  >
                                    <Grid className={commonStyle.avatarImage}>
                                      <Avatar
                                        className={style.avatarStyle}
                                        alt={row.legalFirstName}
                                        src={row.avatar}
                                      />
                                    </Grid>
                                    <Grid
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                        // alignItems: 'center !important'
                                      }}
                                    >
                                      <Grid>
                                        <Typography
                                          variant="h4"
                                          sx={{
                                            color: "#2C57B3",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {row.legalFirstName}{" "}
                                          {row.legalLastName}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ) : column.id === "phoneNumber" ? (
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      font: "normal normal bold 18px/21px Roboto",
                                    }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        // color: "#000000",
                                        font: "normal normal bold 18px/21px Roboto",
                                        // display: "flex",
                                        // gap: "5px",
                                      }}
                                    >
                                      {row.line1} {row.city} {row.state}{" "}
                                      {row.country} {row.zipcode}
                                    </Typography>
                                    {value}
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1479FF",
                                        display: "flex",
                                        // gap: "5px",
                                      }}
                                    >
                                      {row.email}
                                    </Typography>
                                  </Typography>
                                ) : column.id === "provider" ? (
                                  <Typography
                                    variant="h5"
                                    // sx={{ color: "#000000" }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        // color: "#000000",
                                        // display: "flex",
                                        // gap: "5px",
                                        font: "normal normal bold 18px/21px Roboto",
                                      }}
                                    >
                                      {row.providerFirstName}{" "}
                                      {row.providerLastName}
                                    </Typography>
                                  </Typography>
                                ) : column.id === "birthDate" ? (
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      font: "normal normal bold 18px/21px Roboto",
                                    }}
                                  >
                                    {formatdate(value)}
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        // color: "#000000",
                                        // display: "flex",
                                        // gap: "5px",
                                        font: "normal normal bold 18px/21px Roboto",
                                      }}
                                    >
                                      {convertString(row.gender)}
                                    </Typography>
                                  </Typography>
                                ) : column.id === "id" ? (
                                  <Typography
                                    variant="h5"
                                    // sx={{ color: "#000000" }}
                                  >
                                    {/* <Checkbox
                                    classes={{ checked: style.checkBoxColor }}
                                    checked={rowCheckbox}
                                    onChange={handleRowCheck}
                                    value={undefined}
                                    /> */}
                                  </Typography>
                                ) : column.id === "lastVisit" ? (
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      font: "normal normal bold 18px/21px Roboto",
                                    }}
                                  >
                                    {formatVisit(value) || "-"}
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      font: "normal normal bold 18px/21px Roboto",
                                    }}
                                  >
                                    {column.id === "id" && (
                                      <Checkbox
                                        classes={{
                                          checked: style.checkBoxColor,
                                        }}
                                      />
                                    )}
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
              {isLoading && <Loading />}
              {patientData?.length === 0 && !isLoading && (
                <div className={commonStyle.noDataMsg}>No Data Available</div>
              )}
            </Grid>
          </TableContainer>
          {/* <TablePagination
            sx={{
              marginTop: "-20x !important",
              border: "none !important",
              background: "white",
            }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={patientData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>

        <CustomPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </Grid>
    </Grid>
  );
}
export default AppLayout(PatientList, { source: PROVIDER });

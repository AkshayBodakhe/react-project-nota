import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { FilterSearch } from "../../../../../styles/auth-form";
import { formButtonStyle } from "../../../../../styles/common";
import ReportTable from "../report-table";
import {
  useProblemsControllerServiceDownloadPatientProblemsClinicalReport,
  useProblemsControllerServiceGetPatientProblemsReports,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import moment from "moment";
import dayjs from "dayjs";
import CustomDatePicker from "../../../../../components/common/custom-date-picker";
import axiosInstance, {
  API_BASE_URL,
} from "../../../../../interceptor/interceptor";

export const style = makeStyles(() => ({
  main: {
    background: "#ffffff",
  },
  mainTitle: {
    font: "normal normal medium 24px/28px Roboto",
    letterSpacing: "0px",
    color: "#1A1A1ACC",
    opacity: 1,
    fontWeight: "bold !important",
  },
  icon: {
    fontSize: "20px !important",
  },
  filterBtn: {
    background: "#1A1A1A0D 0% 0% no-repeat padding-box !important",
    border: "1px solid #1A1A1A26 !important",
    borderRadius: "5px !important",
    opacity: 1,
    textAlign: "left",
    font: "normal normal medium 14px/16px Roboto !important",
    letterSpacing: "0px",
    color: "#1A1A1A99 !important",
    padding: "2px 5px !important",
  },
  filterContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 6px #00000029",
    borderRadius: "10px",
    opacity: 1,
  },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    background: "none !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  iconButton: {
    padding: "10px",
  },
  label: {
    color: "#1A1A1A !important",
    fontSize: "16px !important",
    opacity: 1,
    marginBottom: "10px !important",
  },
  filterTitle: {
    display: "flex",
    gap: "15px",
  },
  noPadding: {
    paddingTop: "0px !important",
  },
}));

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}

export const Columns: Column[] = [
  //{ id: "checkbox", label: "", minWidth: 50 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "dob", label: "Date Of Birth", minWidth: 100 },
  { id: "problem", label: "Problem", minWidth: 80 },
  { id: "icd10", label: "ICD 10", minWidth: 80 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "diagnosedDate", label: "Diagnosed Date", minWidth: 100 },
  { id: "updatedDate", label: "Recorded date", minWidth: 100 },
];
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}
interface ProblemReportProps {
  providerGroupUuid: string;
}

function ProblemReport(props: ProblemReportProps) {
  const { providerGroupUuid } = props;
  const classes = style();
  const [PdfCSVData, setPdfCSVData] = useState();
  const [data, setData] = useState<Row[]>([]);
  const [openFilter, setFilter] = useState(false);
  const [problemName, setProblemName] = useState("");
  const [diagnosedDate, setDiagnosedDate] = useState({
    diagnosedStartDate: "",
    diagnosedEndDate: "",
  });
  const [exportType, setExportType] = useState("");

  const openFilterModal = () => {
    setFilter(true);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const resetFilter = () => {
    setProblemName("");
    diagnosedDate.diagnosedEndDate = "";
    diagnosedDate.diagnosedStartDate = "";
    filters.diagnosedEndDate = "";
    filters.diagnosedStartDate = "";
    filters.problemName = "";
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [filters, setFilters] = useState({
    problemName: "",
    diagnosedStartDate: "",
    diagnosedEndDate: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFilters((pre) => ({
      ...pre,
      [name as string]: value,
    }));
  };

  const search = () => {
    setProblemName(filters.problemName);
    setDiagnosedDate((pre) => ({
      ...pre,
      diagnosedStartDate: filters.diagnosedStartDate
        ? filters.diagnosedStartDate + "T00:00:00.000000Z"
        : "",
      diagnosedEndDate: filters.diagnosedEndDate
        ? filters.diagnosedEndDate + "T23:59:59.999999Z"
        : "",
    }));
  };

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });

  const {
    data: ProblemReportData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useProblemsControllerServiceGetPatientProblemsReports({
    providerGroupUuid: providerGroupUuid,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
    searchString: problemName,
    startInstant: diagnosedDate.diagnosedStartDate,
    endInstant: diagnosedDate.diagnosedEndDate,
  });

  const { data: PdfCsvData } =
    useProblemsControllerServiceDownloadPatientProblemsClinicalReport({
      providerGroupUuid: providerGroupUuid,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
      exportType: "CSV",
      searchString: problemName,
      startInstant: diagnosedDate.diagnosedStartDate,
      endInstant: diagnosedDate.diagnosedEndDate,
    });

  useEffect(() => {
    if (PdfCsvData) {
      setPdfCSVData(PdfCsvData as any);
    }
  }, [PdfCsvData, pagination]);

  const handleClick = async (value: string) => {
    if (PdfCSVData && value === "CSV") {
      const blob = new Blob([PdfCSVData as any], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Problem_Report.csv");
      document.body.appendChild(link);
      link.click();
    }

    if (PdfCSVData && value === "PDF") {
      try {
        const newUrl = new URL(
          `${API_BASE_URL}/api/master/problems/download/${providerGroupUuid}`
        );
        newUrl.searchParams.append("searchString", problemName);
        newUrl.searchParams.append(
          "startInstant",
          diagnosedDate.diagnosedStartDate
        );
        newUrl.searchParams.append(
          "endInstant",
          diagnosedDate.diagnosedEndDate
        );
        newUrl.searchParams.append(
          "pageable[page]",
          pagination.page.toString()
        );
        newUrl.searchParams.append(
          "pageable[size]",
          pagination.size.toString()
        );
        newUrl.searchParams.append("pageable[sort]", "created,desc");
        newUrl.searchParams.append("exportType", "PDF");
        const response = await axiosInstance.get(newUrl.toString(), {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Problem_Report.pdf");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    }
  };

  function createForm(
    patientId: string,
    firstName: string,
    lastName: string,
    dob: string,
    problem: string,
    icd10: string,
    status: string,
    diagnosedDate: string,
    updatedDate: string
  ): Row {
    return {
      patientId,
      firstName,
      lastName,
      dob,
      problem,
      icd10,
      status,
      diagnosedDate,
      updatedDate,
    };
  }

  useEffect(() => {
    const newRows = ProblemReportData?.data?.content.map((data: any) => {
      return createForm(
        data?.patient?.uuid,
        data?.patient?.firstName,
        data?.patient?.lastName,
        data?.patient?.birthDate
          ? moment(data.patient.birthDate).format("MM-DD-YYYY")
          : "-",
        data?.billingCodes?.description,
        data?.billingCodes?.code,
        data?.active === true ? "Active" : "Inactive",
        data?.diagnosedDate
          ? moment(data?.diagnosedDate).format("MM-DD-YYYY")
          : "-",
        data?.recordedDate
          ? moment(data?.recordedDate).format("MM-DD-YYYY")
          : "-"
      );
    });
    setData(newRows);
    setPagination((prev) => ({
      ...prev,
      totalPages: ProblemReportData?.data?.totalPages,
      totalElements: ProblemReportData?.data?.totalElements,
    }));
  }, [ProblemReportData?.data]);

  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Problem Report
            </Typography>
          </Grid>
          <Grid item className={classes.filterTitle}>
            {!openFilter && (
              <Grid>
                <ButtonBase
                  sx={{ ...FilterSearch, width: "9.625rem", height: "35px" }}
                  onClick={openFilterModal}
                >
                  Filters
                </ButtonBase>
              </Grid>
            )}
            <Grid>
              <ButtonBase
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleMenuClick}
              >
                <FileDownloadOutlinedIcon className={classes.icon} />
                &nbsp;Export to File
              </ButtonBase>
              <Menu
                sx={{
                  position: "absolute",
                  right: "10px !important",
                  left: "0px",
                  maxWidth: "12% !important",
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  style: {
                    width: "70%",
                  },
                }}
              >
                <MenuItem
                  sx={{
                    color: "#1A1A1A99 !important",
                    fontSize: "14px !important",
                  }}
                  onClick={() => {
                    handleClick("CSV");
                  }}
                >
                  CSV File
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#1A1A1A99 !important",
                    fontSize: "14px !important",
                  }}
                  onClick={() => {
                    handleClick("PDF");
                  }}
                >
                  PDF File
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openFilter && (
        <Grid item xs={12} className={classes.filterContainer} mt={3}>
          <Grid container p={3}>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Problem Code
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Search Problem Code"
                      name="problemName"
                      value={filters.problemName}
                      onChange={(e: any) => handleFilterChange(e)}
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
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Recorded Start Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.diagnosedStartDate)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          diagnosedStartDate: date,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Recorded End Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.diagnosedEndDate)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          diagnosedEndDate: date,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4.5}>
                  <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"end"}
                    gap={1}
                  >
                    <Typography variant="h5" className={classes.label}>
                      &#x200B;
                    </Typography>
                    <ButtonBase
                      sx={FilterSearch}
                      onClick={() => {
                        setFilter(false);
                        resetFilter();
                      }}
                    >
                      Hide Filters
                    </ButtonBase>
                    <Typography variant="h5" className={classes.label}>
                      &#x200B;
                    </Typography>
                    <ButtonBase sx={FilterSearch} onClick={search}>
                      Search
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} mt={3}>
        <ReportTable
          Columns={Columns}
          dataTable={data}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}
export default ProblemReport;

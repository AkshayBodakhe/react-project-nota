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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import { FilterSearch } from "../../../../../styles/auth-form";
import { formButtonStyle } from "../../../../../styles/common";
import { style } from "../style/report-style";
import ReportTable from "../report-table";
import {
  useMedicationsControllerServiceDownloadPatientMedicationsClinicalReport,
  useMedicationsControllerServiceGetPatientMedicationsReport,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import CustomDatePicker from "../../../../../components/common/custom-date-picker";
import dayjs from "dayjs";
import moment from "moment";
import axiosInstance, {
  API_BASE_URL,
} from "../../../../../interceptor/interceptor";
const { PROVIDER } = adminConstants;

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
  { id: "medications", label: "Medications", minWidth: 80 },
  { id: "status", label: "Status", minWidth: 80 },
  { id: "prescribedBy", label: "Prescribed By", minWidth: 120 },
  { id: "startDate", label: "Start Date", minWidth: 100 },
  { id: "endDate", label: "End date", minWidth: 100 },
];
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}
interface MedicationReportProps {
  providerGroupUuid: string;
}
function MedicationReport(props: MedicationReportProps) {
  const { providerGroupUuid } = props;
  const classes = style();
  const [openFilter, setFilter] = useState(false);
  const [medicationName, setMedicationName] = useState("");
  const [PrescribedDate, setPrescribedDate] = useState({
    diagnosedStartDate: "",
    diagnosedEndDate: "",
  });
  const [PdfCSVData, setPdfCSVData] = useState();

  const openFilterModal = () => {
    setFilter(true);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const resetFilter = () => {
    setMedicationName("");
    PrescribedDate.diagnosedEndDate="";
    PrescribedDate.diagnosedStartDate=""
    filters.medicationName = "";
    filters.prescribedEndDate = "";
    filters.prescribedStartDate = "";
  };

  const search = () => {
    setMedicationName(filters.medicationName);
    setPrescribedDate((pre) => ({
      ...pre,
      diagnosedStartDate: filters.prescribedStartDate
        ? filters.prescribedStartDate + "T00:00:00.000000Z"
        : "",
      diagnosedEndDate: filters.prescribedEndDate
        ? filters.prescribedEndDate + "T23:59:59.999999Z"
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

  const [filters, setFilters] = useState({
    medicationName: "",
    prescribedStartDate: "",
    prescribedEndDate: "",
  });

  const {
    data: MedicationReportData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMedicationsControllerServiceGetPatientMedicationsReport({
    providerGroupUuid: providerGroupUuid,
    page: pagination.page,
    size: pagination.size,
    sort: ["created,desc"],
    searchString: medicationName,
    startInstant: PrescribedDate.diagnosedStartDate,
    endInstant: PrescribedDate.diagnosedEndDate,
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

  const [data, setData] = useState<Row[]>([]);

  function createForm(
    patientId: string,
    firstName: string,
    lastName: string,
    dob: string,
    medications: string,
    status: string,
    prescribedBy: string,
    startDate: string,
    endDate: string
  ): Row {
    return {
      patientId,
      firstName,
      lastName,
      dob,
      medications,
      status,
      prescribedBy,
      startDate,
      endDate,
    };
  }
  useEffect(() => {
    const newRows = MedicationReportData?.data?.content?.map((data: any) => {
      return createForm(
        data?.patient.uuid,
        data?.patient.firstName,
        data?.patient.lastName,
        data?.patient.birthDate
          ? moment(data.patient.birthDate).format("MM-DD-YYYY")
          : "-",
        data?.drugCatalog.medicine,
        data?.medicationStatus || "-",
        data?.providerName || "-",
        data?.startDate ? moment(data.startDate).format("MM-DD-YYYY") : "-",
        data?.endDate ? moment(data.endDate).format("MM-DD-YYYY") : "-"
      );
    });
    setData(newRows);
    setPagination((prev) => ({
      ...prev,
      totalPages: MedicationReportData?.data?.totalPages,
      totalElements: MedicationReportData?.data?.totalElements,
    }));
  }, [MedicationReportData]);

  const { data: PdfCsvData } =
    useMedicationsControllerServiceDownloadPatientMedicationsClinicalReport({
      providerGroupUuid: providerGroupUuid,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
      exportType: "CSV",
      searchString: medicationName,
      startInstant: PrescribedDate.diagnosedStartDate,
      endInstant: PrescribedDate.diagnosedEndDate,
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
      link.setAttribute("download", "Medication_Report.csv");
      document.body.appendChild(link);
      link.click();
    }

    if (PdfCSVData && value === "PDF") {
      try {
        const newUrl = new URL(
          `${API_BASE_URL}/api/master/medications/download/${providerGroupUuid}`
        );
        newUrl.searchParams.append("searchString", medicationName);
        newUrl.searchParams.append(
          "startInstant",
          PrescribedDate.diagnosedStartDate
        );
        newUrl.searchParams.append(
          "endInstant",
          PrescribedDate.diagnosedEndDate
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
        link.setAttribute("download", "Medication_Report.pdf");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    }
  };

  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Medication Report
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
                    Medication Name
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Medication Name"
                      name="medicationName"
                      value={filters.medicationName}
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
                    Prescribed Start Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.prescribedStartDate)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          prescribedStartDate: date,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Prescribed End Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.prescribedEndDate)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          prescribedEndDate: date,
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
                        setFilter(false)
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
export default MedicationReport;

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
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilterSearch } from "../../../../../styles/auth-form";
import {
  formButtonStyle,
  selectInputStyle,
} from "../../../../../styles/common";
import { style } from "../style/report-style";
import ReportTable from "../report-table";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import {
  useAllergyControllerServiceDownloadAllergiesClinicalReport,
  useAllergyControllerServiceGetAllergiesClinicalReport,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import moment from "moment";
import axiosInstance, { API_BASE_URL } from "../../../../../interceptor/interceptor";
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}
export const Severity = [
  {
    key:"All",
    value:"All"
  },
  {
    key: "MILD",
    value: "Mild",
  },
  {
    key: "MODERATE",
    value: "Moderate",
  },
  {
    key: "HIGH",
    value: "High",
  },
];

export const Columns: Column[] = [
  //{ id: "checkbox", label: "", minWidth: 50 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  { id: "firstName", label: "First Name", minWidth: 130 },
  { id: "lastName", label: "Last Name", minWidth: 130 },
  { id: "dob", label: "Date Of Birth", minWidth: 130 },
  { id: "allergy", label: "Allergy", minWidth: 80 },
  { id: "reaction", label: "Reaction", minWidth: 80 },
  { id: "severity", label: "Severity", minWidth: 120 },
  { id: "status", label: "Status", minWidth: 100 },
];
interface AllergyReportProps {
  providerGroupUuid: string;
}

function AllergyReport(props: AllergyReportProps) {
  const { providerGroupUuid } = props;
  const classes = style();
  const [openFilter, setFilter] = useState(false);
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

  const [data, setData] = useState<Row[]>([]);
  const [searchString, setSearchString] = useState("");
  const [severityparam, setSeverityparam] = useState("");
  const [filters, setFilters] = useState({
    allergyName: "",
    severity: "",
  });
  const [PdfCSVData, setPdfCSVData] = useState();

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created,desc",
    sortDirection: "",
    status: true,
    totalElements: 0,
    totalPages: 0,
  });

  const { allergyName, severity } = filters;

  const resetFilter = () => {
    setSearchString("");
    filters.allergyName = "";
    filters.severity = "";
  };

  const handleFilterChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const search = () => {
    setSearchString(allergyName);
    if(severity==="All"){
      setSeverityparam("")
    }else{
      setSeverityparam(severity);
    }
  };

  const {
    data: AllergyReportData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useAllergyControllerServiceGetAllergiesClinicalReport({
    providerGroupUuid: providerGroupUuid,
    page: pagination.page,
    size: pagination.size,
    sort: [pagination.sortBy],
    searchString: searchString,
    severity: severityparam as "MILD" | "HIGH" | "MODERATE" | undefined,
  });

  const { data: PdfCsvData } =
    useAllergyControllerServiceDownloadAllergiesClinicalReport({
      providerGroupUuid: providerGroupUuid,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],
      exportType: "CSV",
      searchString: searchString,
      severity: severityparam as "MILD" | "HIGH" | "MODERATE" | undefined,
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
      link.setAttribute("download", "Allergy_Report.csv");
      document.body.appendChild(link);
      link.click();
    }

    if (PdfCSVData && value === "PDF") {
      try {
        const newUrl = new URL(
          `${API_BASE_URL}/api/master/allergy/download/${providerGroupUuid}`
        );
        newUrl.searchParams.append("searchString", searchString);
        newUrl.searchParams.append("severity", severityparam);
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
        link.setAttribute("download", "Allergy_Report.pdf");
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
    allergy: string,
    reaction: string,
    severity: string,
    status: string
  ): Row {
    return {
      patientId,
      firstName,
      lastName,
      dob,
      allergy,
      reaction,
      severity,
      status,
    };
  }
  useEffect(() => {
    const newRows = AllergyReportData?.data?.content.map((data: any) => {
      return createForm(
        data.patient.uuid,
        data.patient.firstName,
        data.patient.lastName,
        moment(data.patient.birthDate).format("MM-DD-YYYY"),
        data.allergy,
        toCamelCase(data.reaction),
        toCamelCase(data.severity),
        data.status === true ? "Active" : "Inactive"
      );
    });
    setData(newRows);
    setPagination((prev) => ({
      ...prev,
      totalPages: AllergyReportData?.data?.totalPages,
      totalElements: AllergyReportData?.data?.totalElements,
    }));
  }, [AllergyReportData?.data, pagination.page, pagination.size]);

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

  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Allergy Report
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
                    Allergy Name
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Allergy Name"
                      // onChange={(e) => setAllergyName(e.target.value)}
                      name="allergyName"
                      value={allergyName}
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
                    Severity
                  </Typography>
                  <Select
                    sx={selectInputStyle}
                    value={severity}
                    name="severity"
                    onChange={(e: any) => handleFilterChange(e)}
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
                              Select Severity
                            </Typography>
                          </span>
                        );
                      }
                      return (
                        <Typography variant="h5">
                          {toCamelCase(selected)}
                        </Typography>
                      );
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {Severity.map((data: any) => {
                      return (
                        <MenuItem
                          value={data.key}
                          className={classes.menuItemColorStyle}
                        >
                          {data.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={7.2}>
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
                        resetFilter()
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
export default AllergyReport;

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { FilterSearch } from "../../../../../styles/auth-form";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import ReportTable from "../report-table";
import { style } from "../style/report-style";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import {
  useAllergyControllerServiceGetAllergiesClinicalReport,
  usePatientControllerServiceDownloadPatientClinicalReport,
  usePatientControllerServiceGetPatientsClinicalReport,
  useProviderGroupControllerServiceGetAllLanguages,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  calculateAge,
  formatDate,
  getAllLanguages,
} from "../../../../../components/common/enums-and-interfaces/common-functions";
import {
  PatientClinicalRequest,
  PatientControllerService,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { multiSelectDropDown } from "../../../../../../src/pages/app/provider/patient/add-new-patient";
import CustomDatePicker from "../../../../../components/common/custom-date-picker";
import dayjs from "dayjs";
import moment from "moment";
import axiosInstance, {
  API_BASE_URL,
} from "../../../../../interceptor/interceptor";
import { formatDateMMDDYYWithoutTz } from "../../appointment/complete-check-in/complete-check-in";

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
  { id: "age", label: "Age", minWidth: 80 },
  { id: "dob", label: "Date Of Birth", minWidth: 80 },
  { id: "gender", label: "Gender", minWidth: 80 },
  { id: "email", label: "Email ID", minWidth: 120 },
  { id: "contact", label: "Contact", minWidth: 100 },
  // { id: "insuranceName", label: "Insurance Name", minWidth: 100 },
  { id: "language", label: "Preferred Language", minWidth: 80 },
  { id: "recorded", label: "Recorded", minWidth: 80 },
  { id: "status", label: "Status", minWidth: 50 },
];

const genderList = [
  { id: "All", label: "All" },
  { id: "MALE", label: "Male" },
  { id: "FEMALE", label: "Female" },
  { id: "OTHER", label: "Other" },
];

const Status = ["All", "Active", "Inactive"];

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

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}
interface PatientReportProps {
  providerGroupUuid: string;
}

function PatientReport(props: PatientReportProps) {
  const { providerGroupUuid } = props;
  const classes = style();
  const commonStyle = commonWidget();
  const [openFilter, setFilter] = useState(false);
  const [data, setData] = useState<Row[]>([]);
  const [language, setLanguage] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isLoading, setIsLoading] = useState(true);
  const [requestBody1, setRequestBody] = useState<PatientClinicalRequest>({
    providerGroupUuid: providerGroupUuid,
  });

  const [filters, setFilters] = useState({
    gender: "",
    searchString: "",
    minCreated: "",
    maxCreated: "",
    minBirthDate: "",
    maxBirthDate: "",
    active: "",
  });

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

  const resetFilter = () => {
    setLanguage([]);
    setRequestBody({providerGroupUuid: providerGroupUuid})
    filters.active = "";
    filters.gender = "";
    filters.maxBirthDate = "";
    filters.maxCreated = "";
    filters.minBirthDate = "";
    filters.minCreated = "";
    filters.searchString = "";
  };

  const calculateBirthDate = (currentDate: any, age: any) => {
    const birthYear = currentDate.getFullYear() - age;
    const birthDate = new Date(birthYear, 0, 1);
    return birthDate.toISOString();
  };

  const handleFilters = (
    e: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFilters((pre) => ({
      ...pre,
      [name as string]: value,
    }));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openFilterModal = () => {
    setFilter(true);
  };

  const {
    mutateAsync,
    error,
    data: Data,
  } = usePatientControllerServiceGetPatientsClinicalReport({});

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.size, requestBody1]);

  const fetchData = async () => {
    setIsLoading(true);
    const requestBody: PatientClinicalRequest = requestBody1;

    mutateAsync({
      requestBody: requestBody,
      page: pagination.page,
      size: pagination.size,
      sortBy: "created",
    })
      .then((response: any) => {
        const newRows = response?.data?.content?.map((data: any) =>
          createForm(data)
        );
        setData(newRows);
        setPagination({
          ...pagination,
          totalPages: response?.data?.totalPages,
          totalElements: response?.data?.totalElements,
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const getLang = async () => {
      const data = await getAllLanguages();
      setLanguageList(data?.data?.content || []);
    };
    getLang();
  }, []);

  const createRequestBody = (): PatientClinicalRequest => {
    const requestBody: PatientClinicalRequest = {
      providerGroupUuid,
      searchString: filters.searchString,
    };

    if (filters.active !== "" && filters.active !== "All") {
      requestBody.active = filters.active === "Active";
    }
    if (filters.gender !== "" && filters.gender !== "All") {
      requestBody.gender = filters.gender as PatientClinicalRequest["gender"];
    }
    if (filters.maxCreated !== "" && filters.minCreated !== "") {
      requestBody.minCreated = filters.minCreated + "T00:00:00.000000Z";
      requestBody.maxCreated = filters.maxCreated + "T23:59:59.999999Z";
    }
    if (filters.minBirthDate !== "") {
      requestBody.minBirthDate = calculateBirthDate(
        new Date(),
        filters.minBirthDate
      );
    }
    if (filters.maxBirthDate !== "") {
      requestBody.maxBirthDate = calculateBirthDate(
        new Date(),
        filters.maxBirthDate
      );
    }
    if (language?.length !== 0) {
      requestBody.languages = language.map((item: any) => item.id);
    }

    return requestBody;
  };

  const search = async () => {
    const requestBody: PatientClinicalRequest = createRequestBody();
    setRequestBody(requestBody);
  };

  const { data: PdfCsvData, mutateAsync: mutateAsyncdwonload } =
    usePatientControllerServiceDownloadPatientClinicalReport({});

  const handleClick = async (value: string) => {
    const requestBody: PatientClinicalRequest = createRequestBody();

    if (value === "CSV") {
      try {
        const res = await mutateAsyncdwonload({
          exportType: "CSV",
          requestBody: requestBody,
          page: pagination.page,
          size: pagination.size,
        });
        const blob = new Blob([res as any], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    } else if (value === "PDF") {
      try {
        const urlforprint = `${API_BASE_URL}/api/master/patient/clinical-report/download`;
        const response = await axiosInstance.post(urlforprint, requestBody, {
          responseType: "arraybuffer",
          params: {
            exportType: "PDF",
            page: pagination.page,
            size: pagination.size,
          },
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url);
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    }
  };

  const createForm = (data: any): Row => ({
    patientId: data?.uuid,
    firstName: data?.legalFirstName,
    lastName: data?.legalLastName,
    age: calculateAge(data?.birthDate),
    dob: data?.birthDate ? moment(data?.birthDate).format("MM-DD-YYYY") : "-",
    gender: toCamelCase(data?.gender) || "-",
    email: data?.email || "-",
    contact: data?.contactNumber || "-",
    language:
      data?.languages?.map((item: any, index: Number) => {
        return index === data?.languages?.length - 1
          ? item?.name
          : item?.name + ", ";
      }) || "-",
    recorded: formatDateMMDDYYWithoutTz(data?.registrationDate) || "-",
    status: data?.isEmailVerify ? "Active" : "Inactive",
  });

  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Patient Report
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
                  onClick={() => handleClick("CSV")}
                >
                  CSV File
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#1A1A1A99 !important",
                    fontSize: "14px !important",
                  }}
                  onClick={() => handleClick("PDF")}
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
                    Recorded Start Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.minCreated)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          minCreated: date,
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
                      value={dayjs(filters.maxCreated)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          maxCreated: date,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Age
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <InputBase
                        id="From"
                        type="text"
                        name="minBirthDate"
                        value={filters.minBirthDate}
                        onChange={(e: any) => handleFilters(e)}
                        placeholder="From"
                        classes={{
                          root: commonStyle.textFieldFullWidth,
                          input: commonStyle.textFieldInput,
                          focused: commonStyle.textFieldActive,
                          error: commonStyle.inputBoxError,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputBase
                        id="To"
                        type="text"
                        name="maxBirthDate"
                        value={filters.maxBirthDate}
                        onChange={(e: any) => handleFilters(e)}
                        placeholder="To"
                        classes={{
                          root: commonStyle.textFieldFullWidth,
                          input: commonStyle.textFieldInput,
                          focused: commonStyle.textFieldActive,
                          error: commonStyle.inputBoxError,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Gender
                  </Typography>
                  <Select
                    className={classes.selectInputStyle}
                    value={filters.gender}
                    name="gender"
                    onChange={(e: any) => handleFilters(e)}
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
                              Select Gender
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
                    {genderList.map((data) => {
                      return (
                        <MenuItem
                          value={data.id}
                          className={classes.menuItemColorStyle}
                        >
                          {data.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={2.4} className={classes.noPadding}>
                  <CustomFormLabel
                    label={"Preferred Languages"}
                    isRequired={false}
                  />
                  <Autocomplete
                    sx={{
                      ...multiSelectDropDown,
                    }}
                    multiple
                    limitTags={2}
                    id="tags-standard"
                    options={languageList || []}
                    value={language}
                    getOptionLabel={(option: any) => option?.name}
                    disableCloseOnSelect
                    onChange={(_, values: any) => {
                      setLanguage(values);
                    }}
                    renderOption={(props, option: any) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        sx={{ justifyContent: "space-between" }}
                        {...props}
                      >
                        {option?.name}
                      </MenuItem>
                    )}
                    // onBlur={formik.handleBlur}
                    renderInput={(params) => (
                      <TextField
                        sx={{ fontSize: "14px" }}
                        // classes={{ root: styles.customTextField }}
                        {...params}
                        variant="outlined"
                        placeholder={
                          language?.length > 0 ? "" : "Select Languages"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Typography variant="h5" className={classes.label}>
                    Search By Patient
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Search Patient"
                      name="searchString"
                      value={filters.searchString}
                      onChange={(e: any) => handleFilters(e)}
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
                <Grid item xs={2.4}>
                  <Typography variant="h5" className={classes.label}>
                    Status
                  </Typography>
                  <Select
                    className={classes.selectInputStyle}
                    name="active"
                    value={filters.active}
                    onChange={(e: any) => handleFilters(e)}
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
                    {Status.map((data) => {
                      return (
                        <MenuItem
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent={"end"}
                    alignItems={"end"}
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

export default PatientReport;

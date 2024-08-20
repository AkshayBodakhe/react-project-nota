import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  ButtonBase,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { FilterSearch } from "../../../../../styles/auth-form";
import { formButtonStyle } from "../../../../../styles/common";
import ReportTable from "../report-table";
import { style } from "../style/report-style";
import { AppointmentClinicalRequest } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import moment from "moment";
import CustomDatePicker from "../../../../../components/common/custom-date-picker";
import dayjs from "dayjs";
import {
  useAppointmentControllerServiceDownloadAppointmentClinicalReport,
  useAppointmentControllerServiceGetAppointmentClinicalReport,
  useLocationControllerServiceGetAllLocations,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import axiosInstance, {
  API_BASE_URL,
} from "../../../../../interceptor/interceptor";
import Loading from "../../../../../components/common/spinner/loading";
export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}
export const Columns: Column[] = [
  { id: "date", label: "Date Of Service", minWidth: 150 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 50 },
  { id: "provider", label: "Provider", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "status", label: "Appointment Status", minWidth: 50 },
];
const AppointmentStatusList = [
  { id: "All", label: "All" },
  { id: "SCHEDULED", label: "Scheduled" },
  { id: "RE_SCHEDULED", label: "Rescheduled" },
  { id: "CANCELLED", label: "Cancelled" },
  { id: "NO_SHOW", label: "No Show" },
  { id: "CHECKED_IN", label: "Checked In" },
  { id: "COMPLETED", label: "Completed" },
  { id: "NOT_CONFIRMED", label: "Not Confirmed" },
];

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
interface AppointmentReportProps {
  providerGroupUuid: string;
}
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

function AppointmentReport(props: AppointmentReportProps) {
  const { providerGroupUuid } = props;
  const classes = style();
  const [data, setData] = useState<Row[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openFilter, setFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [requestBody1, setRequestBody] = useState<AppointmentClinicalRequest>({
    providerGroupUuid: providerGroupUuid,
  });

  const [filters, setFilters] = useState({
    searchString: "",
    status: "",
    appointmentDate: "",
    appointmentEndDate: "",
    locationUuid: "",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "",
    searchString: "",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });

  const resetFilter = () => {
    setRequestBody({ providerGroupUuid: providerGroupUuid });
    filters.searchString = "";
    filters.appointmentDate = "";
    filters.status = "";
    filters.locationUuid = "";
    filters.appointmentEndDate = "";
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

  const handleFilters = (
    e: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFilters((pre) => ({
      ...pre,
      [name as string]: value,
    }));
  };

  const {
    data: locationData,
    isLoading: isLocationDataLoading,
    isError: isLocationError,
  } = useLocationControllerServiceGetAllLocations({
    providerGroupUuid: providerGroupUuid,
    page:0,
    size: 100,
  });

  useEffect(() => {
    if (!isLocationError && locationData?.data) {
      setLocationList(locationData.data.content);
    }
  }, [isLocationDataLoading, locationData, isLocationError]);
  console.log(locationList)

  const {
    mutateAsync,
    error,
    data: Data,
  } = useAppointmentControllerServiceGetAppointmentClinicalReport({});

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.size, requestBody1]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const requestBody: AppointmentClinicalRequest = requestBody1;

      const response = await mutateAsync({
        requestBody,
        page: pagination.page,
        size: pagination.size,
        sortBy: pagination.sortBy,
      });

      const newRows = response?.data?.content.map((data: any) =>
        createForm(data)
      );

      setData(newRows);
      setPagination((prev) => ({
        ...prev,
        totalPages: response?.data?.totalPages,
        totalElements: response?.data?.totalElements,
      }));
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const search = async () => {
    const requestBody: AppointmentClinicalRequest = createRequestBody();
    setRequestBody(requestBody);
  };

  const createRequestBody = (): AppointmentClinicalRequest => {
    const requestBody: AppointmentClinicalRequest = {
      providerGroupUuid,
      searchString: filters.searchString,
    };

    if (filters.status !== "" && filters.status !== "All") {
      requestBody.status =
        filters.status as AppointmentClinicalRequest["status"];
    }
    if (filters.appointmentDate !== "") {
      requestBody.startAppointmentDate = `${filters.appointmentDate}`;
    }
    if (filters.appointmentEndDate !== "") {
      requestBody.endAppointmentDate = `${filters.appointmentEndDate}`;
    }
    if (filters.locationUuid !== "") {
      requestBody.locationUuid = `${filters.locationUuid}`;
    }

    return requestBody;
  };

  const { data: PdfCsvData, mutateAsync: mutateAsyncdwonload } =
    useAppointmentControllerServiceDownloadAppointmentClinicalReport({});

  const handleClick = async (value: string) => {
    const requestBody: AppointmentClinicalRequest = createRequestBody();

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
        const urlforprint = `${API_BASE_URL}/api/master/appointment/clinical-report/download`;
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
    date: data?.dateTime ? moment(data?.dateTime).format("MM-DD-YYYY") : "-",
    patientId: data?.patientId?.toString() || "-",
    firstName: data?.patientFirstName || "-",
    lastName: data?.patientLastName || "-",
    provider: data?.providerName || "-",
    location: data?.location || "-",
    status: data.appointmentStatus || "-",
  });

  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Appointment Report
            </Typography>
          </Grid>
          <Grid item className={classes.filterTitle}>
            <Grid>
              <ButtonBase
                sx={{ ...FilterSearch, width: "9.625rem", height: "35px" }}
                onClick={openFilterModal}
              >
                Filters
              </ButtonBase>
            </Grid>
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
            <Grid item xs={12}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={5.8}>
                  {/* <Grid xs={12} className={classes.checkContainer}>
                    <Grid>
                      <Typography className={classes.label}>
                        Apointment Status
                      </Typography>
                    </Grid>
                    <Grid>
                      <ButtonBase className={classes.filterBtn}>
                        <DoneAllOutlinedIcon className={classes.icon} />
                        &nbsp;Check All
                      </ButtonBase>
                    </Grid>
                    <Grid>
                      <ButtonBase className={classes.filterBtn}>
                        <RemoveDoneOutlinedIcon className={classes.icon} />
                        &nbsp;Uncheck All
                      </ButtonBase>
                    </Grid>
                  </Grid> */}
                  <Grid xs={6}>
                    <Grid container>
                      <Typography variant="h5" className={classes.label}>
                        Appointment Status List
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={filters.status}
                        name="status"
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
                                  Select Appointment Status
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
                        {AppointmentStatusList.map((data) => {
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
                      {/* {AppointmentStatusList.map((item) => (
                        <Grid item xs={2} pt={2} className={classes.checkItem}>
                          <Checkbox
                            sx={{
                              padding: 0,
                              color: "#1A1A1A33",
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                            }}
                          />
                          {item}
                        </Grid>
                      ))} */}
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                {/* <Grid item xs={5.8}>
                  <Grid xs={12} className={classes.checkContainer}>
                    <Grid>
                      <Typography className={classes.label}>
                        Billing Status
                      </Typography>
                    </Grid>
                    <Grid>
                      <ButtonBase className={classes.filterBtn}>
                        <DoneAllOutlinedIcon className={classes.icon} />
                        &nbsp;Check All
                      </ButtonBase>
                    </Grid>
                    <Grid>
                      <ButtonBase className={classes.filterBtn}>
                        <RemoveDoneOutlinedIcon className={classes.icon} />
                        &nbsp;Uncheck All
                      </ButtonBase>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <Grid container>
                      {BillingStatus.map((item) => (
                        <Grid item xs={2} pt={2} className={classes.checkItem}>
                          <Checkbox
                            sx={{
                              padding: 0,
                              color: "#1A1A1A33",
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                            }}
                          />
                          {item}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={2}>
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
                      onChange={(e) => handleFilters(e)}
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
                    Start Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.appointmentDate)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          appointmentDate: date,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2.4}>
                  <Typography variant="h5" className={classes.label}>
                    End Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomDatePicker
                      height={"41px"}
                      value={dayjs(filters.appointmentEndDate)}
                      changeDate={(event: any) => {
                        const date = moment(event.$d).format("yyyy-MM-DD");
                        setFilters((prev) => ({
                          ...prev,
                          appointmentEndDate: date,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2.4}>
                  <Typography variant="h5" className={classes.label}>
                    Location
                  </Typography>
                  <Select
                    className={classes.selectInputStyle}
                    value={filters.locationUuid || ""}
                    name="locationUuid"
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
                              Select Location
                            </Typography>
                          </span>
                        );
                      }
                      const selectedLocation = locationList.find(
                        (loc) => loc.uuid === selected
                      );
                      return (
                        <Typography variant="h5">
                          {selectedLocation?.name}
                        </Typography>
                      );
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {isLocationDataLoading && <Loading />}
                    {!isLocationDataLoading &&
                      locationList.map((data) => {
                        return (
                          <MenuItem
                            key={data.uuid}
                            value={data.uuid}
                            className={classes.menuItemColorStyle}
                          >
                            {data.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent={"end"} alignItems={"end"} gap={1}>
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

export default AppointmentReport;

import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Loading from "../../../../../components/common/spinner/loading";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import { commonWidget } from "../../../../../styles/common";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuditLogControllerServiceGetAuditLogs } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { multiSelectDropDown } from "../../../provider/patient/add-new-patient";
import { patientStyle } from "../../../provider/patient/style/commonStyle";
import CustomPagination from "../../../../../components/common/pagination";
import { ProviderGroupControllerService } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
const { ADMIN } = adminConstants;

export const style = makeStyles(() => ({
  tableHeader: {
    background: "#FFC77B33 0% 0% no-repeat padding-box !important",
  },
  tableHeaderText: {
    fontWeight: "400  !important",
    color: "#1A1A1A99",
    fontSize: "16px !important",
  },
  actionBtn: {
    background: "#CCECFF 0% 0% no-repeat padding-box !important",
    border: "1px solid #0097F0 !important",
    borderRadius: "3px !important",
    padding: "3px !important",
    opacity: 1,
    cursor: "pointer",
    "&:hover": {
      color: "#36588C",
    },
    color: "#0097F0 !important",
  },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    backgroundColor: "unset !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
    fontSize: "14px !important",
  },
  iconButton: {
    padding: "10px",
  },
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    border: "none",
    "& fieldset": { border: "none" },
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
    fontSize: "14px !important",
  },
  tableHeadRowContainer: {
    "& th": {
      backgroundColor: "#FFC77B33 !important",
      borderBottom: "none",
      fontSize: "16px",
      fontWeight: "500",
      padding: "10px !important",
    },

    "& td": {
      padding: "12px 10px !important",
      fontSize: "0.875rem",
    },
  },
  mainContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    borderRadius: "5px !important",
    opacity: 1,
    padding: "20px !important",
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

export const columns = [
  { id: "dateTime", label: "Date & Time", minWidth: "150px" },
  { id: "providerGroupName", label: "Provider Group", minWidth: "150px" },
  { id: "type", label: "Entity Type", minWidth: "100px" },
  { id: "event", label: "Event", minWidth: "100px" },
  { id: "description", label: "Description", minWidth: "150px" },
  { id: "userId", label: "User ID", minWidth: "120px" },
  { id: "Ip", label: "User IP Address", minWidth: "120px" },
];

function AuditLog() {
  const commonStyles = commonWidget();
  const classes = style();
  const styles = patientStyle();
  const [rows, setRows] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [entityType, setEntityType] = useState("");
  const [name, setName] = useState("");
  const [searchDate, setSearchDate] = useState<any>(null);
  const [searchByDate, setSearchByDate] = useState<any>(null);
  const [searchByEndDate,setSearchByEndDate] = useState<Date | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "",
    searchString: "",
    totalPages: 0,
    totalElements: 0,
    sortDirection: "",
    status: true,
    state: "",
  });
  const [entityTypeOptions] = useState<any>([
    "All",
    "Location",
    "Patient",
    "Provider",
    "Appointment",
    "Charts",
    "Permission",
    "Availability",
    "Billing Codes",
    "Communication Groups",
    "Contact Directory",
    "Custom Form",
    "Department",
    "Document",
    "Document Type",
    "Drug Catalog",
    "Encounter",
    "Macros",
    "Task",
    "Outgoing Messages",
    "Provider Group",
    "Role",
    "Speciality",
  ]);

  const [providergroupOptions, setProviderGroupOption] = useState([]);
  const [providerGroupId, setProviderGroupId] = useState("");

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

  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const { data, refetch } = useAuditLogControllerServiceGetAuditLogs({
    providerGroupUuid: providerGroupId,
    userName: name,
    entityType: entityType === "All" ? undefined : entityType,
    startDate:searchByDate,
    endDate:searchByEndDate ? formatDate(searchByEndDate)+"T23:59:59.999999Z" : undefined,
    page: pagination.page,
    size: pagination.size,
  });

  // const { data: providerGroupData } =
  //   useProviderGroupControllerServiceGetAllProviderGroups({
  //     page: 0,
  //     size: 10,
  //     sortBy: "created",
  //     sortDirection: "desc",
  //     searchString: "",
  //     status: true,
  //     state: "",
  //   });

  // useEffect(() => {
  //   if (providerGroupData) {
  //     setProviderGroupOption(providerGroupData?.data?.content);
  //   }
  // }, [providerGroupData]);

  useEffect(() => {
    if (data) {
      const mappedData = data?.data?.content.map((item: any) => ({
        dateTime: formatDateTime(item.dateTime),
        providerGroupName: item.providerGroupName,
        type: item.entityType,
        event: item.auditEvent,
        description: item.description,
        userId: item.userId,
        Ip: item.userIpAddress,
      }));
      setRows(mappedData);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
      setIsLoading(false);
    }
  }, [data]);

  function formatDateTime(inputDate: any) {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const [month, day, year] = formattedDate.split("/");
    const formattedDateString = `${day}-${month}-${year}`;
    return `${formattedDateString}`;
  }

  const handleSelect = (value: any) => {
    const { uuid } = value ? value : "";
    setProviderGroupId(uuid);
    refetch();
  };

  const InputChange = (e: any) => {
    setName(e.target.value);
    refetch();
  };

  const handleDateChange = (date: any) => {
    if (date != null) {
      setSearchDate(new Date(date));
      const formattedDate = formatDate(date);
      setSearchByDate(formattedDate+"T00:00:00.000000Z");
      refetch();
    } else {
      setSearchByDate(null);
    }
  };
  
  const handleEndDateChange = (date:Date | null)=>{
    setSearchByEndDate(date);
    refetch();
  }

  const handleSelectOption = (e: any) => {
    setEntityType(e.target.value);
  };

  const getSearchInput = (inputSearch: string) => {
    getProviderList(inputSearch);
  };

  // useEffect(()=>{
  //   getProviderList("");
  // },[])

  const getProviderList = async (searchString: string) => {
    let providerGroupData =
      await ProviderGroupControllerService.getAllProviderGroups(
        0,
        10,
        "created",
        "desc",
        searchString
      );
    setProviderGroupOption(providerGroupData?.data?.content);
  };

  return (
    <Grid container pt={1} pb={0}>
      <Grid item xs={12} className={classes.mainContainer}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={2}>
              <Typography
                variant="h3"
                sx={{ color: "#36588C", fontWeight: "bold" }}
              >
                Audit Log
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Grid
                container
                spacing={2}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Grid item xs={3}>
                  <Autocomplete
                    sx={multiSelectDropDown}
                    multiple={false}
                    id="tags-standard"
                    options={providergroupOptions || []}
                    getOptionLabel={(option: any) => option.groupName}
                    onChange={(_, value) => handleSelect(value)}
                    // disableCloseOnSelect
                    renderOption={(props, option) => (
                      <MenuItem
                        key={option.id}
                        value={option.groupName}
                        // sx={{ background:"#F1F1F1 !important"}}
                        {...props}
                      >
                        {option.groupName}
                      </MenuItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        classes={{ root: styles.customTextField }}
                        {...params}
                        variant="outlined"
                        placeholder="Search By Provider Group"
                      />
                    )}
                    onInputChange={(_event, inputValue) => {
                      // Call your function with the inputValue
                      getSearchInput(inputValue);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Search By Username"
                      name="name"
                      value={name}
                      onChange={(e) => InputChange(e)}
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
                <Grid item xs={2.5}>
                  <Select
                    className={classes.selectInputStyle}
                    value={entityType}
                    name="entityType"
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
                              Entity Type
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {entityTypeOptions?.map((data: any) => {
                      return (
                        <MenuItem
                          key={data}
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                  <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <DatePicker
                          defaultValue={new Date()}
                          disableFuture
                          onChange={(date) => handleDateChange(date)}
                          value={searchDate}
                          slotProps={{
                            textField: {
                              size: "small",
                              placeholder: "Search By Start date",
                            },
                          }}
                          sx={{
                            "& fieldset": {
                              border: "none",
                            },
                            boxShadow: "0px 0px 6px rgb(0 0 0 / 20%)",
                            borderRadius: "4px",
                            textAlign: "center",
                            height: "42px",
                            "& label": {
                              color: "#1A1A1A80 !important",
                              fontSize: "14px !important",
                            },
                            "& .MuiInputBase-input": {
                              color: "black !important",
                              fontSize: "14px !important",
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <DatePicker
                          defaultValue={new Date()}
                          disablePast
                          onChange={(date) => handleEndDateChange(date)}
                          value={searchByEndDate}
                          slotProps={{
                            textField: {
                              size: "small",
                              placeholder: "Search By End date",
                            },
                          }}
                          sx={{
                            "& fieldset": {
                              border: "none",
                            },
                            boxShadow: "0px 0px 6px rgb(0 0 0 / 20%)",
                            borderRadius: "4px",
                            textAlign: "center",
                            height: "42px",
                            "& label": {
                              color: "#1A1A1A80 !important",
                              fontSize: "14px !important",
                            },
                            "& .MuiInputBase-input": {
                              color: "black !important",
                              fontSize: "14px !important",
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item mt={2} xs={12}>
          <TableContainer sx={{ overflowX: "unset" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableHeadRowContainer}>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      className={classes.tableHeader}
                      style={{
                        padding: "10px",
                        minWidth: column.minWidth,
                      }}
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
              <TableBody className={classes.tableHeadRowContainer}>
                {rows?.map((row: any, index: any) => {
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
                              color: "#1A1A1ACC !important",
                            }}
                          >
                            <Typography variant="h5">{value || "-"}</Typography>
                          </TableCell>
                        );
                      })}
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
    </Grid>
  );
}

export default AppLayout(AuditLog, { source: ADMIN });

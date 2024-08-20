import {
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
  Typography,
} from "@mui/material";
import AppLayout from "../../../../components/core/layout/layout";
import { PROVIDER } from "../documents/documents-constant/documents-common-const";
import CustomDatePicker from "../../../../components/common/custom-date-picker";
import dayjs from "dayjs";
import moment from "moment";
import CustomFormLabel from "../../../../components/common/custom-form-label";
import { tableUseStyles } from "../appointment/calendar/appointmentWithLocations";
import {
  Column,
  PaginationState,
} from "../../../../components/common/enums-and-interfaces/interfaces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDateMMDDYYWithoutTz } from "../appointment/complete-check-in/complete-check-in";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CustomPagination from "../../../../components/common/pagination";
import { useNavigate } from "react-router-dom";
import EncounterView from "./encounter-view";
import Loading from "../../../../components/common/spinner/loading";
import { useEncounterControllerServiceGetAllEncounterByProvider } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import SearchIcon from "@mui/icons-material/Search";
import { ProviderControllerService } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toCamelCase } from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { CalendarConst } from "../home/provider-dashboard-const";

export const tabColumns: Column[] = [
  { id: "providerName", label: "Provider Name" },
  { id: "patientName", label: "Patient Name" },
  { id: "dos", label: "Date Of Service" },
  { id: "noteType", label: "Note Type" },
  { id: "updatedDate", label: "Updated Date" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action", width: "fit-content" },
];

export const statusOption = [
  { id: "1", label: "All" },
  { id: "2", label: "SIGNED" },
  { id: "3", label: "UNSIGNED" },
  // { id: "4", label: "CHECK_IN" },

  // { id: "4", label: "DRAFT" },
];

export const statusColStyle = {
  display: "flex",
  gap: "4px",
  alignItems: "center",
  border: "1px solid #0097F0",
  borderRadius: "5px",
  px: "5px",
  py: "3px",
  background: "#e1effb",
  width: "140px",
};

function UnsignedVisit() {
  const classes = tableUseStyles();
  const [tableRow, setTableRow] = useState<any[]>();
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const [unsignedStartDate, setStartDate] = useState<any>();
  const [unsignedEndDate, setEndDate] = useState<any>();
  const [searchRecord, setSearchRecord] = useState("");
  const [searchProviderUser, setProviderUser] = useState<any>("");
  const [selectedStatus, setStatus] = useState<any>();
  const [providerOptions, setProviderOptions] = useState<any>();
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const navigate = useNavigate();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const { data, isLoading } =
    useEncounterControllerServiceGetAllEncounterByProvider({
      providerGroupUuid: userDetails.data.providerGroup,
      ...pagination,
      startDate: unsignedStartDate,
      endDate: unsignedEndDate,
      search: pagination.searchString,
      providerUuid: searchProviderUser.uuid,
      encounterStatus: selectedStatus?.label,
    });

  useEffect(() => {
    if (data) {
      const visitNote = data.data?.content.map((item: any) => {
        return {
          providerName:
            item?.provider?.firstname + " " + item?.provider?.lastname,
          patientName: item?.patient?.firstname + " " + item.patient.lastname,
          dos: formatDateMMDDYYWithoutTz(item?.serviceDate as string),
          noteType: item?.note,
          updatedDate: item?.visitDate,
          status: item?.status,
          encounterUuid: item?.uuid,
          patientUuid: item.patient?.uuid,
          appointmentType: item?.appointmentType,
          appointmentDate: item?.serviceDate,
          startTime: item?.startTime,
          endTime: item?.endTime,
          provider: item?.provider,
          dob: item?.patient?.birthDate,
          location: item?.location,
          pos: item?.location,
          presentType: item?.visitType,
        };
      });
      setTableRow(visitNote);
      setPagination({
        ...pagination,
        totalElements: data?.data?.totalElements,
        totalPages: data?.data?.totalPages,
      });
    }
  }, [data, searchProviderUser.uuid, selectedStatus?.label]);

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

  const getProviderList = async () => {
    const providerList = await ProviderControllerService.getAllProviders(
      userDetails?.data?.providerGroup
    );
    const deselectObj = [{ firstName: "All" }];
    setProviderOptions([...deselectObj, ...providerList?.data?.content]);
  };

  useEffect(() => {
    getProviderList();
  }, []);

  const handleDateChange = (date: any) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setStartDate(formattedDate + "T00:00:00.000000Z");
  };

  // formattedDate+"T00:00:00.000000Z"

  const handleChangeEndDate = (date: any) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setEndDate(formattedDate + "T00:00:00.000000Z");
  };

  const getVisitNoteAction = (status: any) => {
    return (
      <Grid sx={statusColStyle}>
        {status === "SIGNED" ? (
          <RemoveRedEyeOutlinedIcon
            style={{ fontSize: "18px", color: "#2c57b3" }}
          />
        ) : (
          <OpenInNewIcon style={{ fontSize: "17px", color: "#2c57b3" }} />
        )}
        <Typography
          variant="h5"
          sx={{
            color: "#2c57b3",
            textDecorationColor: "#000000",
            cursor: "pointer",
          }}
        >
          {status === "SIGNED" ? "View Summary" : "Open Encounter"}
        </Typography>
      </Grid>
    );
  };

  const handleEncounter = (encounterDetails: any) => {
    if (encounterDetails.status === "UNSIGNED") {
      navigate("/provider/appointment/calendar/complete-intake", {
        state: { encounterDetails },
      });
    } else if (encounterDetails.status === "SIGNED") {
      navigate("/provider/appointment/calendar/complete-intake", {
        state: { encounterDetails },
      });
    }
  };

  const handleStatus = (e: any) => {
    e.target.value.label === "All" ? setStatus("") : setStatus(e.target.value);
  };

  const handleDeselectProvider = (e: any) => {
    setProviderUser(e.target.value);
  };

  return (
    <>
      <Box sx={{ background: "#fff", padding: "15px" }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h1">{"Visit Note"}</Typography>
          <Box display={"flex"} gap={2}>
            <Grid xs={3}>
              <CustomFormLabel label={"Search Patient"} />
              <Paper component="form" className={classes.paperSearch}>
                <InputBase
                  style={{ fontSize: "14px" }}
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
            <Grid xs={3}>
              <CustomFormLabel label="Select Provider" />
              <Select
                className={classes.selectInputStyle}
                sx={{
                  height: "40px !important",
                  width: "100% !important",
                }}
                onChange={(e) => handleDeselectProvider(e)}
                renderValue={(selected: any) => {
                  if (!selected || selected.length === 0) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Provider
                        </Typography>
                      </span>
                    );
                  }
                  return (
                    <Typography variant="h5">{`${selected?.firstName || ""} ${
                      selected?.lastName || ""
                    }`}</Typography>
                  );
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {providerOptions?.map((data: any) => {
                  return (
                    <MenuItem
                      key={data.id}
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data.firstName} {data.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid xs={3}>
              <CustomFormLabel label="Select Status" />
              <Select
                className={classes.selectInputStyle}
                sx={{
                  height: "40px !important",
                  width: "100% !important",
                }}
                onChange={(e) => handleStatus(e)}
                renderValue={(selected: any) => {
                  if (!selected || selected.length === 0) {
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
                  return (
                    <Typography variant="h5">{`${
                      selected.label || ""
                    }`}</Typography>
                  );
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {statusOption?.map((data: any) => {
                  return (
                    <MenuItem
                      key={data.id}
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {toCamelCase(data.label)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid>
              <CustomFormLabel label={"Start Date"} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={""}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  sx={CalendarConst}
                />
              </LocalizationProvider>
            </Grid>
            <Grid>
              <CustomFormLabel label={"End Date"} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={""}
                  onChange={handleChangeEndDate}
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  sx={CalendarConst}
                />
              </LocalizationProvider>
            </Grid>
          </Box>
        </Grid>
        <Grid>
          <TableContainer
            component={Paper}
            className={classes.tableContainer}
            sx={{ maxHeight: "700px" }}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <Table>
                <TableHead>
                  <TableRow className={classes.headingBackground}>
                    {tabColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        className={classes.tableHeaderCell}
                        // classes={{ root: classes.tableHeadCellRoot }}
                      >
                        <Typography
                          variant="h5"
                          className={classes.TabelheadingTypo}
                        >
                          {column.label}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRow?.map((row: any, index) => {
                    return (
                      <TableRow
                        key={index}
                        className={classes.tableBodyRow}
                        hover
                      >
                        {tabColumns?.map((column) => (
                          <TableCell
                            key={column.id}
                            className={classes.tableRowCell}
                            //classes={{ root: classes.tableHeadCellRoot }}
                          >
                            {column.id === "providerName" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["providerName"]}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.subAppoinmentInfo}
                                >
                                  {row.timeSlot}
                                </Typography>
                              </Box>
                            ) : column.id === "patientName" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["patientName"]}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.subAppoinmentInfo}
                                >
                                  {row.timeSlot}
                                </Typography>
                              </Box>
                            ) : column.id === "dos" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["dos"]}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.subAppoinmentInfo}
                                >
                                  {row.timeSlot}
                                </Typography>
                              </Box>
                            ) : column.id === "noteType" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {"SOAP"}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.subAppoinmentInfo}
                                >
                                  {row.timeSlot}
                                </Typography>
                              </Box>
                            ) : column.id === "updatedDate" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {moment(row["updatedDate"]).format(
                                    "MM-DD-YYYY"
                                  )}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.subAppoinmentInfo}
                                >
                                  {row.timeSlot}
                                </Typography>
                              </Box>
                            ) : column.id === "status" ? (
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#000000" }}
                                >
                                  {row["status"]}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.subAppoinmentInfo}
                                >
                                  {row.timeSlot}
                                </Typography>
                              </Box>
                            ) : column.id === "action" ? (
                              <Box
                                width={"fit-content"}
                                onClick={() => {
                                  handleEncounter(row);
                                }}
                              >
                                {getVisitNoteAction(row["status"])}
                              </Box>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            {tableRow?.length === 0 && (
              <Grid
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography variant="h5">No Data Found</Typography>
              </Grid>
            )}
          </TableContainer>
          <CustomPagination
            pagination={pagination}
            setPagination={setPagination}
          />
        </Grid>
      </Box>
    </>
  );
}

export default AppLayout(UnsignedVisit, { source: PROVIDER });

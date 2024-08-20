import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FormInput from "../../../../../../components/common/atom/FormInput";
// import { multiSelectDropDown } from "../../../patient/add-new-patient";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";
import {
  useAvailabilityControllerServiceGetAvailabilities,
  useLocationControllerServiceGetAllLocations,
  useProviderControllerServiceGetAllProviders,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { AvailabilityRequest } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import OpenEvent from "./add-availability/openEvent";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { convertLocalToUTC, getTimeZoneValue } from "./timeZoneValue";

export const style = makeStyles(() => ({
  customCalendar: {
    "& .rbc-month-view": {
      padding: "10px",
    },
    "& .rbc-date-cell": {
      textAlign: "center",
      position: "relative",
    },
    "& .rbc-header": {
      fontWeight: 500,
      color: "#3A3A3A99",
    },
    "& .rbc-off-range-bg": {
      background: "transparent",
    },
    "& .rbc-event": {
      color: "#000000",
      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      textAlign: "center",
      background: "#3434FF1A",
      border: "1px solid #3434FF",
      borderRadius: "5px",
      opacity: 1,
      padding: "2px 3px !important",
    },
    "& .rbc-now": {
      backgroundColor: "transparent",
    },
    "& .rbc-today": {
      backgroundColor: "transparent",
    },
    "& .rbc-event-content": {
      // borderLeft: "4px solid #3434FF",
    },
    "& .rbc-row": {
      marginTop: "3px",
    },
    "& .rbc-current .rbc-button-link": {
      color: "#2C57B3",
      fontWeight: "bold",
    },
  },
}));

const localizer = momentLocalizer(moment);

const css = {
  todayBtn: {
    textAlign: "center",
    color: "#1B5984",
    height: "30px",
    border: "1px solid #1B5984",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  arrowBtn: {
    color: "#2C57B3",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#1A1A1A80",
    fontSize: "20px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "end",
    gap: "10px",
    alignItems: "center",
  },
};
interface CalenderViewProps {
  isRefetchData: boolean;
}
function CalenderView(props: CalenderViewProps) {
  const now = new Date();
  const classes = style();
  const loggedInProvider = getLoggedInUser();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [editData, setEditData] = useState<any>("");
  const [getAvailabilitiesPayload, setPayload] = useState<AvailabilityRequest>({
    month: Object.values(AvailabilityRequest.month)[now.getMonth()],
    year: now.getFullYear(),
    inPerson: false,
    virtual: false,
    providerUserUUID: selectedProvider
      ? selectedProvider.userUuid
      : loggedInProvider.userUuid,
    locationUuidSet: [],
  });
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [locations, setLocations] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(now);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);

  function CustomToolbar({ label }: any) {
    const todayLabel = label === "month" ? "This Month" : "Today";

    const handleCurrentMonth = () => {
      setSelectedMonth(new Date());
    };

    const handleBack = () => {
      setSelectedMonth(
        new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1)
      );
      const fullDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() - 1,
        1
      );
      const monthName = fullDate
        .toLocaleString("default", { month: "long" })
        .toUpperCase();

      setPayload((prev: any) => ({
        ...prev,
        month: monthName,
      }));
    };

    const handleNext = () => {
      setSelectedMonth(
        new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1)
      );
      const fullDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      );
      const monthName = fullDate
        .toLocaleString("default", { month: "long" })
        .toUpperCase();

      setPayload((prev: any) => ({
        ...prev,
        month: monthName,
      }));
    };

    const handleFilterChange = (event: any, field: string) => {
      if (field === "provider") {
        setSelectedProvider(event.target.value);
        setPayload((prev: any) => ({
          ...prev,
          providerUserUUID: event?.target?.value?.userUuid || "",
        }));
      } else {
        if (event.target?.value) {
          const uuids = event?.target?.value?.map((res: any) => res.uuid);
          setSelectedLocations(event.target.value);
          setPayload((prev: any) => ({
            ...prev,
            locationUuidSet: uuids,
          }));
        } else {
          setPayload((prev: any) => ({
            ...prev,
            locationUuidSet: [],
          }));
        }
      }
    };

    const handleValue = (e: any) => {
      const value = e.target.value;
      setSelectedLocations(value);
      setPayload((prev: any) => ({
        ...prev,
        locationUuidSet: value,
      }));
    };

    return (
      <Grid container alignItems="center" mb={1.5}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <Grid item>
              <Button sx={css.todayBtn} onClick={handleCurrentMonth}>
                {todayLabel}
              </Button>
            </Grid>
            <Grid item sx={css.headerContainer}>
              <Grid item onClick={handleBack}>
                <KeyboardArrowLeftOutlinedIcon sx={css.arrowBtn} />
              </Grid>
              <Grid item onClick={handleNext}>
                <KeyboardArrowRightOutlinedIcon sx={css.arrowBtn} />
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ color: "#2C57B3" }}>
                  {selectedMonth.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sx={css.headerContainer}>
            <Grid item xs={3} sx={{ display: "flex" }}>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={getAvailabilitiesPayload.virtual}
                  onChange={(e: any) => {
                    setPayload((prev: any) => ({
                      ...prev,
                      virtual: e.target.checked,
                    }));
                  }}
                />{" "}
                <Typography variant="h5">Virtual</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={getAvailabilitiesPayload.inPerson}
                  onChange={(e: any) => {
                    setPayload((prev: any) => ({
                      ...prev,
                      inPerson: e.target.checked,
                    }));
                  }}
                />{" "}
                <Typography variant="h5">In Person</Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <FormInput
                control="autocomplete"
                height="42px"
                placeholder="Select Provider"
                name="name"
                mapBy="firstName"
                lastName="lastName"
                data={providers}
                value={selectedProvider}
                onChange={(event: any) => handleFilterChange(event, "provider")}
                InputIcon={<GroupOutlinedIcon sx={css.inputIcon} />}
              />
            </Grid>
            {getAvailabilitiesPayload.inPerson && (
              <Grid item xs={3}>
                {/* <FormInput
                  control="multi-select-checkbox"
                  height="45px"
                  placeholder="Select Location"
                  name="locationUuidSet"
                  mapBy="name"
                  value={selectedLocations}
                  options={locations || []}
                  onChange={(event: any) =>
                    handleFilterChange(event, "location")
                  }
                  InputIcon={<LocationOnOutlinedIcon sx={css.inputIcon} />}
                /> */}
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    value={selectedLocations}
                    multiple
                    id="multi-select"
                    className="dropdown"
                    onChange={handleValue}
                    renderValue={(selected: any) => {
                      if (selected.length === 0) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80 !important",
                              }}
                            >
                              {"Select Location"}
                            </Typography>
                          </span>
                        );
                      }
                      return (
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          {(() => {
                            const selectedLocations = locations?.filter(
                              (location) => selected.includes(location.uuid)
                            );
                            return (
                              selectedLocations
                                ?.map((location) => location.name)
                                .join(", ") || "Select Location"
                            );
                          })()}
                        </Typography>
                      );
                    }}
                    displayEmpty
                  >
                    {locations?.map((location) => (
                      <MenuItem key={location.id} value={location.uuid}>
                        <ListItemIcon>
                          <Checkbox
                            name="select-checkbox"
                            checked={selectedLocations.includes(location.uuid)}
                          ></Checkbox>
                        </ListItemIcon>
                        <ListItemText primary={location.name}></ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const [availabilityTimeZone, setAvailabilityTimeZone] = useState("");
  const [openEvent, setOpenEvent] = useState(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const { mutateAsync } = useAvailabilityControllerServiceGetAvailabilities();
  const { data: locationsList, isLoading: isLocationsLoading } =
    useLocationControllerServiceGetAllLocations({ providerGroupUuid });
  const { data: providersList, isLoading: isProvidersLoading } =
    useProviderControllerServiceGetAllProviders({
      providerGroupUuid,
      page: 0,
      size: 50,
    });

  let setInactiveLocations: any = [];

  useEffect(() => {
    if (locationsList?.data && locationsList.data?.content)
      setInactiveLocations =
        locationsList &&
        locationsList?.data?.content?.filter(
          (item: any) => item.active !== false
        );
    setLocations(setInactiveLocations as any);
  }, [isLocationsLoading, locationsList?.data]);

  useEffect(() => {
    if (providersList?.data && providersList.data?.content)
      setProviders(providersList.data.content);
  }, [isProvidersLoading, providersList?.data]);

  const formattedDate = (originalDateTimeString: any) => {
    const originalDate = new Date(originalDateTimeString);
    const formattedTime = originalDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  };

  useEffect(() => {
    mutateAsync({
      requestBody: getAvailabilitiesPayload,
    }).then((res: any) => {
      let array: any[] = [];
      if (res?.data && res.data[0]) {
        res.data.map((res: any) => {
          setAvailabilityTimeZone(res?.timeZone);
          res.timeDateIntervalSet?.map((availability: any) => {
            array.push({
              title: `${
                res.virtual ? "Virtual" : res.location?.name || "Location"
              }    ${formattedDate(
                convertLocalToUTC(availability.from, res?.timeZone)
              )}-${formattedDate(
                convertLocalToUTC(availability.to, res?.timeZone)
              )}`,
              start: convertLocalToUTC(availability.from, res?.timeZone),
              end: convertLocalToUTC(availability.to, res?.timeZone),
              location: res.location,
              provider: res.provider,
            });
          });
        });
      }
      setEvents(array);
    });
  }, [getAvailabilitiesPayload, refetch, props.isRefetchData]);

  const customDayPropGetter = (date: any) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const isCurrentDate =
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

    return {
      style: {
        color: isCurrentDate ? "#2C57B3 !important" : "blue", // Change the color for the current date
      },
    };
  };

  const openEventModal = (slotInfo: any) => {
    setEditData(slotInfo);

    let date = moment(slotInfo?.start || "").format("Do MMMM");
    let selectedDate = moment(slotInfo?.start).format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
    let currentDate = moment(now).format("YYYY-MM-DD");
    setModalTitle(`${date} Availability`);
    setOpenEvent(true);
    if (moment(selectedDate).isBefore(currentDate)) return false;
  };

  const handleClose = () => {
    setModalTitle("");
    setOpenEvent(false);
    setRefetch(!refetch);
  };

  const CustomEventWrapper = ({ children, event }: any) => {
    const customStyle = {
      background: event.location ? "#3434FF1A !important" : "#EAC6001A",
      border: event.location
        ? "border: 1px solid #3434FF !important"
        : "1px solid #EAC600",
    };

    return React.cloneElement(React.Children.only(children), {
      style: {
        ...children.props.style,
        ...customStyle,
      },
    });
  };

  return (
    <>
      <Grid item xs={12} mt={2}>
        <div style={{ height: "540pt" }}>
          <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            date={selectedMonth}
            // tooltipAccessor={'start'}
            localizer={localizer}
            dayPropGetter={customDayPropGetter}
            className={classes.customCalendar}
            defaultView="month"
            view="month"
            components={{
              toolbar: CustomToolbar,
              eventWrapper: CustomEventWrapper,
            }}
            onSelectEvent={openEventModal}
            onSelectSlot={openEventModal}
            min={now}
            popup={true}
            selectable
          />
        </div>
      </Grid>
      {openEvent && (
        <OpenEvent
          title={modalTitle}
          currentDate={selectedDate}
          open={openEvent}
          setOpen={setOpenEvent}
          handleClose={handleClose}
          btnTitle={"Save"}
          locations={locations}
          editData={editData}
          provider={selectedProvider}
        />
      )}
    </>
  );
}

export default CalenderView;

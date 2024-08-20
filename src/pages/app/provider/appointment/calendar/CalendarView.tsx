import React, { useCallback, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import Calendar from "@fullcalendar/react";
import CalendarHeader from "./calendarHeader";
import {
  useAppointmentControllerServiceGetAppointmentDetails,
  useAppointmentControllerServiceGetAppointmentListForCalender,
  useEncounterControllerServiceCreateEncounter,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  AppointmentCalenderViewRequest,
  EncounterRequest,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import moment from "moment";
import { Box } from "@mui/material";
import CalenderAppointmentDetails from "./calenderAppointmentDetails";
import { SearchCriteria } from "./appointments";
import Loading from "../../../../../components/common/spinner/loading";
import CommonModal from "../../../../../components/common/modal/common-modal";
import AppointmentDetail from "./appointmentDetailModal";
import ChangeStatusCheckIn from "./check-in-dialog";
import { CHECK_IN_TITLE } from "./appointmentWithLocations";
import { useNavigate } from "react-router-dom";
import { ErrorResponseEntity } from "../../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";

const { calenderViewType, month, appointmentType } =
  AppointmentCalenderViewRequest;
export type CalendarView =
  | "dayGridMonth"
  | "timeGridWeek"
  | "timeGridDay"
  | "listWeek";

interface CalendarViewProps {
  selectedItem: string;
  filter: SearchCriteria;
}
const CalendarView = ({ selectedItem, filter }: CalendarViewProps) => {
  const calendarRef = useRef<Calendar | null>(null);
  const [view, setView] = useState<CalendarView>("timeGridDay");
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<any[] | undefined>();
  const [showLoader, setShowLoader] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<any>(null);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [openStartEncounterModal, setOpenStartEncounterModal] = useState(false);
  const [appointmentListData, setApointmentList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleViewChange = useCallback((view: CalendarView): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(view);
      setDate(calendarApi.getDate());
      setView(view);
    }
  }, []);

  const handleCloseDialog = () => {
    setOpenStartEncounterModal((item) => !item);
  };

  const handleDateToday = useCallback((): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, []);

  const handleDatePrev = useCallback((): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, []);

  const handleDateNext = useCallback((): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, []);

  const [getWeekRange, setWeekRange] = useState({
    start: "",
    end: "",
  });

  function getWeekEndDate(date: any) {
    const dayOfWeek = date.getDay();
    const daysUntilEndOfWeek = 6 - dayOfWeek;

    const endDate = new Date(date);
    endDate.setDate(date.getDate() + daysUntilEndOfWeek);

    return endDate;
  }
  const { mutateAsync: getAppointmentReq, data: appointmentList } =
    useAppointmentControllerServiceGetAppointmentListForCalender();
  const userDetail = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const getCalenderViewType = (view: any): any => {
    if (view === "dayGridMonth") {
      return calenderViewType.MONTH;
    } else if (view === "timeGridWeek") {
      return calenderViewType.WEEK;
    } else {
      return calenderViewType.DAY;
    }
  };

  const dateMonth = format(date, "MMMM");
  const dateDay = format(date, "dd");
  const dateYear = format(date, "y");
  const getMonthName = (date: string) => {
    const monthNumber = new Date(date).getMonth();
    const options: any = { month: "long" };
    const monthName = new Date(0, monthNumber, 1).toLocaleString(
      "en-US",
      options
    );
    return monthName;
  };
  if (showLoader) {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }

  const {
    data: appointmentData,
    isLoading: isAppointmentLoading,
    isSuccess: isAppointmentSuccess,
    isRefetching: isAppointmentRefetching,
    refetch: appointmentRefetch,
  } = useAppointmentControllerServiceGetAppointmentDetails(
    {
      id: selectedAppointmentId,
    },
    [selectedAppointmentId],
    { enabled: selectedAppointmentId ? true : false }
  );
  const getAppointmentList = () => {
    const calendarApi = calendarRef.current?.getApi();
    const startDate = calendarApi
      ? calendarApi.view.currentStart
      : moment().format("YYYY-MM-DD");
    setShowLoader(true);
    let requestBody: any = {
      calenderViewType: getCalenderViewType(view),
      month: format(
        date,
        "MMMM"
      ).toUpperCase() as AppointmentCalenderViewRequest.month,

      year: parseInt(format(date, "y")),
      providerUserUuid: userDetail?.data?.userUuid,
      providerUuid: filter?.searchProvider || [],
      appointmentStatus: filter.selectStatus?.value
        ? [filter.selectStatus?.value]
        : [],
      appointmentType: filter.appointmentType?.value || null,
      appointmentListLocationRequest: {
        locationUuid: filter?.locationUuid,
        availabilityPresenceType:
          filter.availabilityPresenceType?.value || null,
      },
      patientSearch: filter?.patientSearch,
    };
    if (getCalenderViewType(view) !== calenderViewType.MONTH) {
      requestBody = {
        ...requestBody,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(startDate).add(8, "days").format("YYYY-MM-DD"),
      };
    }
    getAppointmentReq({
      requestBody,
    })
      .then((res) => {
        const events = res?.data?.map((dayEvent: any) => {
          return {
            date: dayEvent?.appointmentDate,
            start: `${dayEvent?.appointmentDate}T${dayEvent?.startTime}`,
            extendedProps: {
              appointmentType: dayEvent?.appointmentType,
              appointmentId: dayEvent?.appointmentId,
              patientName: dayEvent?.patientName,
              startTime: dayEvent?.startTime,
              endTime: dayEvent?.endTime,
              appointmentStatus: dayEvent?.appointmentStatus,
              visitType: dayEvent?.presentType,
              appointmentUuid: dayEvent?.appointmentUuid,
              providerName: dayEvent?.providerName,
              chiefCompliant: dayEvent?.reasonOfVisit,
              appointmentDate: dayEvent?.appointmentDate,
              locationName: dayEvent?.locationName,
              patientUuid: dayEvent?.patientUuid,
            },
          };
        });

        setEvents(events.flat());
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  useEffect(() => {
    getAppointmentList();
  }, [view, filter, date]);
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const start = calendarApi.view.currentStart;
      start.setDate(start.getDate() + 1);
      const end = getWeekEndDate(start);
      end.setDate(end.getDate() + 1);
      const startDateFormatted = new Date(start);
      const endDateFormatted = new Date(end);

      setWeekRange((prev: any) => ({
        ...prev,
        start: calendarApi.view.currentStart,
        end: getWeekEndDate(calendarApi.view.currentStart),
      }));
    }
  }, [calendarRef, date]);

  const titleData = CHECK_IN_TITLE;

  const handleEditDemographics = () => {
    navigate("/provider/add-patient", {
      state: { titleData, appointmentDetails },
    });
  };

  const handlePatientCharting = () => {
    navigate("/provider/patient-details", { state: { appointmentDetails } });
  };

  const {
    mutateAsync: callCheckIn,
    isError,
    error,
  } = useEncounterControllerServiceCreateEncounter();

  const handleCompleteCheckIn = async () => {
    const currDate = new Date();
    const requestBody = {
      appointmentId: appointmentDetails.appointmentId,
      status: EncounterRequest.status.CHECK_IN,
      serviceDate: currDate as any,
      note: "",
    };

    await callCheckIn({ requestBody: requestBody }).then((res: any) => {
      // dispatch(
      //   alertAction.setAlert({
      //     open: true,
      //     message: res.message,
      //     severity: "success",
      //   })
      // );
      const encounterUuid = res.data?.encounterUuid;
      navigate("/provider/appointment/calendar/complete-intake", {
        state: { appointmentDetails, encounterUuid },
      });
    });
  };

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  return (
    <div
      style={{
        height: "45rem",
        marginTop: "20px",
        background: "#ffffff",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      {showLoader && <Loading />}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          pt: 2,
        }}
      >
        <CalendarHeader
          source={selectedItem}
          onViewChange={handleViewChange}
          date={date}
          //onAddClick={handleAddClick}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          view={view}
          getWeekRange={getWeekRange}
        />
      </Box>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        contentHeight={600}
        events={events}
        headerToolbar={false}
        allDaySlot={false}
        editable={true}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        timeZone="IST"
        views={{
          timeGridWeek: {
            titleFormat: { year: "numeric", month: "long", day: "numeric" },
          },
        }}
        eventContent={(props) => (
          <CalenderAppointmentDetails
            {...props}
            handleDialogOpen={(e: any, data: any) => {
              setSelectedAppointmentId(e);
              setAppointmentDetails(data);
              appointmentRefetch();
              setOpenStartEncounterModal(true);
            }}
          />
        )}
        weekends
      />

      {/* <CommonModal
        open={openStartEncounterModal}
        dialogTitle="Appointment Detail"
        buttonName=""
        isShowActionButton={true}
        handleClose={() => setOpenStartEncounterModal(false)}
        component={() => (
          <AppointmentDetail
            appointmentDetail={appointmentList?.data?.find(
              (item: any) => item.appointmentId === selectedAppointmentId
            )}
          />
        )}
      /> */}
      {openStartEncounterModal && (
        <ChangeStatusCheckIn
          open={openStartEncounterModal}
          onClose={handleCloseDialog}
          appointmentDetails={appointmentDetails}
          handleEditDemographics={handleEditDemographics}
          handleCompleteCheckIn={handleCompleteCheckIn}
          handlePatientCharting={handlePatientCharting}
        />
      )}
    </div>
  );
};

export default CalendarView;

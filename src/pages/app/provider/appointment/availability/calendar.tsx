import { Grid } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import { AvailabilityControllerService } from "../../../../../sdk/thinkemr-core-0.0.1/requests";

const localizer = momentLocalizer(moment);

const getDataFromSessionStorage = () => {
  const encodedData = sessionStorage.getItem("loginUser");
  const providerData = encodedData ? JSON.parse(encodedData) : null;
  return providerData;
};

// const styles = makeStyles(() => ({
//   mainToolbarContainer: {
//     marginBottom: "20px",
//     position: "relative",
//     display: "flex !important",
//     justifyContent: "space-between",
//   },
//   navigateBar: {
//     padding: "10px 20px !important",
//     borderRadius: "5px !important",
//     gap: "2rem",
//   },
//   navigateBarText: {
//     color: "#36588C",
//     fontSize: "14px",
//   },
//   filterContainer: {
//     display: "flex",
//     flexDirection: "row",
//     padding: "10px 20px !important",
//     borderRadius: "5px !important",
//     gap: "2rem",
//   },
//   viewActive: {
//     background: "#DAEAF8",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     color: "#36588C",
//     fontSize: "14px",
//   },
//   viewInactive: {
//     padding: "5px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     color: "#36588C",
//     fontSize: "14px",
//   },
// }));

// const sxs = {
//   labelGrid: {
//     display: "flex",
//     justifyContent: "space-between",
//     width: "12rem",
//   },
//   label: {
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//   },
//   inperson: {
//     height: "2vh",
//     width: "2vh",
//     background: "#DAEAF8",
//   },
//   virtual: {
//     height: "2vh",
//     width: "2vh",
//     background: "#FCD27F",
//   },
// };

// const myEventsList = [
//   {
//     title: "12:00 PM - 02:00 PM",
//     allDay: true,
//     start: new Date(2023, 8, 0),
//     end: new Date(2023, 8, 1),
//     type: "in-person",
//   },
//   {
//     title: "02:00 PM - 04:00 PM",
//     allDay: true,
//     start: new Date(2023, 8, 0),
//     end: new Date(2023, 8, 1),
//     type: "virtual",
//   },
//   {
//     title: "11:00 AM - 01:00 PM",
//     start: new Date(2023, 8, 4),
//     end: new Date(2023, 8, 5),
//     type: "in-person",
//   },
//   {
//     title: "04:00 PM - 05:00 PM",
//     start: new Date(2023, 8, 4),
//     end: new Date(2023, 8, 5),
//     type: "virtual",
//   },
//   {
//     title: "04:00 PM - 05:00 PM",
//     start: new Date(2023, 2, 13, 0, 0, 0),
//     end: new Date(2023, 2, 20, 0, 0, 0),
//     type: "in-person",
//   },
//   {
//     title: "01:00 PM - 03:00 PM",
//     start: new Date(2023, 8, 6),
//     end: new Date(2023, 8, 6),
//     type: "virtual",
//   },
//   {
//     title: "10:00 AM - 12:00 PM",
//     start: new Date(2023, 8, 8, 0, 0, 0),
//     end: new Date(2023, 8, 8, 0, 0, 0),
//     type: "in-person",
//   },
//   {
//     title: "02:00 PM - 03:00 PM",
//     start: new Date(2023, 8, 8, 0, 0, 0),
//     end: new Date(2023, 8, 8, 0, 0, 0),
//     type: "virtual",
//   },
//   {
//     title: "11:00 AM - 03:00 PM",
//     start: new Date(2023, 8, 11),
//     end: new Date(2023, 8, 12),
//     type: "in-person",
//   },
//   {
//     title: "11:30 AM - 02:00 PM",
//     start: new Date(2023, 8, 12),
//     end: new Date(2023, 8, 13),
//     type: "virtual",
//   },
//   {
//     title: "12:00 PM - 03:00 PM",
//     start: new Date(2023, 8, 14),
//     end: new Date(2023, 8, 14),
//     type: "in-person",
//   },
//   {
//     title: "10:00 AM - 01:00 PM",
//     start: new Date(2023, 8, 19),
//     end: new Date(2023, 8, 19),
//     type: "virtual",
//   },
//   {
//     title: "02:00 AM - 04:00 PM",
//     start: new Date(2023, 8, 19),
//     end: new Date(2023, 8, 19),
//     type: "in-person",
//   },
//   {
//     title: "02:00 PM - 04:00 PM",
//     start: new Date(2023, 8, 22),
//     end: new Date(2023, 8, 22),
//     type: "virtual",
//   },
//   {
//     title: "10:00 PM - 01:00 PM",
//     start: new Date(2023, 11, 30),
//     end: new Date(2023, 11, 30),
//     type: "in-person",
//   },
//   {
//     title: "02:00 PM - 04:00 PM",
//     start: new Date(2023, 11, 30),
//     end: new Date(2023, 11, 30),
//     type: "virtual",
//   },
//   {
//     title: "11:00 PM - 01:00 PM",
//     start: new Date(2023, 11, 30),
//     end: new Date(2023, 11, 30),
//     type: "in-person",
//   },
// ];

const customStyles = `
.rbc-month-view{
  border:none;
}

.rbc-header{
  padding-bottom:1rem;
  border-bottom-color:#1A1A1A66;
}

.rbc-today{
  background-color:transparent;
}
.rbc-date-cell{
  text-align:center;
  padding-top: 0.2rem
}

.rbc-button-link{
  font-size:1.2rem;
  color:#000000;
  font-familyl:Roboto, sans-serif;
  //font-weight:bold
}

.rbc-now.rbc-button-link{
  color:red;
}

.rbc-off-range-bg{
  background-color:transparent;
},

.rbc-row-bg:last-child > rbc-day-bg {
  background-color: red
}

.rbc-current .rbc-button-link{
  background-color:#36588C;
  padding:8px;
  border-radius:50%;
  color:#fff;
}

.rbc-row-content .rbc-date-cell:last-child .rbc-button-link {
  color:#f76568
}
.rbc-row-content .rbc-date-cell:first-child .rbc-button-link {
    color:#f76568
  }

.rbc-month-header .rbc-header:last-child {
  color:#FF5E00 !important,
  font-weight:bold
}

.rbc-event{
//   background-color: #DAEAF8;
  color:#000000;
  font-size:14px;
  font-familyl:Roboto, sans-serif;
  text-align:center;
}

.rbc-row-segment{
  padding:0.5rem
}`;

type NavigateAction = "PREV" | "NEXT" | "TODAY" | "DATE";
type View = "month" | "week" | "day" | "agenda";
const CustomCalendar = () => {
  const today = new Date(); // Move this line to the top

  const myEventsList = [
    {
      uuid: "6f83145a-fcb6-456a-8f95-8571abcefc5b",
      day: "MONDAY",
      date: "2023-12-11",
      startTime: "00:00:00",
      endTime: "00:30:00",
      availability: null,
      action: null,
    },
    {
      uuid: "6f83145a-fcb6-456a-8f95-8571abcefc5b",
      day: "MONDAY",
      date: "2023-12-11",
      startTime: "00:00:00",
      endTime: "00:30:00",
      availability: null,
      action: null,
    },
    {
      uuid: "6f83145a-fcb6-456a-8f95-8571abcefc5b",
      day: "MONDAY",
      date: "2023-12-12",
      startTime: "00:00:00",
      endTime: "00:30:00",
      availability: null,
      action: null,
    },
  ];

  // const classes = styles();
  const [view] = useState<View>("month");
  const [currentYear] = useState<any>(today.getFullYear());
  const [currentMonth] = useState<any>(today.getMonth() + 1);
  const [providerId, setProviderId] = useState(
    getDataFromSessionStorage()?.uuid
  );
  const [locationId, setLocationId] = useState(
    getDataFromSessionStorage()?.workLocations[0]?.uuid
  );

  useEffect(() => {
    const encodedData = sessionStorage.getItem("loginUser");
    const providerData = encodedData ? JSON.parse(encodedData) : null;
    setProviderId(providerData?.uuid);
    setLocationId(providerData?.workLocations[0]?.uuid);
    getAvilability();
  }, []);

  // const handleViewChange = (value: View) => {
  //   setView(value);
  // };

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.type === "virtual" ? "#A5DEFF" : "#FCD27F";
    const style = {
      backgroundColor,
      borderRadius: "50px",
      margin: "0px",
    };
    return {
      style,
    };
  };

  const getAvilability = async () => {
    // await AvailabilityControllerService.getProviderAvailableDays(
    //   providerId,
    //   currentMonth,
    //   currentYear,
    //   locationId
    // );
  };

  const formattedEvents = myEventsList.map((event) => ({
    ...event,
    title: `${moment(event.startTime, "HH:mm:ss").format("hh:mm A")} - ${moment(
      event.endTime,
      "HH:mm:ss"
    ).format("hh:mm A")}`,
    start: new Date(`${event.date}T${event.startTime}`),
    end: new Date(`${event.date}T${event.endTime}`),
  }));

  return (
    <div
      style={{
        height: "45rem",
        marginTop: "20px",
        background: "#ffffff",
        // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView={view}
        eventPropGetter={eventStyleGetter}
        showMultiDayTimes={true}
        components={{
          // timeGutterHeader: TimeGutter,
          toolbar: ({
            label,
          }: {
            label: string;
            onNavigate: (navigate: NavigateAction) => void;
          }) => {
            console.log("label", label);

            return (
              <>
                <Grid mt={2}></Grid>
              </>
            );
          },
        }}
      />

      <style>{customStyles}</style>
    </div>
  );
};
export default CustomCalendar;

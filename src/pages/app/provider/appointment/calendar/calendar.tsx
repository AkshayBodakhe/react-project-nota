import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ButtonBase, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

const localizer = momentLocalizer(moment);

const styles = makeStyles(() => ({
    mainToolbarContainer: { marginBottom: "20px", position: "relative", display: "flex !important", justifyContent: 'space-between' },
    navigateBar: {
        padding: '10px 20px !important',
        borderRadius: "5px !important",
        gap: "2rem",
    },
    navigateBarText: {
        color: "#36588C",
        fontSize: "14px",
    },
    filterContainer:{
        display: 'flex', flexDirection: 'row', padding: '10px 20px !important',
        borderRadius: "5px !important",
        gap: "2rem",
    },
    viewActive: {
        background: '#DAEAF8',
        padding: '5px 10px',
        borderRadius: '5px',
        color: "#36588C",
        fontSize: "14px"
    },
    viewInactive: {
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        color: "#36588C",
        fontSize: "14px"
    }
}));

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
  padding-top:0.3rem
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
  padding:10px;
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
  background-color:#DAEAF8;
  color:#000000;
  font-size:14px;
  font-familyl:Roboto, sans-serif;
  text-align:center;
}

.rbc-row-segment{
  padding:0.5rem
}`;
const myEventsList = [
    {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2023, 8, 0),
        'end': new Date(2023, 8, 1)
    },
    {
        'title': 'Long Event',
        'start': new Date(2023, 8, 7),
        'end': new Date(2023, 8, 10)
    },

    {
        'title': 'DTS STARTS',
        'start': new Date(2023, 2, 13, 0, 0, 0),
        'end': new Date(2023, 2, 20, 0, 0, 0)
    },

    {
        'title': 'DTS ENDS',
        'start': new Date(2023, 10, 6, 0, 0, 0),
        'end': new Date(2023, 10, 13, 0, 0, 0)
    },

    {
        'title': 'Some Event',
        'start': new Date(2023, 8, 8, 0, 0, 0),
        'end': new Date(2023, 8, 8, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'start': new Date(2023, 8, 11),
        'end': new Date(2023, 8, 13),
        desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'start': new Date(2023, 8, 12, 10, 30, 0, 0),
        'end': new Date(2023, 8, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start': new Date(2023, 8, 12, 12, 0, 0, 0),
        'end': new Date(2023, 8, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Meeting',
        'start': new Date(2023, 8, 12, 14, 0, 0, 0),
        'end': new Date(2023, 8, 12, 15, 0, 0, 0)
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2023, 8, 12, 17, 0, 0, 0),
        'end': new Date(2023, 8, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Dinner',
        'start': new Date(2023, 8, 12, 20, 0, 0, 0),
        'end': new Date(2023, 8, 12, 21, 0, 0, 0)
    },
    {
        'title': 'Birthday Party',
        'start': new Date(2023, 8, 13, 7, 0, 0),
        'end': new Date(2023, 8, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 2',
        'start': new Date(2023, 8, 13, 7, 0, 0),
        'end': new Date(2023, 8, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 8',
        'start': new Date(2023, 8, 13, 7, 0, 0),
        'end': new Date(2023, 8, 13, 10, 30, 0)
    },
    {
        'title': 'Late Night Event',
        'start': new Date(2023, 8, 17, 19, 30, 0),
        'end': new Date(2023, 8, 18, 2, 0, 0)
    },
    {
        'title': 'Multi-day Event',
        'start': new Date(2023, 8, 20, 19, 30, 0),
        'end': new Date(2023, 8, 22, 2, 0, 0)
    }
]
type NavigateAction = "PREV" | "NEXT" | "TODAY" | "DATE";
type View = 'month' | 'week' | 'day' | 'agenda';
const CalendarScheduler = () => {
    const classes = styles();
    const [view, setView] = useState<View>('month')

    const handleViewChange = (value: View) => {
        setView(value)
    }
    return (
        <div style={{ height: '45rem', marginTop: '20px', background: '#ffffff', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)", }}>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                view={view}
                components={{
                    //timeGutterHeader: TimeGutter,
                    toolbar: ({
                        label,
                        onNavigate,
                    }: {
                        label: string;
                        onNavigate: (navigate: NavigateAction) => void;
                    }) => {
                        console.log("label",label);
                        
                        return (
                            <Grid
                                container
                                className={classes.mainToolbarContainer}
                            >
                                <ButtonBase
                                    disableTouchRipple
                                    className={classes.navigateBar}
                                >
                                    <Typography
                                        onClick={() => onNavigate("TODAY")}
                                        variant="h4"
                                        className={classes.navigateBarText}
                                    >
                                        Today
                                    </Typography>
                                    <Typography
                                        onClick={() => onNavigate("PREV")}
                                        variant="h4"
                                        className={classes.navigateBarText}
                                    >
                                        Prev
                                    </Typography>
                                    <Typography
                                        onClick={() => onNavigate("NEXT")}
                                        variant="h4"
                                        className={classes.navigateBarText}
                                    >
                                        Next
                                    </Typography>
                                </ButtonBase>
                                <Grid className={classes.filterContainer}>
                                    <Grid className={view === 'month' ? classes.viewActive : classes.viewInactive}>
                                        <Typography
                                            onClick={() => handleViewChange("month")}
                                            variant="h4"
                                        >
                                            Month
                                        </Typography>
                                    </Grid>
                                    <Grid className={view === 'week' ? classes.viewActive : classes.viewInactive}>
                                        <Typography
                                            onClick={() => handleViewChange("week")}
                                            variant="h4"
                                        >
                                            Week
                                        </Typography>
                                    </Grid>
                                    <Grid className={view === 'day' ? classes.viewActive : classes.viewInactive}>
                                        <Typography
                                            onClick={() => handleViewChange("day")}
                                            variant="h4"
                                        >
                                            Day
                                        </Typography>
                                    </Grid>
                                    <Grid className={view === 'agenda' ? classes.viewActive : classes.viewInactive}>
                                        <Typography
                                            onClick={() => handleViewChange("agenda")}
                                            variant="h4"
                                        >
                                            Agenda
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    },
                }}
            />

            <style>{customStyles}</style>
        </div>
    );
}
export default CalendarScheduler;
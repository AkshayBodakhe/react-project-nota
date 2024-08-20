import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CalendarPrime from "../../admin/dashboard/calendar";
import { useState } from "react";
// import encounter from "../../../../assets/icon/encounter.png";
// import featherTrendingUp from "../../../../assets/icon/featherTrendingUp.png";
import HomeCardsDashboard from "./home-cards";

export const homeStyles = makeStyles(() => ({
    dashboardMainGrid: {
        width: "auto !important",
        marginBottom: "10px",
    },
    calendarGrid: {
        display: "flex",
        justifyContent: "end",
        paddingLeft: "275px !important",
    }
}));

function Home() {
    const classes = homeStyles();
    const [showCalendar] = useState(false);

    const handleDateSelect = () => {
        // setSelectedStartDate(startDate);
        // setSelectedEndDate(endDate);
    };

    const cardData = [
        {
            showProgressbar: true,
            showCalendarIcon: false,
            amount: 32,
            title: "Pending Charges",
            content: "Patients",
            patients: '271',
        },
        {
            showProgressbar: true,
            showCalendarIcon: false,
            amount: 46,
            title: "Pending Charges",
            content: "Patients",
            patients: '157',
        },
        {
            showProgressbar: false,
            showCalendarIcon: true,
            title: "Total 24",
            content: "No Show Appointments",
        },
        {
            showProgressbar: false,
            showCalendarIcon: true,
            icon: false,
            title: "Total 32",
            content: "Cancelled Appointments",
        },
        // {
        //     icon: encounter,
        //     count: "35",
        //     title: "Encounters",
        //     content: "5% higher than last month",
        //     patients: '327',
        // },
    ];

    return (
        <div>
            {showCalendar && <CalendarPrime onDateSelect={handleDateSelect} />}
            <Grid
                container
                // rowSpacing={4.5}
                columnSpacing={2.75}
                className={classes.dashboardMainGrid}
            >
                <Grid item xs={8}></Grid>
                <Grid item xs={4} className={classes.calendarGrid}>
                    <CalendarPrime onDateSelect={handleDateSelect} />
                </Grid>
                {cardData.map((card, index) => (
                    <Grid
                        key={index}
                        item
                        // xs={12}
                        // sm={12}
                        // md={4}
                        lg={3}
                        sx={{paddingTop: "10px !important"}}
                    >
                        <HomeCardsDashboard {...card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Home;

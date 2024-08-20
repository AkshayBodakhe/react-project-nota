import React from "react";
import { Box, Grid } from "@mui/material";
// import PropTypes from "prop-types";
// import theme from "../../../../theme";
import { LinearProgress } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export const dashboardCardIcon = {
    display: "flex",
    marginLeft: "-15px",
    marginTop: "5px",
    justifyContent: "center",
};

export const dashboardCards = {
    //   paddingTop: "10px",
    //   paddingBottom: "10px",
    padding: "10px",
    border: "3px solid #DAEAF8",
    borderRadius: "5px",
    backgroundColor: "white",
};
interface HomeCardsDashboardProps {
    title?: string;
    count?: number;
    icon?: boolean;
    content?: string;
    patients?: string;
    showProgressbar: boolean;
    showCalendarIcon: boolean;
    amount?: number;
}

const HomeCardsDashboard: React.FC<HomeCardsDashboardProps> = ({
    title,
    amount,
    content,
    showCalendarIcon,
    showProgressbar,
    patients,
}) => {
    return (
        <Box sx={dashboardCards}>
            <Grid container>
                <Grid item xs={12}>
                    <Box>
                        <Box
                            sx={{
                                fontSize: "18px",
                                fontFamily: "Roboto, san-sarif !imporatnt",
                                display: "flex",
                                color: "#4A4B4D",
                                gap: '10px'
                            }}
                        >
                            {showCalendarIcon && (
                                <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>
                            )}
                            {title}
                        </Box>
                        {showProgressbar && (
                            <Box sx={{ display: "flex", justifyContent: 'space-between', marginTop: '2px' }}>
                                <Box
                                    // color={theme.palette.primary.main}
                                    sx={{ fontSize: "18px" }}
                                >
                                    $ {amount}K
                                </Box>
                                <Box>{patients} Patients</Box>
                            </Box>
                        )}
                        {showCalendarIcon && <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                            <Box
                                // color={theme.palette.primary.main}
                                sx={{ fontSize: "18px" }}
                            >
                                {content}
                            </Box>
                        </Box>}
                        {showProgressbar && (
                            <LinearProgress
                                variant="determinate"
                                value={amount}
                            ></LinearProgress>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeCardsDashboard;

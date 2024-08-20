import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import theme from "../../../../theme";
export const dashboardCardIcon = {
  display: "flex",
  marginLeft: "15px",
  marginTop: "5px",
  justifyContent: "start",
};

export const dashboardCards = {
  padding: "15px 0",
  // border: "3px solid #DAEAF8",
  // borderRadius: "5px",
  backgroundColor: "white",
  // background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 0px 6px #00000029",
  borderRadius: "10px",
  opacity: 1,
};
interface CardsDashboardProps {
  title?: string;
  count?: string;
  icon?: string;
  content?: string;
  percentageIcon?: string;
}

const CardsDashboard: React.FC<CardsDashboardProps> = ({
  title,
  count,
  icon,
  // content,
  // percentageIcon,
}) => {
  return (
    <Box sx={dashboardCards}>
      <Grid container>
        <Grid item xs={5}>
          <Box sx={dashboardCardIcon}>
            <img src={icon} alt="Icon" style={{ height: "70px" }} />
          </Box>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            marginLeft: "-10px !important ",
            display: "flex !important",
            justifyContent: "end !important",
          }}
        >
          <Box
            sx={{
              display: "flex !important",
              flexDirection: "column !important",
              alignItems: "end !important",
            }}
          >
            <Typography
              color={theme.palette.primary.main}
              sx={{ fontSize: "20px", fontWeight: "bold !important" }}
            >
              {count}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold !important",
                color: "#4A4B4D",
                letterSpacing: 0.5,
              }}
            >
              {title}
            </Typography>
            {/* <Grid container>
              <Grid item>
                <Typography sx={{ fontSize: "14px" }} mt={1}>
                  <img src={percentageIcon} alt="Icon" />
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  marginTop: "5px !important",
                  marginLeft: "2px !important",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}> {content}</Typography>
              </Grid>
            </Grid> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

CardsDashboard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.string,
  percentageIcon: PropTypes.string,
};

export default CardsDashboard;

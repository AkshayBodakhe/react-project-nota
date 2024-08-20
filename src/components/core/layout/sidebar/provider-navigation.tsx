/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useStyles } from "../styles";

const providerStyles = {
  deActiveListText: {
    "&:hover": {
      color: "#36588C !important",
      background: "#CCECFF 0% 0% no-repeat padding-box !important",
    },
  },
  providerSidebar: {
    maxWidth: "196px",
    margin: "16px",
  },
  sideBarButton: {
    width: "196px",
    height: "40px",
    background: "#36588C 0% 0% no-repeat padding-box !important",
    borderRadius: " 5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "space-evenly !important",
  },
  sidebarListContainer: {
    width: "100%",
    minHeight: "85vh",
  },
  sidebarBox: {
    background: "#fff",
    boxShadow: "0px 0px 8px #00000029",
    borderRadius: "5px",
    width: "100%",
    marginTop: "20px",
    height: "100%",
  },
};
interface ProviderNavigationProps {
  barData: any;
}

const ProviderNavigationComponent: React.FC<ProviderNavigationProps> = ({
  barData,
}) => {
  const classes = useStyles();
  return (
    <Grid sx={providerStyles.providerSidebar} container>
      <Grid>
        <ButtonBase sx={providerStyles.sideBarButton} focusRipple>
          <span>
            <Add />
          </span>
          <Typography>Add New Provider</Typography>
        </ButtonBase>
      </Grid>
      <Grid sx={providerStyles.sidebarListContainer}>
        <Box sx={providerStyles.sidebarBox}>
          <List>
            {barData.map((data: any) => {
              return (
                <ListItem
                  classes={{
                    button: classes.listItemStyle,
                    root: classes.listItemStyleClass,
                  }}
                  button
                  focusRipple
                >
                  <Typography sx={providerStyles.deActiveListText}>
                    {data.name}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProviderNavigationComponent;

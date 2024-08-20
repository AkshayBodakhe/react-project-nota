import { Box, Grid, Typography } from "@mui/material";
import AppLayout from "../../../../components/core/layout/layout";
import { PROVIDER } from "../documents/documents-constant/documents-common-const";
import { useEffect, useState } from "react";
import ProviderHomePage from "./index";
import ProviderAdminDashboard from "./provider-admin-dashboard";
import { useSelector } from "react-redux";
import Loading from "../../../../components/common/spinner/loading";

const sxs = {
  mainButtonStyle: {
    backgroundColor: "#DAEAF8",
    textTransform: "initial",
    fontSize: "14px",
    // fontWeight: "bold",
    color: "#36588C",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "4px",
  },
  addButtonIcon: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "12px",
    opacity: 0.7,
  },
  calendarListOuter: {
    display: "flex",
    flexDirection: "row",
    background: "#ffffff",
    justifyContent: "center",
    borderRadius: "5px",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    alignItems: "center",
    padding: "3px",
    gap: 1,
  },
  activeItem: {
    background: "#36588C",
    justifyContent: "center",
    color: "#ffffff",
    alignItems: "center",
    display: "flex",
    padding: "5px",
    borderRadius: "3px",
    width: "140px",
  },
  inActiveItem: {
    background: "#ffffff",
    color: "#36588C",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: "1px",
    borderRadius: "3px",
    cursor: "pointer",
    width: "140px",
  },
};

const ProviderCommonDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("provider");
  const onSelectionItemChange = (value: string) => {
    setSelectedItem(value);
  };
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          paddingY: "8px",
        }}
      >
        <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
          {userDetails?.data?.roleType !== "STAFF"
            ? "Provider"
            : "Provider Admin"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // width: "100%",
            justifyContent: "flex-end",
            gap: 2,
            height: "35px",
          }}
        >
          {/* <Box sx={sxs.calendarListOuter}> */}
          {/* {userDetails?.data?.roleType !== "STAFF" && (
            <Box
              sx={sxs.activeItem}
              onClick={() => onSelectionItemChange("provider")}
              sx={
                selectedItem !== "providerAdmin"
                  ? sxs.activeItem
                  : sxs.inActiveItem
              }
            >
              <Typography variant="h2" fontWeight={"500"}>
                {"Provider"}
              </Typography>
            </Box>
          )} */}
          {/* {userDetails?.data?.roleType === "STAFF" && (
            <Box
              sx={sxs.activeItem}
              onClick={() => onSelectionItemChange("providerAdmin")}
              sx={
                selectedItem === "providerAdmin"
                  ? sxs.activeItem
                  : sxs.inActiveItem
              }
            >
              <Typography variant="h2" fontWeight={"500"}>
                {"Provider Admin"}
              </Typography>
            </Box>
          )} */}
        </Box>
      </Box>
      {/* </Box> */}
      <Box>
        {/* <Grid>{!userDetails?.data && <Loading />}</Grid>
        <Grid>
          {userDetails?.data && userDetails?.data?.roleType !== "STAFF" && (
            <ProviderHomePage />
          )}
        </Grid>
        <Grid>
          {userDetails?.data && userDetails?.data?.roleType === "STAFF" && (
            <ProviderAdminDashboard />
          )}
        </Grid> */}
        {userDetails?.data?.roleType === "STAFF" ? (
          <ProviderAdminDashboard />
        ) : userDetails?.data?.roleType !== "STAFF" ? (
          <ProviderHomePage />
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
};

export default AppLayout(ProviderCommonDashboard, { source: PROVIDER });

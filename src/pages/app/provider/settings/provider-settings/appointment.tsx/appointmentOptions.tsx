import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { providerConstants } from "../../../../../../constants/provider";
import { formButtonStyle } from "../../../../../../styles/common";
import { style } from "../provider-group-settings.tsx/provider-group-options";
import { AppointmentHeaderTabs } from "../provider-setting-constats";
import AddAvailability from "./add-availability/add-availability";
import CancellationPolicy from "./cancellation-policy";
import CalenderView from "./calenderView";
import ColorConfiguration from "./color-configuration/color-configuration";
interface AppointOptionsInterface {
  setIsSetting?: any;
  tabIndex?: number;
}
const { ADD_AVAILABILITY, EDIT_AVAILABILITY } = providerConstants;
function AppointmentOptions(props: AppointOptionsInterface) {
  const classes = style();
  const [value, setValue] = useState(props.tabIndex);
  const [openAddAppointment] = useState(false);
  const [addAvailability, setAddAvailability] = useState(false);
  const [editAvilabilty, setEditAvilabilty] = useState(false);
  const [isRefetchData, setIsRefetchData] = useState(false);
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      sx={{
        background: "#fff",
        boxShadow: "0px 0px 8px #00000029",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent={"space-between"}>
          <Grid item sx={{ display: "flex", gap: "8px" }}>
            <ArrowBackOutlinedIcon
              sx={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => props.setIsSetting()}
            />
            <Typography sx={{ color: "#1A1A1ACC", fontWeight: 600 }}>
              Appointment Settings
            </Typography>
          </Grid>
          {value == 0 && (
            <Grid
              item
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Grid item>
                <Button
                  sx={formButtonStyle.editProfileBtn}
                  onClick={() => setEditAvilabilty(true)}
                >
                  <EditOutlinedIcon
                    sx={{ color: "#1B5984", fontSize: "18px" }}
                  />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    Edit Availability
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={formButtonStyle.saveButtonStyle}
                  onClick={() => setAddAvailability(!openAddAppointment)}
                >
                  <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    Add Availability
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {AppointmentHeaderTabs.map((tab: any) => (
                  <Tab
                    key={tab.label}
                    className={classes.tab}
                    sx={{ textTransform: "capitalize" }}
                    label={tab.label}
                  />
                ))}
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {value == 0 && <CalenderView isRefetchData={isRefetchData} />}
          {value == 1 && <ColorConfiguration />}
          {value == 2 && <CancellationPolicy />}
        </Grid>
      </Grid>
      <AddAvailability
        title={ADD_AVAILABILITY}
        source="Add"
        open={addAvailability}
        setOpen={setAddAvailability}
        setIsRefetchData={setIsRefetchData}
        isRefetchData={isRefetchData}
      />
      <AddAvailability
        title={EDIT_AVAILABILITY}
        source="Edit"
        open={editAvilabilty}
        setOpen={setEditAvilabilty}
        setIsRefetchData={setIsRefetchData}
        isRefetchData={isRefetchData}
      />
    </Grid>
  );
}

export default AppointmentOptions;

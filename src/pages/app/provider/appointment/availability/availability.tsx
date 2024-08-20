import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Box,
  ButtonBase,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import {
  useLocationControllerServiceGetAllLocations,
  useProviderControllerServiceGetAllProviders,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { formButtonStyle } from "../../../../../styles/common";
import { patientStyle } from "../../patient/style/commonStyle";
import CustomCalendar from "./calendar";
import EditAvailability from "./edit-availability";
import { useSelector } from "react-redux";

export const patientListStyle = makeStyles(() => ({
  addButtonTypo: {
    color: "white !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "12px",
    opacity: 0.7,
  },
}));

// const sxs = {
//   heading: {
//     margin: "10px 0 30px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

const ProviderAvailabilityPage = () => {
  const style = patientListStyle();
  const classes = patientStyle();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const [selectedStatus, setSelectStatus] = useState("");
  const [locationOptions, setLocationOptions] = useState<any>(null);
  const [selectLocation, setSelectLocation] = useState<any>(null);
  const [locationUUID, setLocationUUID] = useState("");
  const [providerUUID, setProviderUUID] = useState("");
  const [selectProvider, setProvider] = useState<any>(null);
  const [providerOptions, setProviderOptions] = useState<any>(null);
  const [editAvailability, setEditAvailability] = useState(false);
  const [calendar, setCalender] = useState<any>(null);
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const Pageable = {
    page: 0,
    size: 100,
  };

  const { data, isSuccess } = useProviderControllerServiceGetAllProviders({
    providerGroupUuid,
    searchBy: "",
    sourceId: undefined,
    ...Pageable,
  });

  const { data: getLocationsData, isSuccess: getLocations } =
    useLocationControllerServiceGetAllLocations({
      providerGroupUuid,
    });

  useEffect(() => {
    if (!!data && isSuccess) {
      setProviderOptions(data?.data?.content);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (getLocations && !!getLocationsData) {
      setSelectLocation(getLocationsData?.data?.content);
    }
  }, [getLocations]);

  const handleSelectOption = (e: any) => {
    setSelectStatus(e.target.value);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (Array.isArray(locationOptions)) {
      locationOptions.forEach((element: any) => {
        if (element.id == value) {
          const addressString = `${element?.billingAddress.line1 || ""} ${
            element?.billingAddress.line2 || ""
          } ${element?.billingAddress.city || ""} ${
            element?.billingAddress.state || ""
          } ${element?.billingAddress.country || ""} ${
            element?.billingAddress.zipcode || ""
          }`;
          setLocationOptions([addressString]);
          setLocationUUID(element.uuid);
        }
      });
    }
  };

  const handleChangeprovider = (event: any) => {
    if (Array.isArray(providerOptions)) {
      providerOptions.forEach((element: any) => {
        if (element.id == event.target.value) {
          setProviderUUID(element.uuid);
          const name = `${element.firstName || ""} ${element.lastName || ""}`;
          setProvider(name);
        }
      });
    }
  };

  const openEditAvailability = () => {
    setEditAvailability(true);
  };

  const handleDateChange = (date: any) => {
    setCalender(date);
  };

  //   const name = [
  //     "Oliver Hansen",
  //     "Van Henry",
  //     "April Tucker",
  //     "Ralph Hubbard",
  //     "Omar Alexander",
  //     "Carlos Abbott",
  //     "Miriam Wagner",
  //     "Bradley Wilkerson",
  //     "Virginia Andrews",
  //     "Kelly Snyder",
  //   ];
  const statusOptions = ["Both", "In-Person", "Virtual"];

  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid item>
          <Typography variant="h3" fontWeight={600}>
            Availability
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item>
              {/* <Typography variant="h5" className={classes.label}>
                Calender
              </Typography> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    marginTop: "5px",
                    // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <DatePicker
                    onChange={(date) => handleDateChange(date)}
                    value={calendar}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Select
                className={classes.selectInputStyle}
                sx={{
                  marginTop: "0px !important",
                  height: "37px !important",
                  width: "250px !important",
                }}
                value={selectProvider}
                name="provider"
                onChange={(e: any) => handleChangeprovider(e)}
                renderValue={(selected) => {
                  if (!selected || selected.length === 0) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Provider
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {providerOptions?.map((data: any) => {
                  return (
                    <MenuItem
                      key={data}
                      value={data.id}
                      className={classes.menuItemColorStyle}
                    >
                      {data.firstName} {data.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item>
              <Select
                className={classes.selectInputStyle}
                sx={{
                  marginTop: "0px !important",
                  height: "37px !important",
                  width: "250px !important",
                }}
                value={locationOptions}
                name="locations"
                onChange={(e: any) => handleChange(e)}
                renderValue={(selected) => {
                  if (!selected || selected.length === 0) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Locations
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {selectLocation?.map((value: any) => {
                  return (
                    <MenuItem
                      key={value.id}
                      value={value.id}
                      className={classes.menuItemColorStyle}
                    >
                      {/* <Checkbox
                            checked={selectLocation.indexOf(data) > -1}
                          /> */}{" "}
                      <Typography className={classes.btnTextDropList}>
                        {"  "} {value?.billingAddress.line1} {"  "}
                        {value?.billingAddress.line2}
                        {"  "} {value?.billingAddress.city}
                        {"  "} {value?.billingAddress.state}
                        {"  "} {value?.billingAddress.country} {"  "}
                        {value?.billingAddress.zipcode}{" "}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item>
              <Select
                className={classes.selectInputStyle}
                sx={{
                  marginTop: "0px !important",
                  height: "37px !important",
                  width: "250px !important",
                }}
                value={selectedStatus}
                name="status"
                onChange={(e: any) => handleSelectOption(e)}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Status
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {statusOptions.map((data) => {
                  return (
                    <MenuItem
                      key={data}
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item sx={{ display: "flex", gap: "10px" }}>
              <Grid item sx={{ display: "flex", gap: "5px" }}>
                <Box
                  sx={{
                    background: "#FCD27F !important",
                    width: "15px",
                    height: "15px",
                  }}
                ></Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#1A1A1A7F !importannt" }}
                >
                  In- Person
                </Typography>
              </Grid>
              <Grid item sx={{ display: "flex", gap: "5px" }}>
                <Grid
                  sx={{
                    background: "#A5DEFF !important",
                    width: "15px",
                    height: "15px",
                  }}
                ></Grid>
                <Typography
                  variant="h5"
                  sx={{ color: "#1A1A1A7F !importannt" }}
                >
                  Virtual
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <ButtonBase
                type="submit"
                sx={{
                  ...formButtonStyle.mainButtonStyle,
                  color: "white",
                  background: "#36598C !important",
                }}
                onClick={openEditAvailability}
              >
                {" "}
                <span className={style.addButtonTypo}>
                  <ModeEditOutlineOutlinedIcon />
                </span>
                Edit Availability
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CustomCalendar />
      {editAvailability && (
        <EditAvailability
          open={editAvailability}
          onClose={() => setEditAvailability(false)}
          title="Edit Availability"
        />
      )}
    </>
  );
};

export default ProviderAvailabilityPage;

import {
  Autocomplete,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { patientStyle } from "./style/commonStyle";
// import Select from "react-select";

export const multiSelectDropDown = {
  borderRadius: "5px",
  background: "#ffffff",
  marginTop: "15px",
  border: "none",
  "& fieldset": { border: "none" },
  ".MuiOutlinedInput-notchedOutline": { border: "none" },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",

  ".MuiOutlinedInput-root": {
    padding: "0px !important",
    height: "auto !important",
  },
  ".MuiChip-root": {
    height: "28px !important",
  },
};

function Preferences() {
  const classes = patientStyle();
  //   const style = {
  //     control: (base: any) => ({
  //       ...base,
  //       border: 0,
  //       // This line disable the blue border
  //       boxShadow: "none",
  //     }),
  //   };
  const providerNames = [
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd",
    "Mateo Barlow",
    "Samia Navarro",
    "Kaden Fields",
    "Genevieve Watkins",
    "Mariah Hickman",
    "Rocco Richardson",
    "Harris Glenn",
  ];
  return (
    <div>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{ fontWeight: "700" }}>Preferences</Typography>
      </Grid>
      <Grid container columnGap={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={3}>
          <Typography variant="h4" className={classes.label}>
            Preferred Pharmacy
          </Typography>
          <Autocomplete
            sx={multiSelectDropDown}
            multiple
            id="tags-standard"
            options={providerNames}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            renderOption={(props, option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ justifyContent: "space-between" }}
                {...props}
              >
                {option}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                classes={{ root: classes.customTextField }}
                {...params}
                variant="outlined"
                placeholder="Search And Select Pharmacy"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4" className={classes.label}>
            Preferred Labs
          </Typography>
          <Autocomplete
            sx={multiSelectDropDown}
            multiple
            id="tags-standard"
            options={providerNames}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            renderOption={(props, option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ justifyContent: "space-between" }}
                {...props}
              >
                {option}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                classes={{ root: classes.customTextField }}
                {...params}
                variant="outlined"
                placeholder="Search And Select Labs"
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4" className={classes.label}>
            Preferred Radiology
          </Typography>
          <Autocomplete
            sx={multiSelectDropDown}
            multiple
            id="tags-standard"
            options={providerNames}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            renderOption={(props, option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ justifyContent: "space-between" }}
                {...props}
              >
                {option}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField
                classes={{ root: classes.customTextField }}
                {...params}
                variant="outlined"
                placeholder="Search And Select Radiology"
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default Preferences;

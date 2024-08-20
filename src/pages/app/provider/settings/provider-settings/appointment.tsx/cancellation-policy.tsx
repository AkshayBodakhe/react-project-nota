import { Grid, InputBase, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { patientStyle } from "../../../patient/style/commonStyle";

function CancellationPolicy() {
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
  const [value, setValue] = useState(24);
  const [hours, setHours] = useState(["Hours"]);
  const [symbol] = useState(['%','$']);
  const [selectSymbol,setSelectSymbol] = useState('%');
  const [charge] = useState(100);
  return (
    <Grid
      mt={2}
      container
      sx={{
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid #1A1A1A29",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <Typography variant="h5">If a cilent cancels within</Typography>
        <Grid item xs={1}>
          <InputBase
            value={value}
            name="no"
            fullWidth
            placeholder="Enter Number"
            sx={{ marginTop: "0px" }}
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => setValue(e)}
          />
        </Grid>
        <Grid item xs={1}>
          <Select
            className={classes.selectInputStyle}
            sx={{ marginTop: "0px" }}
            value={hours}
            name="id"
            onChange={(e: any) => setHours(e)}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span>
                    <Typography variant="h5" className={classes.label}>
                      Select
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {hours?.map((data) => {
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
        <Typography variant="h5">of the appointment, charge a</Typography>
        <Grid item xs={1}>
          <InputBase
            value={charge}
            name="no"
            fullWidth
            sx={{ marginTop: "0px" }}
            classes={{
              root: classes.inputField,
              input: classes.inputBoxText,
              focused: classes.inputBoxActive,
            }}
            onChange={(e: any) => setValue(e)}
          />
        </Grid>
        <Grid item xs={1}>
          <Select
            className={classes.selectInputStyle}
            sx={{ marginTop: "0px" }}
            value={selectSymbol}
            name="id"
            onChange={(e: any) => setSelectSymbol(e)}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span>
                    <Typography variant="h5" className={classes.label}>
                      Select
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {symbol?.map((data) => {
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
        <Typography variant="h5">cancellation fee.</Typography>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Typography variant="h5" sx={{color:"#1A1A1A80"}}>The cancellation fee will only be chaged automatically if the client has provided a credit cards when booking.</Typography>
      </Grid>
    </Grid>
  );
}

export default CancellationPolicy;

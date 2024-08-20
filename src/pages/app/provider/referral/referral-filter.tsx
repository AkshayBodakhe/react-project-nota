import {
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { style } from "./style/common-style";

function ReferralFilter() {
  const classes = style();
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
  const [contact, setContactType] = useState("");
  const contactType = ["Insurance", "lab"];
  const handleSelectOption = (e: string) => {
    setContactType(e);
  };
  return (
    <Grid className={classes.container} mt={2}>
      <Grid p={2.5}>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Search By Patient
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Search Patient"
              />
              <IconButton
                type="button"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Search By Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose Date"
                slotProps={{ textField: { size: "small" } }}
                sx={{
                  width: "100%",
                  "& fieldset": { border: "none" },
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  "& label": {
                    color: "#1A1A1A80 !important",
                    fontSize: "14px !important",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Referral From
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={contact}
              name="primaryProvider"
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
                        Select Referral From
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {contactType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Referral To
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={contact}
              name="primaryProvider"
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
                        Select Referral To
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {contactType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Status
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={contact}
              name="primaryProvider"
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
                        Select Status
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {contactType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          mt={3}
          className={classes.main}
          alignItems="end"
        >
          <Grid item xs={2}>
            <Typography variant="h5" className={classes.label}>
              Select Speciality
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={contact}
              name="primaryProvider"
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
              {contactType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={2} sx={{display:"flex",justifyContent:"end",alignContent:"end"}}>
            <Typography variant="h5" className={classes.label}>
              &#x200B;
            </Typography>
            <ButtonBase
              sx={{
                color: "#36588C",
                border: "1px solid #36588C",
                borderRadius: "4px",
                padding: "8px 10px",
              }}
              // onClick={openModal}
            >
              <Typography variant="h5">Search</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ReferralFilter;

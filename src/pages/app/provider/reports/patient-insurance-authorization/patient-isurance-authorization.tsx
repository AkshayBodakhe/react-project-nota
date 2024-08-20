import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    ButtonBase,
    Checkbox,
    Grid,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import { PIAReportData } from "../../../../../mock-data/reportsData";
import { FilterSearch } from "../../../../../styles/auth-form";
import {
    formButtonStyle,
    selectInputStyle,
} from "../../../../../styles/common";
import ReportTable from "../report-table";
import { style } from "../style/report-style";
const { PROVIDER } = adminConstants;
export interface Column {
    id: string;
    label: string | JSX.Element;
    minWidth?: number;
  }
  export const Columns: Column[] = [
    { id: "checkbox", label: "", minWidth: 50 },
    { id: "authorization", label: "Authorization", minWidth: 120 },
    { id: "patientId", label: "Patient ID", minWidth: 100 },
    { id: "firstName", label: "First Name", minWidth: 120 },
    { id: "lastName", label: "Last Name", minWidth: 120 },
    { id: "procedureCodes", label: "Procedure Codes", minWidth: 120 },
    { id: "sdate", label: "Start Date", minWidth: 120 },
    { id: "edate", label: "End Date", minWidth: 120 },
    { id: "speciality", label: "Speciality", minWidth: 120 },
    { id: "approved", label: "Visits Approved", minWidth: 50 },
    { id: "remaining", label: "Visits Remaining", minWidth: 50 },
    { id: "status", label: "Status", minWidth: 50 },
  ];
  
  export interface Row {
    [key: string]: string | JSX.Element | number | any;
  }

function PIAReports() {
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
  const [openFilter, setFilter] = useState(false);
  const openFilterModal = () => {
    setFilter(true);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = () => {
    setFilter(false);
  };
  const [status, setStatus] = useState("");
  const statusList = ["pending", "Done"];
  const handleSelectOption = (e: string) => {
    setStatus(e);
  };

  const[data,setData] =useState<Row[]>([]);

  function createForm(
    authorization:string,
      patientId: string,
      firstName: string,
      lastName: string,
      procedureCodes: string,
      sdate:string,
      edate:string,
      speciality: string,
      approved: string,
      remaining:string,
      status: string,
  ): Row {
    return {
        authorization,
      patientId,
      firstName,
      lastName,
      procedureCodes,
      sdate,
      edate,
      speciality,
      approved,
      remaining,
      status,
    };
  }
  useEffect(() => {
    const newRows = PIAReportData?.content.map((data: any) => {
      return createForm(
        data.authorization,
        data.patientId,
        data.firstName,
        data.lastName,
        data.procedureCodes,
        data.sdate,
        data.edate,
        data.speciality,
        data.approved,
        data.remaining,
        data.status
      );
    });
    setData(newRows);
  }, []);
  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Patient Insurance Authorization
            </Typography>
          </Grid>
          <Grid item className={classes.filterTitle}>
            {!openFilter && (
              <Grid>
                <ButtonBase sx={FilterSearch} onClick={openFilterModal}>
                  Filters
                </ButtonBase>
              </Grid>
            )}
            <Grid>
              <ButtonBase
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleClick}
              >
                <FileDownloadOutlinedIcon className={classes.icon} />
                &nbsp;Export to File
              </ButtonBase>
              <Menu
                sx={{
                  position: "absolute",
                  right: "10px !important",
                  left: "0px",
                  maxWidth: "12% !important",
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  style: {
                    width: "70%",
                  },
                }}
              >
                <MenuItem
                  sx={{
                    color: "#1A1A1A99 !important",
                    fontSize: "14px !important",
                  }}
                >
                  CSV File
                </MenuItem>
                <MenuItem
                  sx={{
                    color: "#1A1A1A99 !important",
                    fontSize: "14px !important",
                  }}
                >
                  PDF File
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openFilter && (
        <Grid item xs={12} className={classes.filterContainer} mt={3}>
          <Grid container p={3}>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={2.4} className={classes.noPadding}>
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
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Authorization Number
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Authorization Number"
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
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Provider Name
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Provider Name"
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
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Office Name
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Office Name"
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
                <Grid item xs={2.4} className={classes.noPadding}>
                  <Typography variant="h5" className={classes.label}>
                    Status
                  </Typography>
                  <Select
                    sx={selectInputStyle}
                    value={status}
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
                    {statusList.map((data) => {
                      return (
                        <MenuItem
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
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
                    &#x200B;
                  </Typography>
                  <Grid container alignItems={"center"}>
                    <Checkbox
                      sx={{
                        padding: 0,
                        color: "#1A1A1A33",
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                    />
                    &nbsp;
                    <Typography variant="h5" sx={{ color: "#1A1A1ACC" }}>
                      Filter by appointment date
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={7.2}>
                  <Box>
                  <Grid container flexDirection={'column'} alignItems={"end"} >
                    <Typography variant="h5" className={classes.label}>
                      &#x200B;
                    </Typography>
                    <ButtonBase sx={FilterSearch} onClick={search}>
                      Search
                    </ButtonBase>
                  </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
       <Grid item xs={12} mt={3}>
        <ReportTable Columns={Columns} dataTable={data} />
      </Grid>
    </Grid>
  );
}
export default PIAReports

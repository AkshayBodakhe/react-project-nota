import React, { useEffect, useState } from "react";
import { EncounterReportData } from "../../../../../mock-data/reportsData";
import { ButtonBase, Grid, IconButton, InputBase, Menu, MenuItem, Paper, Select, Typography } from "@mui/material";
import { style } from "../style/report-style";
import { formButtonStyle, selectInputStyle } from "../../../../../styles/common";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FilterSearch } from "../../../../../styles/auth-form";
import SearchIcon from "@mui/icons-material/Search";
import ReportTable from "../report-table";


export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}

export const Columns: Column[] = [
  { id: "checkbox", label: "", minWidth: 50 },
  { id: "date", label: "Date Of Service", minWidth: 150 },
  { id: "visitType", label: "Visite Type", minWidth: 100 },
  { id: "patientId", label: "Patient ID", minWidth: 100 },
  { id: "firstName", label: "First Name", minWidth: 130 },
  { id: "lastName", label: "Last Name", minWidth: 130 },
  { id: "renderingProvider", label: "Rendering Provider", minWidth: 130 },
  { id: "signedProvider", label: "Signed Provider", minWidth: 80 },
  { id: "signedDate", label: "Signed Date", minWidth: 80 },
  { id: "status", label: "Encounter Status", minWidth: 100 },
];

const EncounterReport = () => {
  const classes = style();
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
  const [data, setData] = useState<Row[]>([]);

  const search = () => {
    setFilter(false);
  };

  const VisitType = ["All", "In-Person", "Video Call"];
  const [visitType, setVisitType] = useState("");

  const handleSelectOption = (e: string) => {
    setVisitType(e);
  };

  function createForm(
    patientId: string,
    firstName: string,
    lastName: string,
    date: string,
    visitType: string,
    renderingProvider: string,
    signedProvider: string,
    signedDate: string,
    status: string
  ): Row {
    return {
      patientId,
      firstName,
      lastName,
      date,
      visitType,
      renderingProvider,
      signedProvider,
      signedDate,
      status,
    };
  }
  useEffect(() => {
    const newRows = EncounterReportData?.content.map((data: any) => {
      return createForm(
        data.patientId,
        data.firstName,
        data.lastName,
        data.date,
        data.visitType,
        data.renderingProvider,
        data.signedProvider,
        data.signedDate,
        data.status
      );
    });
    setData(newRows);
  }, []);

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

  return (
    <Grid container className={classes.main} p={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.mainTitle}>
              Encounter Report
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
                    Allergy Name
                  </Typography>
                  <Paper component="form" className={classes.paperSearch}>
                    <InputBase
                      className={classes.inputBase}
                      placeholder="Allergy Name"
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
                    Visit Type
                  </Typography>
                  <Select
                   sx={selectInputStyle}
                    value={visitType}
                    name="severity"
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
                              Select Severity
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {VisitType.map((data) => {
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
                <Grid item xs={7.2}>
                  <Grid container alignItems={"center"} justifyContent={"end"}>
                    <Typography variant="h5" className={classes.label}>
                      &#x200B;
                    </Typography>
                    <ButtonBase sx={FilterSearch} onClick={search}>
                      Search
                    </ButtonBase>
                  </Grid>
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
};

export default EncounterReport;

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { formButtonStyle } from "../../../../styles/common";
import AddReferral from "./add-refarral";
import ReferralFilter from "./referral-filter";
import ReferralTable from "./referral-table";
import { style } from "./style/common-style";

function ReferralPage() {
  const [value, setValue] = React.useState("1");
  const [isFilterVisible, setFilterVisible] = useState(false);
  const showFilters = () => {
    setFilterVisible(!isFilterVisible);
  };
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [openAddReferral,setAddReferral] = useState(false);

  const openModel = () =>{
    setAddReferral(true);
  }

  const handleClose = () =>{
    setAddReferral(false);
  }
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
    <Grid sx={{background:"white"}} p={2}>
      <Grid className={classes.main}>
        <Grid xs={4}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#1B5984"
              }
            }}
          >
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
                color: "#1B5984 !important"
              }}
              value="1"
              label="Referral Out"
            />
            <Tab
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold !important",
                fontSize: "16px",
                color: "#1B5984 !important"
              }}
              value="2"
              label="Referral In"
            />
          </Tabs>
        </Grid>
        <Grid xs={8} className={classes.filterGrid}>
          <Grid xs={3}>
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
                        Select Contact Type
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
          <Grid xs={3}>
            <Paper className={classes.paperSearch}>
              <InputBase
                classes={{
                  root: classes.inputBase,
                }}
                placeholder="Search By Name,Type,Address"
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
          <Grid>
            <ButtonBase
              sx={{
                color: "#36588C",
                border: "1px solid #36588C",
                borderRadius: "4px",
                padding: "8px 10px",
              }}
              onClick={showFilters}
            >
              <Typography variant="h5">
                {isFilterVisible ? "Cancel" : "Filters"}
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid>
            <ButtonBase
              sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
              onClick={openModel}
            >
              <AddIcon />
              Add Referral {value == '1' ? 'Out' : 'In'}
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
      <Grid>{isFilterVisible && <ReferralFilter />}</Grid>

      <Grid>
        <ReferralTable />
      </Grid>
      {openAddReferral && (
          <AddReferral
            open={openAddReferral}
            onClose={handleClose}
            title={value == '1' ? "Add Referral Out" : "Add Referral In"}
          />
        )}
    </Grid>
  );
}

export default ReferralPage;

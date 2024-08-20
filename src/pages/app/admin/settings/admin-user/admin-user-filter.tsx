import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { filter, formButtonStyle } from "../../../../../styles/common";

export const style = makeStyles(() => ({
  filterContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A33",
    borderRadius: "10px",
    opacity: 1,
  },
}));

interface UseFilterProps {
    setClose?:any;
}

function UserFilter(props:UseFilterProps) {
  // const classes = style();
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
  const status = ["All", "Active", "Inactive"];
  const [filtervalues] = useState({
    patient: "",
    role: "",
    department: "",
    status: "",
  });

  const handleSelectOption = (_e: any) => {};

  const applyFilter = (()=>{
    props.setClose();
  });

  return (
    <Grid
      container
      sx={filter.filterContainer}
      mt={2}
      justifyContent={"space-between"}
      alignItems={'center'}
    >
      <Grid item xs={8} sx={{ display: "flex" }} columnGap={2}>
        <Grid item xs={3}>
          <Typography variant="h5" sx={filter.label}>
            Search By Name
          </Typography>
          <Paper component="form" sx={filter.paperSearch}>
            <InputBase
              sx={{ ...filter.inputBase, fontSize: "14px" }}
              placeholder="Search Patient"
            />
            <IconButton
              type="button"
              sx={filter.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5" sx={filter.label}>
            Search By Role
          </Typography>
          <Select
            sx={filter.selectInputStyle}
            value={filtervalues.role}
            name="role"
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
                      select
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {status.map((data) => {
              return (
                <MenuItem value={data} sx={filter.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5" sx={filter.label}>
            Search By Department
          </Typography>
          <Select
            sx={filter.selectInputStyle}
            value={filtervalues.role}
            name="department"
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
                      select
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {status.map((data) => {
              return (
                <MenuItem value={data} sx={filter.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5" sx={filter.label}>
            Search By Status
          </Typography>
          <Select
            sx={filter.selectInputStyle}
            value={filtervalues.status}
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
                      select
                    </Typography>
                  </span>
                );
              }
              return <Typography variant="h5">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {status.map((data) => {
              return (
                <MenuItem value={data} sx={filter.menuItemColorStyle}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={filter.label}>
          &#8203;
        </Typography>
        <Button sx={formButtonStyle.editProfileBtn} onClick={applyFilter}>
          <Typography
            variant="h5"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          >
            Apply Filters
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserFilter;

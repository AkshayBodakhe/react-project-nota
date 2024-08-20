import SearchIcon from "@mui/icons-material/Search";
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
import { useEffect, useState } from "react";
import { OpenTask } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { style } from "../../referral/style/common-style";
import { priority, statusType, taskTypes } from "../../../../../components/common/form-enum";

interface FilterProps {
  setFilterOptions: any;
}
function Filter(Props: FilterProps) {
  const { setFilterOptions } = Props;
  const classes = style();
  const [dueDate] = useState([
    "CURRENT",
    "LAST_7_DAY",
    "DUE_TOMORROW",
    "NEXT_7_DAYS",
    "NEXT_30_DAYS",
    "NEXT_60_DAYS",
    "NEXT_90_DAYS",
    "FUTURE",
    "ALL"
  ]);
  const [taskType, setTaskType] = useState<any>([]);
  const [statusList, setStatusList] = useState<any>([]);
  const [priorityList, setPriorityList] = useState<any>([]);
  const [filterOptions, setFilterOption] = useState({
    patientName: "",
    type: "",
    priority: "",
    dueDate: "",
    status: "",
  });

  // const handleSelectOption = (e: any) => {
  //   setTask(e.target.value);
  // };

  const searchData = () => {    
    setFilterOptions(filterOptions);
  };

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

  useEffect(() => {
    const task = Object.values(taskTypes) as string[];
    setTaskType(task);
    const status = Object.values(statusType) as string[];
    setStatusList(status);
    const priorityData =Object.values(priority) as string[] ;
    setPriorityList(priorityData);
  }, []);

  return (
    <div>
      <Grid item xs={12} p={2.5} className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Search By Patient
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Search Patient"
                name="patientName"
                onChange={(e: any) =>
                  setFilterOption((prevValues) => ({
                    ...prevValues,
                    patientName: e.target.value,
                  }))
                }
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
          {/* <Grid item xs={2.4}>
              <Typography variant="h5" className={classes.label}>
                Assigned To
              </Typography>
              <Paper component="form" className={classes.paperSearch}>
                <InputBase
                  className={classes.inputBase}
                  placeholder="Search Assign To"
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
                Created By
              </Typography>
              <Paper component="form" className={classes.paperSearch}>
                <InputBase
                  className={classes.inputBase}
                  placeholder="Search Assignee"
                />
                <IconButton
                  type="button"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid> */}
          {/* <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Task Type
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={filterOptions.type}
              name="type"
              onChange={(e: any) =>
                setFilterOption((prevValues) => ({
                  ...prevValues,
                  type: e.target.value,
                }))
              }
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
                        Select Type
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {taskType.map((data: any) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid> */}
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Status
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={filterOptions.status}
              name="status"
              onChange={(e: any) =>
                setFilterOption((prevValues) => ({
                  ...prevValues,
                  status: e.target.value,
                }))
              }
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
              {statusList.map((data: any) => {
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
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Due Date
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={filterOptions.dueDate}
              name="dueDate"
              onChange={(e: any) =>
                setFilterOption((prevValues) => ({
                  ...prevValues,
                  dueDate: e.target.value,
                }))
              }
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
                        Due Date
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {dueDate.map((data) => {
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
          <Grid item xs={2.4}>
            <Typography variant="h5" className={classes.label}>
              Priority
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={filterOptions.priority}
              name="priority"
              onChange={(e: any) =>
                setFilterOption((prevValues) => ({
                  ...prevValues,
                  priority: e.target.value,
                }))
              }
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
                        Select Priority
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {priorityList?.map((data: any) => {
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
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignContent: "end",
              flexDirection: "column",
            }}
          >
            <Grid container justifyContent={"end"}>
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
                onClick={searchData}
              >
                <Typography variant="h5">Search</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Filter;

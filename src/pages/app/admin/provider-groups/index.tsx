import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import {
  ButtonBase,
  Drawer,
  Grid,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import ProviderGroupTable from "../../../../components/core/layout/table/provider-group-table";
import { formButtonStyle } from "../../../../styles/common";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddEditProviderGroupData from "../../provider/settings/account-settings/provider-group/add-edit-provider-group";
import {
  useProviderGroupControllerServiceGetAllProviderGroups,
  useProviderGroupControllerServiceGetStates,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import CustomPagination from "../../../../components/common/pagination";
import { PaginationState } from "../../../../components/common/enums-and-interfaces/interfaces";

const { ADMIN } = adminConstants;

const commonPorviderGroupWidget = makeStyles(() => ({
  providerGroupHeaderLayout: {
    display: "flex",
    // padding: "35px 0 0 0",
    justifyContent: "space-between",
    gap: "5%",
    // marginBottom: "25px",
    margin: "25px 0",
    "@media (max-width: 820px)": {
      gap: "1rem",
      display: "block",
    },
    "@media (max-width: 768px)": {
      gap: "1rem",
      display: "block",
    },
  },
  providerGroupSearch: {
    display: "flex",
    alignItems: "center",
    gap: "27px",
    "@media (max-width: 820px)": {
      display: "block",
      width: "100%",
      gap: "1rem",
    },
    "@media (max-width: 768px)": {
      display: "block",
      gap: "1rem",
      width: "100%",
    },
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    paddingRight: "2px",
    opacity: 0.9,
  },
  AddressFormLongtInputField2: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "38px",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    alignItems: "center",
    "& input::placeholder": {
      alignItems: "center",
      fontSize: "12.5px",
    },
    "@media (max-width: 820px)": {
      width: "100%",
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  inputBoxText2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive2: {
    background: "#FFFFFF 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00418602 !important",
    border: "1px solid #36588C!important",
    borderRadius: "4px !important",
  },
}));

const sxs = {
  backgroundPage: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px 15px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 8px #00000029",
    borderRadius: "5px",
    opacity: 1,
  },
  providerStateFilter: {
    display: "flex",
    alignItems: "center",
    gap: "15px",

    justifyContent: "space-between",
    "@media (max-width: 820px)": {
      marginTop: "15px",
      display: "block",
    },
    "@media (max-width: 768px)": {
      marginTop: "15px",
      display: "block",
    },
  },
  providerGroupLabelStyles: {
    font: "Roboto medium",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  providerStatus: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    width: "12rem",
    background: "white",
    height: "38px",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    "@media (max-width: 768px)": {
      width: "100% !important",
    },
  },
  providerState: {
    background: "white",
    width: "14rem",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    "@media (max-width: 768px)": {
      width: "100% !important",
    },
  },
  selectStateStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "38px",
    maxWidth: "13.773rem",
    "@media (max-width: 820px)": {
      maxWidth: "100% !important",
    },
    "@media (max-width: 768px)": {
      maxWidth: "100% !important",
    },
  },
  searchIcon: {
    position: "relative",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBoxWidth: {
    width: "24rem",
    background: "white",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    "@media (max-width: 768px)": {
      width: "100% !important",
    },
  },
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

function AdminProviderGroupsPage() {
  const classes = commonPorviderGroupWidget();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<string>("");
  const [tableData, setTabledata] = useState<any>({});
  const selectRef = useRef(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    state: "",
    totalPages: 0,
    totalElements: 0,
  });
  const [statesPagination, setStatesPagination] = useState({
    page: 0,
    size: 10,
  });
  const [searchString, setSearchString] = useState("");
  const {
    data: states,
    isError: isStatesError,
    isLoading: isStatesLoading,
    refetch: refetchStates,
  } = useProviderGroupControllerServiceGetStates({
    page: statesPagination.page,
    size: statesPagination.size,
  });

  const { refetch, data, isLoading, isError } =
    useProviderGroupControllerServiceGetAllProviderGroups({
      page: pagination.page,
      size: pagination.size,
      searchString: pagination.searchString,
      state: pagination.state,
      sortBy: pagination.sortBy,
      sortDirection: pagination.sortDirection,
      ...(pagination.status !== undefined && { status: pagination.status }),
    });

  useEffect(() => {
    if (data?.data) {
      setTabledata(data.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [data?.data]);

  useEffect(() => {
    if (!isStatesLoading && isStatesError) refetchStates();
  }, [states?.data]);

  useEffect(() => {
    if (isError) refetch();
  }, [isLoading]);

  useEffect(() => {
    if (!searchString) refetch;
    const performSearch = setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        searchString,
      }));
      refetch();
    }, 3000);

    return () => {
      clearTimeout(performSearch);
    };
  }, [searchString]);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    refetch();
  };

  const handleFilter = (key: string, value: string) => {
    setPagination((prev) => ({
      ...prev,
      page: 0,
      // size: 10,
      [key]: value,
    }));
  };

  const handleStatus = (event: any) => {
    setPagination((prev) => ({
      ...prev,
      page: 0,
      // size: 10
    }));
    if (event !== "true" && event !== "false") {
      setPagination((prev) => {
        const { status, ...rest } = prev;
        return { ...rest };
      });
    } else {
      setPagination((prev) => ({
        ...prev,
        status: event === "true" ? true : false,
      }));
    }
  };

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom && !isLoading) {
      setStatesPagination((prev) => ({
        ...prev,
        size: statesPagination.size + 10,
      }));
    }
  }

  return (
    <React.Fragment>
      <Grid sx={sxs.backgroundPage}>
        <Grid className={classes.providerGroupHeaderLayout}>
          <Typography
            variant="h2"
            color={"#004186"}
            fontSize={"20px !important"}
          >
            Provider Groups
          </Typography>
          <Grid className={classes.providerGroupSearch}>
            <Grid sx={sxs.searchBoxWidth}>
              <InputBase
                fullWidth
                id="document-name-label"
                name="name"
                role="textbox"
                placeholder="Search by provider group name or contact or state"
                type="text"
                onChange={(e) => setSearchString(e.target.value)}
                classes={{
                  root: classes.AddressFormLongtInputField2,
                  input: classes.inputBoxText2,
                  focused: classes.inputBoxActive2,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon sx={sxs.searchIcon} />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid sx={sxs.providerStateFilter}>
              <Typography
                variant="h4"
                component="h3"
                sx={sxs.providerGroupLabelStyles}
              >
                Status
              </Typography>
              <Grid>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  sx={sxs.providerStatus}
                  renderValue={(selected: any) => {
                    return selected === undefined || selected === "all"
                      ? "All"
                      : selected === "true"
                      ? "Active"
                      : "Inactive";
                  }}
                  value={pagination.status}
                  onChange={(e) => {
                    handleStatus(e.target.value);
                  }}
                  size="small"
                  MenuProps={MenuProps}
                >
                  <MenuItem
                    disabled={pagination.status === undefined}
                    value={`${"all"}`}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    disabled={pagination.status === true}
                    value={`${true}`}
                  >
                    Active
                  </MenuItem>
                  <MenuItem
                    disabled={pagination.status === false}
                    value={`${false}`}
                  >
                    Inactive
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>

            {/* <Grid sx={sxs.providerStateFilter}>
              <Typography
                variant="h4"
                component="h3"
                sx={sxs.providerGroupLabelStyles}
              >
                State
              </Typography>
              <Grid sx={sxs.providerState}>
                <Select
                  displayEmpty
                  ref={selectRef}
                  onScrollCapture={handleMenuScroll}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span>All</span>;
                    } else {
                      return selected;
                    }
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  fullWidth
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    handleFilter("state", e.target.value);
                  }}
                  sx={sxs.selectStateStyle}
                >
                  <MenuItem disabled={!pagination.state} key={"all"} value={""}>
                    All
                  </MenuItem>
                  {states &&
                    states?.data?.content?.length !== 0 &&
                    states?.data?.content.map((state: any) => {
                      return (
                        <MenuItem
                          disabled={pagination.state === state.name}
                          key={state}
                          value={state.name}
                        >
                          {state.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
            </Grid> */}
            <ButtonBase
              sx={{
                ...formButtonStyle.saveButtonStyle,
                width: "auto !important",
                padding: "0px 10px",
              }}
              onClick={handleClickOpen()}
            >
              <span className={classes.addButtonTypo}>
                <AddIcon />
              </span>
              <Typography variant="h5">{"Add Provider Group"}</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
        <ProviderGroupTable
          pagination={pagination}
          data={tableData}
          setPagination={setPagination}
          refetchData={refetch}
          isLoading={isLoading}
        />
      </Grid>
      <CustomPagination pagination={pagination} setPagination={setPagination} />
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <AddEditProviderGroupData
          onCloseDrawer={handleClose}
          title={"Add Provider Group"}
          source={"Add"}
        />
      </Drawer>
    </React.Fragment>
  );
}

export default AppLayout(AdminProviderGroupsPage, { source: ADMIN });

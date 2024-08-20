// import React from "react";
// import ProviderGroupInfo from "../provider-groups/provider-group-info";
import ProviderGroupLocationTable from "../../../../../../components/core/layout/table/provider-group-location-table";
import LocationModal from "../../../../../../components/common/modal/location-modal";
import {
  Box,
  ButtonBase,
  Drawer,
  Grid,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
// import LocationDrawer from "../../../../../../components/common/modal/location-drawer";
import SearchIcon from "@mui/icons-material/Search";
import { adminConstants } from "../../../../../../constants/admin";
import { makeStyles } from "@mui/styles";
import { formButtonStyle } from "../../../../../../styles/common";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import providerGroupService from "../../../../../../service/provider-group--service";
import { Enums } from "../../common-files/enums";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProviderGroupUuidContext } from "../provider-groups/provider-groups-admin";
import { checkActiveProviderGroup } from "../../../../../../components/common/helper";
// import { PaginationState } from "../../../../../../components/core/layout/table/provider-group-table";

const { SEARCH_HERE } = adminConstants;

const commonPorviderGroupWidget = makeStyles(() => ({
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
const profileTab = {
  heading: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "end",
    gap: "5%",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  table: {
    marginTop: "20px",
  },

  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    width: 300,
    height: 38,
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },

  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
  },
  iconButton: {
    padding: "10px",
  },
};

interface LocationProps {
  searchInput?: any;
}

function ProviderGroupLocations(props: LocationProps) {
  const classes = commonPorviderGroupWidget();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const context = useOutletContext() as any[];
  const providerContextData = context && context[1];
  const isActiveProvider = checkActiveProviderGroup(providerContextData);

  let { id } = useParams();

  if (!id) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    id = providerInfo?.providerGroup || "";
  }

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    totalPage: 0,
    totalElements: 0,
  });

  useEffect(() => {
    if (props.searchInput) setShow(true);
  }, [props.searchInput]);

  useEffect(() => {
    if (pagination.searchString) {
      const performSearch = setTimeout(() => {
        getAllLocations();
      }, 1000);

      return () => {
        clearTimeout(performSearch);
      };
    } else {
      getAllLocations();
    }
  }, [pagination.searchString, pagination.page, pagination.size]);

  const handleClose = () => {
    setOpen(false);
    getAllLocations();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getAllLocations = () => {
    setIsLoading(true);
    try {
      providerGroupService
        .getAllLocations(
          providerGroupSchema,
          pagination.page,
          pagination.size,
          pagination.sortBy,
          pagination.sortDirection,
          pagination.searchString,
          id as string
        )
        .then((data: any) => {
          if (data?.data?.data) {
            setLocationData(data.data.data.content);
            setPagination((prev) => ({
              ...prev,
              totalElements: data.data.data?.totalElements || 0,
              totalPage: data.data.data?.totalPages || 0,
            }));
            setIsLoading(false);
          }
        });
    } catch (_error) {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {!show && (
        <Box sx={profileTab.heading}>
          <Paper className={classes.searchBoxWidth}>
            <InputBase
              fullWidth
              classes={{
                root: classes.AddressFormLongtInputField2,
                input: classes.inputBoxText2,
                focused: classes.inputBoxActive2,
              }}
              placeholder={SEARCH_HERE}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  searchString: e.target.value,
                }))
              }
            />
          </Paper>
          <ButtonBase
            sx={{
              ...formButtonStyle.saveButtonStyle,
              width: "auto !important",
              padding: "0px 10px",
              opacity: isActiveProvider ? "0.5" : 1,
            }}
            onClick={handleClickOpen}
            disabled={isActiveProvider}
          >
            <span>
              <AddIcon />
            </span>
            <Typography variant="h5">{"Add Location"}</Typography>
          </ButtonBase>
        </Box>
      )}
      <Box sx={profileTab.table}>
        <ProviderGroupLocationTable
          locationList={locationData}
          pagination={pagination}
          setPagination={setPagination}
          refetchData={getAllLocations}
          isLoading={isLoading}
        />
      </Box>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <LocationModal
            onCloseDrawer={handleClose}
            dialogTitle={"Add Location"}
            buttonTitle={"Save"}
            providerGroupUuid={id as string}
            providerContextData={providerContextData}
          />
        </Grid>
      </Drawer>
    </div>
  );
}

export default ProviderGroupLocations;

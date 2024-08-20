// import React from "react";
// import ProviderGroupInfo from "../provider-groups/provider-group-info";
// import ProviderGroupLocationTable from "../../../../../../components/core/layout/table/provider-group-location-table";
import { adminConstants } from "../../../../../../constants/admin";
import ProviderGroupPatients from "./provider-group-patients";
import { Box, InputAdornment, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import providerGroupService from "../../../../../../service/provider-group--service";
import { Enums } from "../../common-files/enums";
import { PaginationState } from "../../../../../../components/common/enums-and-interfaces/interfaces";

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

const patientsTab = {
  heading: {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  table: {
    marginTop: "20px",
    // maxHeight: '42vh',
    // overflow: 'scroll'
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

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  sortBy: string;
  sortDirection: string;
  searchString: string;
}

export enum Patients {
  LOCATION_PATIENTS = "Location Patient",
  ALL_PATIENTS = "All Patients",
}

type PATIENTS = {
  type: Patients;
  locationUuid?: string;
};

function ProviderGroupPatientPage(props: PATIENTS) {
  const classes = commonPorviderGroupWidget();
  const [patientsList, setPatientList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    status: true,
    state: "",
  });
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  useEffect(() => {
    if (pagination.searchString) {
      const timeOut = setTimeout(() => {
        getAllPatients();
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      getAllPatients();
    }
  }, [pagination.searchString, pagination.page, pagination.size]);

  const getAllPatients = () => {
    setIsLoading(true);
    if (props.locationUuid) {
      providerGroupService
        .getLocationPatients(providerGroupSchema, props.locationUuid)
        .then((patients) => {
          if (patients?.data?.data && patients.data?.data?.content) {
            setPatientList(patients.data.data.content);
            setPagination((prev: any) => ({ ...prev, ...patients.data?.data }));
            setIsLoading(false);
          }
        });
    } else {
      try {
        providerGroupService
          .getAllPatients(
            providerGroupSchema,
            pagination.page,
            pagination.size,
            pagination.sortBy,
            pagination.sortDirection,
            pagination.searchString
          )
          .then((patients: any) => {
            if (patients?.data?.data && patients.data?.data?.content) {
              setPatientList(patients.data.data.content);
              setPagination((prev: any) => ({
                ...prev,
                ...patients.data?.data,
              }));
              setIsLoading(false);
            }
          });
      } catch (_error) {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = (searchResult: string) => {
    setPagination((prev: any) => ({
      ...prev,
      searchString: searchResult,
    }));
  };

  return (
    <div>
      {/* <ProviderGroupInfo /> */}

      {props.type === Patients.ALL_PATIENTS ? (
        <Box sx={patientsTab.heading}>
          <Paper component="form" className={classes.searchBoxWidth}>
            <InputBase
              fullWidth
              classes={{
                root: classes.AddressFormLongtInputField2,
                input: classes.inputBoxText2,
                focused: classes.inputBoxActive2,
              }}
              placeholder={SEARCH_HERE}
              onChange={(e) => handleSearch(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Paper>
        </Box>
      ) : null}
      <Box sx={patientsTab.table}>
        <ProviderGroupPatients
          patientsList={patientsList}
          isLoading={isLoading}
          pagination={[pagination, setPagination]}
        />
      </Box>
    </div>
  );
}

export default ProviderGroupPatientPage;

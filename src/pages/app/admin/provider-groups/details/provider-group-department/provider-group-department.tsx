// import React from "react";
// import ProviderGroupInfo from "../provider-groups/provider-group-info";
// import ProviderGroupLocationTable from "../../../../../../components/core/layout/table/provider-group-location-table";
import DepartmentModal from "../../../../../../components/common/modal/department-modal";
import {
  Autocomplete,
  Box,
  ButtonBase,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import ProviderGroupDepartmentTable from "../../../../../../components/core/layout/table/provider-group-department-table";
import SearchIcon from "@mui/icons-material/Search";
import { adminConstants } from "../../../../../../constants/admin";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { formButtonStyle } from "../../../../../../styles/common";
import providerGroupService from "../../../../../../service/provider-group--service";
import { Enums } from "../../common-files/enums";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import { PaginationState } from "../../../../../../components/common/enums-and-interfaces/interfaces";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkActiveProviderGroup } from "../../../../../../components/common/helper";
import {
  useDepartmentControllerServiceGetAllSearchDepartments,
  useDepartmentControllerServiceGetLocationDepartment,
  useDepartmentControllerServiceSearchLocationDepartment,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
// import { setAlert } from "../../../../../../redux/actions/snackbar/alert.action";

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
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
}));
const departmentTab = {
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

    // "@media (min-height: 200px)": {
    //   gap: "20px",
    // },

    // minHeight: '200px',
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
  sortBy?: string;
  sortDirection?: string;
  searchString?: string;
  status?: boolean;
  totalPages: number;
  totalElements: number;
}

export enum Departments {
  LOCATION_DEPARTMENT = "Location Departments",
  ALL_DEPARTMENT = "All Departments",
}

type DEPARTMENT = {
  type: Departments;
  locationId?: string;
  isgetDepartment?: boolean;
  searchInput?: any;
};

function ProviderGroupDepartment(props: DEPARTMENT) {
  const classes = commonPorviderGroupWidget();
  const [departmentTable, setDepartmentTable] = useState<any[]>();
  const [departmentList, setDepartmentList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const [departmentName, setDepartmentName] = useState("");
  const [allDepartment, setAllDepartment] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const disptach = useDispatch();
  const { id } = useParams();
  let providerGroupUuid = id as string;

  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }
  const context = useOutletContext() as any[];

  const providerContextData = context && context[1];
  const isActiveProvider = checkActiveProviderGroup(providerContextData);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    status: true,
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => {
    if (props.isgetDepartment) {
      getAllDepartments();
      refetchGetDep();
    }
  }, [props.isgetDepartment]);

  useEffect(() => {
    if (props.searchInput) setShow(true);
  }, [props.searchInput]);

  useEffect(() => {
    if (pagination.searchString) {
      const timeOut = setTimeout(() => {
        getAllDepartments();
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      // getAllDepartments();
    }
  }, [props.type, pagination.searchString, pagination.page, pagination.size]);

  useEffect(() => {
    if (props.locationId && departmentName) {
      const timeOut = setTimeout(() => {
        seacrhDepartment(departmentName);
      }, 500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [departmentName]);

  const seacrhDepartment = (name: string) => {
    try {
      providerGroupService
        .locationSearchAPI(
          providerGroupSchema,
          props.locationId || "-",
          name,
          pagination.page,
          pagination.size
        )
        .then((res) => {
          if (res?.data && res.data?.data) {
            setSearchResult(res.data.data?.content);
          }
        });
    } catch (error) {}
  };

  const defaultProps = {
    options: searchResult,
    getOptionLabel: (option: any) => option.name,
  };

  // const { mutateAsync } = useDepartmentControllerServiceAddLocationDepartment();

  const getAllDepartments = () => {
    setIsLoading(true);
    if (props.type === Departments.ALL_DEPARTMENT) {
      try {
        providerGroupService
          .getAllDepartments(
            providerGroupSchema,
            pagination.page,
            pagination.size,
            providerGroupUuid as string,
            pagination.sortBy,
            pagination.sortDirection,
            pagination.searchString
          )
          .then((res: any) => {
            if (res?.status >= 200 && res.status <= 299) {
              setDepartmentList(res?.data?.data?.content || []);
            } else {
              disptach(
                alertAction.setAlert({
                  open: true,
                  message: res?.data?.message,
                  severity: "error",
                })
              );
            }
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      try {
        providerGroupService
          .getAllLocationDepartments(
            providerGroupSchema,
            props.locationId || "",
            pagination.page,
            pagination.size
          )
          .then((res: any) => {
            setDepartmentList(res?.data?.data?.content || []);
            setPagination((prev) => ({ ...prev, ...res?.data?.data }));
            setIsLoading(false);
            callSearchDepartment();
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const {
    data: departmentPayload,
    refetch: refetchGetDep,
    isLoading: isLoaderDep,
  } = useDepartmentControllerServiceGetAllSearchDepartments({
    providerGroupUuid: userDetails?.data?.providerGroup
      ? userDetails?.data?.providerGroup
      : providerContextData?.uuid,
    page: pagination.page,
    size: pagination.size,
    sortBy: pagination.sortBy,
    sortDirection: pagination.sortDirection,
  });

  useEffect(() => {
    setDepartmentTable(departmentPayload && departmentPayload?.data?.content);
    setPagination((prev) => ({
      ...prev,
      totalElements: departmentPayload?.data?.totalElements || 0,
      totalPage: departmentPayload?.data?.totalPages || 0,
    }));
  }, [departmentPayload]);

  useEffect(() => {
    allDepForDropDown();
  }, []);

  const { data: searchAllDepartment, refetch: callSearchDepartment } =
    useDepartmentControllerServiceSearchLocationDepartment({
      locationId: props.locationId || "",
      departmentName: pagination.searchString,
      page: 0,
      size: 10,
    });

  useEffect(() => {
    setAllDepartment(searchAllDepartment?.data?.content);
  }, [searchAllDepartment, pagination.searchString]);

  const allDepForDropDown = () => {
    try {
      providerGroupService
        .getAllDepartments(
          providerGroupSchema,
          pagination.page,
          pagination.size,
          providerGroupUuid as string,
          pagination.sortBy,
          pagination.sortDirection,
          pagination.searchString,
          props.locationId
        )
        .then((res: any) => {
          if (res?.status >= 200 && res?.status <= 299) {
            setAllDepartment((res?.data && res?.data?.data?.content) || []);
            setPagination((prev) => ({
              ...prev,
              totalElements: res?.data?.data?.totalElements || 0,
              totalPage: res?.data?.data?.totalPages || 0,
            }));
          } else {
            // disptach(
            //   alertAction.setAlert({
            //     open: true,
            //     message: res?.data?.message,
            //     severity: "error",
            //   })
            // );
          }
        });
    } catch (error) {}
  };

  const handleAddDepartment = () => {
    try {
      if (value.uuid && props.locationId) {
        providerGroupService
          .assignLocationDepartment(
            providerGroupSchema,
            props.locationId,
            value.uuid
          )
          .then(() => {
            setValue(null);
            setSearchResult([]);
            getAllDepartments();
          });
        // mutateAsync({ departmentId: value.uuid, locationId: props.locationId }).then((res: any) => {
        //
        // });
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {props.type === Departments.ALL_DEPARTMENT && !show && (
        <>
          <Box sx={departmentTab.heading}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "35%",
              }}
            >
              <Paper component="form" className={classes.searchBoxWidth}>
                <InputBase
                  fullWidth
                  classes={{
                    root: classes.AddressFormLongtInputField2,
                    input: classes.inputBoxText2,
                    focused: classes.inputBoxActive2,
                  }}
                  placeholder={SEARCH_HERE}
                  onChange={(e: any) =>
                    setPagination((prev) => ({
                      ...prev,
                      searchString: e.target.value,
                    }))
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </Paper>
              <ButtonBase disabled={isActiveProvider}>
                <ButtonBase
                  sx={{
                    ...formButtonStyle.saveButtonStyle,
                    width: "auto !important",
                    padding: "0px 10px",
                    opacity: isActiveProvider ? 0.5 : 1,
                  }}
                  onClick={() => setOpen(true)}
                >
                  <span className={classes.addButtonTypo}>
                    <AddIcon />
                  </span>
                  Add Department
                </ButtonBase>
              </ButtonBase>
            </Box>
          </Box>
        </>
      )}
      {props.type === Departments.LOCATION_DEPARTMENT && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              sx={{
                width: "25rem",
                marginRight: "20px",
                boxShadow: "0px 0px 8px #00000029",
              }}
            >
              <Autocomplete
                {...defaultProps}
                id="controlled-demo"
                options={
                  allDepartment?.filter((item: any) => item?.active) || []
                }
                value={value}
                sx={{
                  "& .MuiInput-root .MuiInput-input": {
                    padding: "4px 4px 4px 14px !important",
                  },
                  height: "30px",
                  // "& .css-19ssnuc-MuiInputBase-root-MuiInput-root:before ": {
                  //   borderBottom: 'none !important'
                  // },
                  // boxShadow: '0px 0px 8px #00000029'
                }}
                onChange={(_event: any, newValue: any) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Here"
                    onChange={(e) => setDepartmentName(e.target.value)}
                    variant="standard"
                  />
                )}
              />
            </Paper>
            <ButtonBase
              onClick={handleAddDepartment}
              disabled={!value?.uuid}
              sx={{
                ...formButtonStyle.saveButtonStyle,
                width: "7rem",
                background: !value?.uuid ? "#1A1A1A66" : "#1B5984",
              }}
            >
              {/* <span className={classes.addButtonTypo}>
              <AddIcon />
            </span> */}
              Add
            </ButtonBase>
          </Box>
        </>
      )}
      <DepartmentModal
        open={[open, setOpen]}
        onClose={refetchGetDep}
        providerGroupUuid={providerGroupUuid}
      />

      <Box sx={departmentTab.table}>
        <ProviderGroupDepartmentTable
          departmentList={departmentTable || []}
          refetch={refetchGetDep}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoaderDep}
        />
      </Box>
    </React.Fragment>
  );
}

export default ProviderGroupDepartment;

import {
  Autocomplete,
  Box,
  ButtonBase,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import ProviderGroupDepartmentTable from "../../../../../../components/core/layout/table/provider-group-department-table";
import { useEffect, useState } from "react";
import providerGroupService from "../../../../../../service/provider-group--service";
import { PaginationState } from "../../../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { Enums } from "../../common-files/enums";
import { formButtonStyle } from "../../../../../../styles/common";
interface locationDepartmentProps {
  locationId: string;
}

const ProviderGroupLocationDepartment = (props: locationDepartmentProps) => {
  const { locationId } = props;
  const [departmentList, setDepartmentList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [allDepartment, setAllDepartment] = useState<any>();
  const [value, setValue] = useState<any>(null);
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
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
  const disptach = useDispatch();

  useEffect(() => {
    getAllDepartments();
  }, []);

  const getAllDepartments = () => {
    setIsLoading(true);
    try {
      providerGroupService
        .getAllDepartments(
          "",
          pagination.page,
          pagination.size,
          "",
          pagination.sortBy,
          pagination.sortDirection,
          pagination.searchString,
          locationId
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
          allDepForDropDown();
        });
    } catch (error) {
      setIsLoading(false);
      allDepForDropDown();
    }
  };

  useEffect(() => {
    allDepForDropDown();
  }, []);

  const allDepForDropDown = () => {
    try {
      providerGroupService
        .searchDepartmentByName(locationId, departmentName)
        .then((res: any) => {
          if (res?.status >= 200 && res?.status <= 299) {
            setAllDepartment((res?.data && res?.data?.data?.content) || []);
            setPagination((prev) => ({
              ...prev,
              totalElements: res?.data?.data?.totalElements || 0,
              totalPage: res?.data?.data?.totalPages || 0,
            }));
          } else {
            disptach(
              alertAction.setAlert({
                open: true,
                message: res?.data?.message,
                severity: "error",
              })
            );
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (locationId && departmentName) {
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
          locationId || "-",
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

  const handleAddDepartment = () => {
    try {
      if (value.uuid && locationId) {
        providerGroupService
          .assignLocationDepartment(providerGroupSchema, locationId, value.uuid)
          .then(() => {
            setValue(null);
            setSearchResult([]);
            getAllDepartments();
          });
      }
    } catch (error) {}
  };

  return (
    <>
      <Grid my={2}>
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
              options={allDepartment?.filter((item: any) => item?.active) || []}
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
      </Grid>

      <Box>
        <ProviderGroupDepartmentTable
          departmentList={departmentList || []}
          refetch={getAllDepartments}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
};

export default ProviderGroupLocationDepartment;

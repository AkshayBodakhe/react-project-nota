import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useMigrationControllerServiceGetViewProviderRecords } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import MasterTable from "../master-table";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";

export const style = makeStyles(() => ({
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
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
}));

const columns = [
  { id: "uuid", label: "ID", minWidth: 80 },
  { id: "provideType", label: "Provider Type", minWidth: 150 },
  { id: "providerName", label: "Provider Name", minWidth: 150 },
  { id: "npiNumber", label: "NPI Number", minWidth: 150 },
  { id: "emailId", label: "Email ID", minWidth: 150 },
  { id: "providerGroupName", label: "Provider Group Name", minWidth: 150 },
];

interface ProviderInterface {
  paginationData?: any;
  setPaginationData?: any;
  providerGroupUuid?: string;
}
export default function ProviderDataTab(props: ProviderInterface) {
  const { paginationData, setPaginationData, providerGroupUuid } = props;
  const classes = style();
  const [providerData, setProviderData] = useState<any[]>([]);
  const [searchString, setSearchString] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: searchString,
    sortBy: "",
    sortDirection: "",
    status: true,
    totalElements: 0,
    totalPages: 0,
  });

  const { data, isLoading, isError, refetch } =
    useMigrationControllerServiceGetViewProviderRecords({
      page: pagination.page,
      size: pagination.size,
      searchString: searchString,
      providerGroupUuid: providerGroupUuid,
    });

  useEffect(() => {
    if (paginationData) setPagination(paginationData);
  }, [paginationData]);

  useEffect(() => {
    if (isError && !isLoading) refetch();
    if (data?.data && data?.data?.content) {
      setProviderData(data?.data.content);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
      setPaginationData((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [data?.data]);

  const searchInputString = (event: any) => {
    setSearchString(event.target.value);
  };

  return (
    <React.Fragment key={"ProviderDataTab"}>
      <Grid item xs={4} mt={2}>
        <Paper component="form" className={classes.paperSearch}>
          <InputBase
            style={{ fontSize: "14px" }}
            className={classes.inputBase}
            placeholder="Search here"
            onChange={searchInputString}
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
      {/* <ProviderDataTable
        columns={columns}
        rows={providerData}
        isLoading={isLoading}
      /> */}
      <MasterTable
        columns={columns}
        rows={providerData}
        page={pagination.page}
        rowsPerPage={pagination.size}
        isLoading={isLoading}
      />
    </React.Fragment>
  );
}

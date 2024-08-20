import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MasterTable from "../master-table";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useMedicalCodeControllerServiceGetAllMedicalCodes } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { BillingCodes } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
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

export const columns = [
  { id: "code", label: "HCPCS Code", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 450 },
  { id: "status", label: "Status", minWidth: 20 },
];

interface DrugCatalogProps {
  getHCPCSData?: any;
  paginationData: PaginationState;
  setPaginationData: any;
  providerGroupUuid: String;
}

export default function HCPCSCodeTab(props: DrugCatalogProps) {
  const { getHCPCSData, paginationData, setPaginationData, providerGroupUuid } =
    props;
  const classes = style();
  const [page, setPage] = useState(0);
  const [tableRowPerPage, setTableRowPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [hcpcsCodes, setHcpcsCodes] = useState<any>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "",
    sortDirection: "",
    status: true,
    totalElements: 0,
    totalPages: 0,
  });

  const { data, refetch, isLoading, isError } =
    useMedicalCodeControllerServiceGetAllMedicalCodes({
      codeType: BillingCodes.type.HCPCS,
      page: pagination.page,
      size: pagination.size,
      sortBy: "",
      sortDirection: "",
      providerGroupUuid: (providerGroupUuid as string) || "",
      searchString: searchString,
    });

  useEffect(() => {
    if (getHCPCSData) {
      refetch();
    }
  }, [getHCPCSData]);

  useEffect(() => {
    if (paginationData) setPagination(paginationData);
  }, [paginationData]);

  useEffect(() => {
    if (isError && !isLoading) refetch();
    if (data?.data && data.data?.content) {
      const newRows = data?.data?.content.map((loincRowData: any) => ({
        code: loincRowData.code,
        description: loincRowData.description,
        status: loincRowData.active,
        uuid: loincRowData.uuid,
      }));
      setHcpcsCodes(newRows);
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

  return (
    <React.Fragment key={"HCPCSCodeTab"}>
      <Grid item xs={4} mt={2}>
        <Paper component="form" className={classes.paperSearch}>
          <InputBase
            style={{ fontSize: "14px" }}
            className={classes.inputBase}
            placeholder="Search here"
            onChange={(e) => setSearchString(e.target.value)}
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
      <MasterTable
        columns={columns}
        rows={hcpcsCodes}
        page={page}
        rowsPerPage={tableRowPerPage}
        setPage={setPage}
        setRowsPerPage={setTableRowPerPage}
        isLoading={isLoading}
        getUpdatedList={() => refetch()}
      />
    </React.Fragment>
  );
}

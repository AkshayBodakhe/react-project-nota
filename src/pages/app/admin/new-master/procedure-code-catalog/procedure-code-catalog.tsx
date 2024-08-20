import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import MasterTable from "../master-table";
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
  { id: "code", label: "CPT Code", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 450 },
  { id: "status", label: "Status", minWidth: 20 },
];

interface DrugCatalogProps {
  isDataAdded: any;
  paginationData: PaginationState;
  setPaginationData: any;
  providerGroupUuid?: string;
}

function ProcedureCodeMaster(props: DrugCatalogProps) {
  const { isDataAdded, paginationData, setPaginationData, providerGroupUuid } =
    props;
  const classes = style();
  const [page, setPage] = useState(0);
  const [tableRowPerPage, setTableRowPerPage] = useState(10);
  const [cptCode, setCPTCode] = useState<any>([]);
  const [searchString, setSearchString] = useState("");

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

  const { data, refetch, isLoading } =
    useMedicalCodeControllerServiceGetAllMedicalCodes({
      codeType: BillingCodes.type.CPT,
      page: pagination.page,
      size: pagination.size,
      sortBy: "",
      sortDirection: "",
      searchString: searchString,
      providerGroupUuid: providerGroupUuid || "",
    });

  const searchInputString = (event: any) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (paginationData) setPagination(paginationData);
  }, [paginationData]);

  useEffect(() => {
    if (data?.data && data.data?.content) {
      const newRows = data?.data?.content.map((CPTRowData: any) => ({
        code: CPTRowData.code,
        description: CPTRowData.description,
        status: CPTRowData.active,
        uuid: CPTRowData.uuid,
      }));
      setCPTCode(newRows);
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

  useEffect(() => {
    if (isDataAdded) {
      refetch();
    }
  }, [isDataAdded]);

  return (
    <div>
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
      <MasterTable
        columns={columns}
        rows={cptCode}
        page={page}
        rowsPerPage={tableRowPerPage}
        setPage={setPage}
        setRowsPerPage={setTableRowPerPage}
        isLoading={isLoading}
        getUpdatedList={refetch}
      />
    </div>
  );
}

export default ProcedureCodeMaster;

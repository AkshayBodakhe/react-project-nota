import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useMigrationControllerServiceGetDataImportRecords } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import MasterTable from "../master-table";
import moment from "moment";
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
  { id: "created", label: "Import Initiated", minWidth: 80 },
  { id: "entity", label: "Entity", minWidth: 150 },
  { id: "fileName", label: "File Name", minWidth: 150 },
  { id: "userName", label: "Users", minWidth: 150 },
  { id: "totalRecords", label: "Total Records", minWidth: 150 },
  { id: "providerGroupName", label: "Provider Group", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 150 },
];

type Props = {
  isDataAdded: any;
  paginationData: PaginationState;
  setPaginationData: any;
  isDataImportProcessing?: boolean;
  importingData?: any;
  isRefetch?: boolean;
  setRefetech?: any;
  providerGroupUuid?: string;
};

function DataImportMaster(props: Props) {
  const {
    paginationData,
    setPaginationData,
    isDataImportProcessing,
    importingData,
    isRefetch,
    setRefetech,
    providerGroupUuid,
  } = props;
  const classes = style();
  const [apiData, setApiData] = useState<any[]>([]);
  const [searchRecord, setSearchRecord] = useState("");
  const encodedData = sessionStorage.getItem("loginUser");
  const providerData = encodedData ? JSON.parse(encodedData) : null;
  // const [tableRowPerPage, setTableRowPerPage] = useState(10);

  const {
    data: dataEntityList,
    isLoading,
    refetch,
  } = useMigrationControllerServiceGetDataImportRecords({
    page: paginationData.page,
    size: paginationData.size,
    sortBy: "created",
    sortDirection: "desc",
    searchString: paginationData.searchString,
    providerGroupUuid: providerGroupUuid,
  });

  useEffect(() => {
    refetch();
    setRefetech();
  }, [isRefetch]);

  useEffect(() => {
    if (isDataImportProcessing && importingData) {
      const obj: any = {
        batchId: importingData.batchId,
        created: moment().format("DD-MM-YYYY, hh:mm A"),
        entity: importingData.category,
        fileName: importingData.title,
        userName: `${providerData?.firstName || ""} ${
          providerData?.lastName || ""
        }`,
        totalRecords: importingData.totalRecords,
        failRecords: importingData.failRecords,
        passRecords: importingData.passRecords,
        fileUrl: importingData.fileUrl,
        providerGroupName: importingData.providerGroupName,
        status: "Processing",
      };

      // setApiData([obj, ...apiData]);
    } else {
      // setApiData((prev) => prev.slice(1));
    }
  }, [isDataImportProcessing, importingData]);

  useEffect(() => {
    if (dataEntityList?.data?.content) {
      let apiData: any[] = dataEntityList.data.content;
      const newRows = apiData.map((dataImportData: any) => ({
        batchId: dataImportData.batchId,
        created: moment(dataImportData.created).format("DD-MM-YYYY, hh:mm A"),
        entity: dataImportData.entity,
        fileName: dataImportData.fileName,
        userName: dataImportData.userName,
        totalRecords: dataImportData.totalRecords,
        failRecords: dataImportData.failRecords,
        passRecords: dataImportData.passRecords,
        fileUrl: dataImportData.fileUrl,
        providerGroupName: dataImportData.providerGroupName,
        status: dataImportData.status,
      }));
      setApiData(newRows);
      setPaginationData((prev: any) => ({
        ...prev,
        totalPages: dataEntityList?.data?.totalPages,
        totalElements: dataEntityList.data?.totalElements,
      }));
    }
  }, [dataEntityList?.data]);

  useEffect(() => {
    if (searchRecord !== undefined && searchRecord !== null) {
      const timeOut = setTimeout(() => {
        setPaginationData((prev: any) => ({
          ...prev,
          searchString: searchRecord,
        }));
      }, 500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [searchRecord]);

  return (
    <div>
      <Grid item xs={4} mt={2}>
        <Paper component="form" className={classes.paperSearch}>
          <InputBase
            style={{ fontSize: "14px" }}
            className={classes.inputBase}
            placeholder="Search here"
            onChange={(e) => setSearchRecord(e.target.value)}
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
        rows={apiData}
        showTextStatus={true}
        getUpdatedList={refetch}
        page={paginationData.page}
        // rowsPerPage={tableRowPerPage}
        setPage={setPaginationData}
        // setRowsPerPage={setTableRowPerPage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default DataImportMaster;

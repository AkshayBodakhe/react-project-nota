import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MasterTable from "../master-table";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDrugCatalogControllerServiceGetAllDrugs } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
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
  { id: "id", label: "No", minWidth: 50 },
  { id: "speciality", label: "Speciality", minWidth: 150 },
  { id: "type", label: "Type", minWidth: 130 },
  { id: "medicine", label: "Medicine", minWidth: 130 },
  { id: "dose", label: "Dose", minWidth: 130 },
  { id: "whenField", label: "When", minWidth: 130 },
  { id: "whereField", label: "Where", minWidth: 130 },
  { id: "frequency", label: "Frequency", minWidth: 130 },
  { id: "duration", label: "Duration", minWidth: 130 },
  { id: "description", label: "Notes/Instructions", minWidth: 130 },
  { id: "status", label: "Status" },
  { id: "edit", label: "Action" },
];

interface DrugCatalogProps {
  isDataAdded: any;
  paginationData: PaginationState;
  setPaginationData: any;
  providerGroupUuid?: string;
}
function DrugCatalogMaster(props: DrugCatalogProps) {
  const { isDataAdded, paginationData, setPaginationData, providerGroupUuid } =
    props;
  const classes = style();
  const [drugList, setDrugList] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [tableRowPerPage, setTableRowPerPage] = useState(10);
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
    useDrugCatalogControllerServiceGetAllDrugs({
      page: pagination.page,
      size: pagination.size,
      sortBy: "",
      sortDirection: "",
      searchString: searchString,
      providerGroupUuid: providerGroupUuid,
    });

  useEffect(() => {
    if (paginationData) setPagination(paginationData);
  }, [paginationData]);

  useEffect(() => {
    if (isDataAdded) refetch();
  }, [isDataAdded]);

  useEffect(() => {
    if (data?.data?.content.length > 0) {
      const newRows = data?.data?.content.map((drugCatalog: any) => ({
        id: drugCatalog.id,
        speciality: drugCatalog.speciality,
        type: drugCatalog.type,
        medicine: drugCatalog.medicine,
        dose: drugCatalog.dose,
        whenField: drugCatalog.whenField,
        whereField: drugCatalog.whereField,
        frequency: drugCatalog.frequency,
        duration: drugCatalog.duration,
        description: drugCatalog.description,
        status: drugCatalog.active,
        uuid: drugCatalog.uuid,
      }));
      setDrugList(newRows);
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
    } else {
      setDrugList([]);
    }
  }, [data]);

  const searchInputString = (event: any) => {
    setSearchString(event.target.value);
  };

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
        rows={drugList}
        page={page}
        rowsPerPage={tableRowPerPage}
        setPage={setPage}
        setRowsPerPage={setTableRowPerPage}
        isLoading={isLoading}
        getUpdatedList={refetch}
        codeType="Drug"
        providerGroupUuid={providerGroupUuid}
      />
    </div>
  );
}

export default DrugCatalogMaster;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import React, { useState, useEffect } from "react";
import {
  ButtonBase,
  // ButtonBase,
  Grid,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Row,
  adminTable,
} from "../../../../../components/core/layout/table/adminTable";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  useMigrationControllerServiceGetViewRecords,
  useProviderGroupControllerServiceGetAllProviderGroups,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useLocation } from "react-router-dom";
import { Column } from "../../../../../components/common/enums-and-interfaces/interfaces";
export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  height: "35px !important",
  width: "100%",
};

export const icd10DataColumns: Column[] = [
  { id: "code", label: "ICD 10 Code", minWidth: 100 },
  { id: "description", label: "Description" },
  { id: "status", label: "Status" },
];

export const cptCodeDataColumns: Column[] = [
  { id: "code", label: "CPT Code" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status" },
];

export const loincDataColumns: Column[] = [
  { id: "code", label: "LOINC Code" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status" },
];

export const hcpcsDataColumns: Column[] = [
  { id: "code", label: "HCPCS Code" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status" },
];

export const drugCatalogcolumns: Column[] = [
  { id: "id", label: "No" },
  { id: "speciality", label: "Speciality"},
  { id: "type", label: "Type"},
  { id: "medicine", label: "Medicine"},
  { id: "dose", label: "Dose"},
  { id: "whenField", label: "When"},
  { id: "whereField", label: "Where"},
  { id: "frequency", label: "Frequency"},
  { id: "duration", label: "Duration"},
  { id: "quantity", label: "Qty"},
  { id: "description", label: "Notes/Instructions"},
  { id: "status", label: "Status"},
  { id: "editDrugAction", label: "Action"},
];

function createPatient(code: string, description: string, status: string): Row {
  return {
    // id,
    code,
    description,
    status,
  };
}

function createDrugCatalog(
  id: string,
  speciality: string,
  type: string,
  medicine: string,
  dose: string,
  whenField: string,
  whereField: string,
  frequency: string,
  duration: string,
  quantity: string,
  description: string,
  status: boolean,
  uuid: string
): Row {
  return {
    id,
    speciality,
    type,
    medicine,
    dose,
    whenField,
    whereField,
    frequency,
    duration,
    quantity,
    description,
    status,
    uuid,
  };
}

function ViewPatientRecord({
  onCloseDrawer,
  sourceId,
  categoryName,
}: {
  onCloseDrawer: () => void;
  sourceId?: any;
  categoryName: any;
}) {
  const classes = adminTable();
  const [page, setPage] = React.useState(0);
  const [patientList, setPatientList] = useState<Row[]>([]);
  const [providerGroupData, setProviderGroupData] = useState<any>(null);
  const [providerGroupId, setProviderGroupId] = useState<any>("");
  const [title, setTitle] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [providerGroup, setProviderGroup] = useState({
    providerGroupName: "",
  });
  const [auditLogColumns, setAuditLogColumns] = useState<any>(null);
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
  const location = useLocation();
  const {
    data,
    isSuccess,
    refetch: getViewRecords,
  } = useMigrationControllerServiceGetViewRecords({
    category: categoryName,
    sourceId: sourceId,
    providerGroupUuid: providerGroupId,
  });

  const { data: getProviderGroup } =
    useProviderGroupControllerServiceGetAllProviderGroups({
      page: page,
      size: 10,
      sortBy: "",
      sortDirection: "",
      searchString: "",
      status: false,
      state: "",
    });

  useEffect(() => {
    if (!!getProviderGroup) {
      setProviderGroupData(getProviderGroup?.data?.content);
    }
  }, [getProviderGroup]);

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    if (location.pathname.includes("/icd-10")) {
      setTitle("ICD 10 Code Catalog");
      setAuditLogColumns(icd10DataColumns);
    } else if (location.pathname.includes("/cpt")) {
      setAuditLogColumns(cptCodeDataColumns);
      setTitle("CPT Code Catalog");
    } else if (location.pathname.includes("/loinc-code")) {
      setTitle("LONIC Code Catalog");
      setAuditLogColumns(loincDataColumns);
    } else if (location.pathname.includes("/hcpcs")) {
      setTitle("HCPCS Code Catalog");
      setAuditLogColumns(hcpcsDataColumns);
    } else if (location.pathname.includes("/drug")) {
      setTitle("Drug Catalog");
      setAuditLogColumns(drugCatalogcolumns);
    }
  };

  const sxs = {
    iconArrowWort: {
      marginBottom: "-2px",
      // marginTop: '6px',
      fontSize: "14px",
      transform: "rotate(90deg)",
      color: "#000000",
      cursor: "pointer",
      marginLeft: "2px",
    },
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isSuccess && !!data) {
      if (location.pathname.includes("/drug")) {
        const newRows = data?.data?.content?.map((drugCatalog: any) => {
          return createDrugCatalog(
            drugCatalog.id,
            drugCatalog.speciality,
            drugCatalog.type,
            drugCatalog.medicine,
            drugCatalog.dose,
            drugCatalog.whenField,
            drugCatalog.whereField,
            drugCatalog.frequency,
            drugCatalog.duration,
            drugCatalog.quantity,
            drugCatalog.description,
            drugCatalog.active,
            drugCatalog.uuid
          );
        });
        setPatientList(newRows);
      } else {
        const newRows = data?.data?.content?.map((auditData: any) => {
          return createPatient(
            auditData.code,
            auditData.description,
            auditData.active
          );
        });
        setPatientList(newRows);
      }
    }
  }, [isSuccess]);

  const handleSelectOption = (e: any) => {
    if (providerGroupData && providerGroupData.length > 0) {
      providerGroupData.forEach((provider: any) => {
        if (provider.uuid === e.target.value) {
          setProviderGroup((prevData) => ({
            ...prevData,
            providerGroupName: provider.groupName,
          }));
        }
      });
    }
    setProviderGroupId(e.target.value);
    getViewRecords();
  };

  return (
    <>
      <Grid container m={1}>
        <Grid
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginRight: "39px",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Grid item m={"4px"} sx={{ display: "flex", alignItems: "center", color: "#004186" }}>
            <ButtonBase onClick={onCloseDrawer}>
              <ArrowBackOutlined />
            </ButtonBase>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              View Record
            </Typography>
          </Grid>
          {/* <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowBackIosIcon sx={backIcon} />
            <Typography onClick={onCloseDrawer} sx={backToText}>
              Back
            </Typography>
          </Grid> */}
        </Grid>
        <Grid item xs={5.25} m={1}>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ marginBottom: "8px" }}></Grid>
        <Grid item xs={0.2}></Grid>
        <Grid item xs={3} sx={{ marginBottom: "5px" }}>
          {/* <Select
            sx={selectInputStyle}
            value={providerGroup.providerGroup}
            name="providerGroup"
            onChange={(e: any) => handleSelectOption(e)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#000000",
                    }}
                  >
                    Provider Group
                  </Typography>
                );
              }
              return <Typography variant="h4">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {providerGroupData.map((providerGroup) => (
              <MenuItem key={providerGroup.key} value={providerGroup.value}>
                {providerGroup.value}
              </MenuItem>
            ))}
          </Select> */}
          <Select
            sx={selectInputStyle}
            value={providerGroup.providerGroupName}
            name="providerGroupName"
            onChange={(e: any) => handleSelectOption(e)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#000000",
                    }}
                  >
                    Provider
                  </Typography>
                );
              }
              return <Typography variant="h4">{selected}</Typography>;
            }}
            MenuProps={MenuProps}
            displayEmpty
          >
            {providerGroupData &&
              providerGroupData.length > 0 &&
              providerGroupData.map((provider: any) => (
                <MenuItem key={provider.uuid} value={provider.uuid}>
                  {provider.groupName}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              margin: "10px !important",
              boxShadow: "none",
              overflow: "hidden",
              marginTop: "10px",
              background: "#F5F6F9",
            }}
          >
            <TableContainer
              sx={{
                width: "98%",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {auditLogColumns &&
                      auditLogColumns.length > 0 &&
                      auditLogColumns.map((column: any) => (
                        <TableCell
                          key={column.id}
                          className={classes.tableHeader}
                          style={{
                            minWidth: column.minWidth,
                            padding:"14px !important",
                          }}
                        >
                          <Grid container>
                            <Grid item sx={{ marginTop: "5px" }}>
                              <Typography
                                variant="h5"
                                sx={{ fontWeight: "300" }}
                              >
                                {column.label}
                              </Typography>
                            </Grid>
                            <Grid item sx={{ marginTop: "1px" }}>
                              <SyncAltIcon sx={sxs.iconArrowWort} />
                            </Grid>
                          </Grid>
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{ background: "#fff" }}>
                  {patientList &&
                    patientList.length > 0 &&
                    patientList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {auditLogColumns &&
                              auditLogColumns.length > 0 &&
                              auditLogColumns.map((column: any) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    className={classes.auditRowCell}
                                  >
                                    {column.id === "status" ? (
                                      <Switch checked={value} color="success" />
                                    ) : column.id === "speciality" ? (
                                      <Typography
                                        variant="h5"
                                        sx={{ color: "#000000" }}
                                      >
                                        {value.name}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant="h5"
                                        sx={{ color: "#000000" }}
                                      >
                                        {value}
                                      </Typography>
                                    )}
                                  </TableCell>
                                );
                              })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ marginTop: "-20x !important", border: "none !important" }}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={patientList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ViewPatientRecord;

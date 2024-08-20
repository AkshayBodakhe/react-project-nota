import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { formButtonStyle } from "../../../../../src/styles/common";
import { PaginationState } from "../../../../components/common/enums-and-interfaces/interfaces";
import CustomPagination from "../../../../components/common/pagination";
import { adminConstants } from "../../../../constants/admin";
import DataImportMaster from "./data-import/data-import";
import UploadCSVForm from "./data-import/upload-csv-file";
import AddDrugCatalog2 from "./drug-catalog/add-drug-catalog2";
import DrugCatalogMaster from "./drug-catalog/drug-catalog";
import HCPCSCodeTab from "./hcpcs-code";
import AddHcpcsCode from "./hcpcs-code/add-hcpcs-code";
import AddIcdMaster from "./icd-catalog/add-icd";
import IcdMaster from "./icd-catalog/icd-catalog";
import AddProcedureMaster from "./procedure-code-catalog/add-procedure-code";
import ProcedureCodeMaster from "./procedure-code-catalog/procedure-code-catalog";
import ProviderDataTab from "./provider-data";
import { useSelector } from "react-redux";
import PatientDataTab from "./patient-data";

export const style = makeStyles(() => ({
  tab: {
    fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "64vh",
    // overflowY: "scroll",
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
  addUserRoleBtnTypo: {
    color: "#ffffff",
    display: "flex",
    // paddingRight: "12px",
  },
}));

interface HeaderTabs {
  label: string;
}

const sxs = {
  backgroundPage: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px 15px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 8px #00000029",
    borderRadius: "5px",
    opacity: 1,
  },
};

interface subMenuProps {
  selectedIndex?: number;
  setIsSetting?: () => void;
}

function SubMenu(props: subMenuProps) {
  const { selectedIndex, setIsSetting } = props;
  const classes = style();
  // const navigate = useNavigate();
  const { ADD_DRUG_CATALOG, ADD_ICD_CODE, ADD_PROCEDURE_CODE } = adminConstants;
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

  const [value, setValue] = React.useState(selectedIndex || 0);
  const [openDrugCatalogModal, setOpenDrugCatalogModal] = React.useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [importingData, setImportingData] = useState({});
  const [openIcdCodeModal, setOpenIcdCodeModal] = useState(false);
  const [openProcedureCodeModal, setProcedureCodeModal] = useState(false);
  const [openHCPCSCodeModal, setHCPCSCodeModal] = useState(false);
  const [isDataAdded, setIsDataAdded] = useState(false);
  const [openUploadCsvForm, setOpenUploadCsvForm] = useState<boolean>(false);
  const [getUpdatedData, setGetUpdatedData] = useState(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleRefetech = () => {
    setRefetch(true);
  };

  const headerTabs: HeaderTabs[] = [
    {
      label: "Data Import",
    },
    {
      label: "Provider Data",
    },
    sessionStorage.getItem("role") !== "SUPER_ADMIN" &&
    sessionStorage.getItem("role") !== "ADMIN"
      ? { label: "Patient Data" }
      : null,
    {
      label: "Drug",
    },
    {
      label: "ICD 10 Code",
    },
    {
      label: "CPT Code",
    },
    {
      label: "HCPCS Code",
    },
  ].filter((tab): tab is HeaderTabs => tab !== null);

  // const handleClickOpen = () => {
  //   if (value == 0) setOpenUploadCsvForm(true);
  //   if (value == 2) setOpenDrugCatalogModal(true);
  //   if (value == 3) setOpenIcdCodeModal(true);
  //   if (value == 4) setProcedureCodeModal(true);
  //   if (value == 5) setHCPCSCodeModal(true);
  // };

  // const getLabelText = (value: number): string => {
  //   switch (value) {
  //     case 0:
  //       return "Upload Data";
  //     case 2:
  //       return "ADD Drug Catalog";
  //     case 3:
  //       return "ADD ICD 10 Code";
  //     case 4:
  //       return "ADD CPT Code";
  //     case 5:
  //       return "ADD HCPCS Code";
  //     default:
  //       return "";
  //   }
  // };

  const filteredTabs = headerTabs;

  const handleClickOpen = () => {
    const currentTab = filteredTabs[value];
    if (!currentTab) return;

    switch (currentTab.label) {
      case "Data Import":
        setOpenUploadCsvForm(true);
        break;
      case "Drug":
        setOpenDrugCatalogModal(true);
        break;
      case "ICD 10 Code":
        setOpenIcdCodeModal(true);
        break;
      case "CPT Code":
        setProcedureCodeModal(true);
        break;
      case "HCPCS Code":
        setHCPCSCodeModal(true);
        break;
      default:
        break;
    }
  };

  const getLabelText = (value: number): string => {
    const currentTab = filteredTabs[value];
    if (!currentTab) return "";

    switch (currentTab.label) {
      case "Data Import":
        return "Upload Data";
      case "Drug":
        return "ADD Drug Catalog";
      case "ICD 10 Code":
        return "ADD ICD 10 Code";
      case "CPT Code":
        return "ADD CPT Code";
      case "HCPCS Code":
        return "ADD HCPCS Code";
      default:
        return "";
    }
  };

  const handleBack = () => {
    setIsSetting && setIsSetting();
  };

  const renderAddButton = () => {
    const currentTab = filteredTabs[value];
    if(currentTab?.label=="Provider Data" || currentTab?.label=="Patient Data") return;
    return (
      <ButtonBase
        sx={{
          ...formButtonStyle.saveButtonStyle,
          padding: "0px 5px !important",
          width: "auto !important",
        }}
        onClick={handleClickOpen}
      >
        <span className={classes.addButtonTypo}>
          <AddIcon sx={{ fontSize: "18px" }} />
        </span>
        <Typography className={classes.addUserRoleBtnTypo} variant="h5">
          {getLabelText(value)}
        </Typography>
      </ButtonBase>
    );
  };

  const renderComponent = () => {
    const currentTab = filteredTabs[value];
    if (!currentTab) return null;

    switch (currentTab.label) {
      case "Data Import":
        return (
          <DataImportMaster
            importingData={importingData}
            isDataImportProcessing={isProcessing}
            paginationData={pagination}
            setPaginationData={setPagination}
            isDataAdded={isDataAdded}
            isRefetch={refetch}
            setRefetech={() => setRefetch(false)}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      case "Provider Data":
        return (
          <ProviderDataTab
            paginationData={pagination}
            setPaginationData={setPagination}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      case "Patient Data":
        return (
          <PatientDataTab
            paginationData={pagination}
            setPaginationData={setPagination}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      case "Drug":
        return (
          <DrugCatalogMaster
            paginationData={pagination}
            setPaginationData={setPagination}
            isDataAdded={isDataAdded}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      case "ICD 10 Code":
        return (
          <IcdMaster
            paginationData={pagination}
            setPaginationData={setPagination}
            isDataAdded={isDataAdded}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      case "CPT Code":
        return (
          <ProcedureCodeMaster
            paginationData={pagination}
            setPaginationData={setPagination}
            isDataAdded={isDataAdded}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      case "HCPCS Code":
        return (
          <HCPCSCodeTab
            paginationData={pagination}
            setPaginationData={setPagination}
            getHCPCSData={getUpdatedData}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Grid sx={sxs.backgroundPage}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Grid container alignItems={"center"}>
              <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleBack} />
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {filteredTabs.map((tab: any) => {
                  return (
                    <Tab
                      key={tab.label}
                      className={classes.tab}
                      sx={{ textTransform: "capitalize" }}
                      label={tab.label}
                    />
                  );
                })}
              </Tabs>
            </Grid>
          </Grid>
          <Grid item>{renderAddButton()}</Grid>
        </Grid>

        <Grid item xs={12} pl={3} className={classes.tabSwitchGrid}>
          {renderComponent()}
        </Grid>
        {openUploadCsvForm && (
          <UploadCSVForm
            setDataImportProcessing={setIsProcessing}
            refetch={handleRefetech}
            setImportingData={setImportingData}
            open={openUploadCsvForm}
            setOpen={setOpenUploadCsvForm}
            title="Upload"
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        )}
        {openDrugCatalogModal && (
          <AddDrugCatalog2
            title={ADD_DRUG_CATALOG}
            source="Add"
            open={openDrugCatalogModal}
            setOpen={setOpenDrugCatalogModal}
            setIsDataAdded={setIsDataAdded}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        )}
        {openIcdCodeModal && (
          <AddIcdMaster
            title={ADD_ICD_CODE}
            source="Add"
            open={openIcdCodeModal}
            setOpen={setOpenIcdCodeModal}
            setIsDataAdded={setIsDataAdded}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        )}
        {openProcedureCodeModal && (
          <AddProcedureMaster
            title={ADD_PROCEDURE_CODE}
            source="Add"
            open={openProcedureCodeModal}
            setOpen={setProcedureCodeModal}
            setIsDataAdded={setIsDataAdded}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        )}
        {openHCPCSCodeModal && (
          <AddHcpcsCode
            open={openHCPCSCodeModal}
            setOpen={setHCPCSCodeModal}
            title="Add HCPCS Code"
            getHCPCSData={() => setGetUpdatedData(true)}
            providerGroupUuid={
              (userDetails?.data?.providerGroup as string) || ""
            }
          />
        )}
      </Grid>
      <CustomPagination pagination={pagination} setPagination={setPagination} />
    </React.Fragment>
  );
}

export default SubMenu;

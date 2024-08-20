import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formButtonStyle } from "../../../../../../../styles/common";
import { demographicsIndexStyles } from "../demographics";
import { PatientData } from "../diagnoses";
import { DocumentFormType } from "../enums-interfaces/enums";
import AllDocuments from "./all-documents";
import ManageDocumentTypeForm from "./all-documents/forms/manage-document-type-form";
import UploadDocumentForm from "./all-documents/forms/upload-document-form";
import StickyNotes from "./sticky-notes";
import { PatientDocumentControllerService } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import useHasPermission from "../../../../../../../components/common/useHasPermission";
import { Permission } from "../../../../../../../components/common/enums-and-interfaces/enums";

const sxs = {
  label: {
    textTransform: "capitalize",
    fontWeight: "bold !important",
    fontSize: "16px",
  },
};

function DocumentsTab(props: PatientData) {
  const classes = demographicsIndexStyles();
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState({
    open: false,
    type: "",
  });

  const [pagination, setPagination] = useState({
    patientUuid: props?.patientData?.uuid || "",
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    totalPages: 0,
    totalElements: 0,
  });

  const [tableData, setTableData] = useState<any[]>([]);

  const getAllDocuments = async () => {
    await PatientDocumentControllerService.getAllDocumentsOfPatient(
      pagination.patientUuid,
      pagination.page,
      pagination.size,
      ["created,desc"],
    ).then((res) => {
      setTableData(res?.data?.content);
    });
  };

  useEffect(() => {
    if (value == 0) getAllDocuments();
  }, [value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleModalOpen = () => {
    setModal({ open: true, type: DocumentFormType.UPLOAD_DOCUMENT });
  };

  const handleManageType = () => {
    setModal({ open: true, type: DocumentFormType.MANAGE_DOCUMENT_TYPE });
  };

  const handleClose = () => {
    setModal((prev) => ({ ...prev, open: false }));
  };

  const canViewStickyNotes = useHasPermission(Permission.STICKY_NOTE);

  return (
    <Grid>
      <Grid container xs={12}>
        <Grid item xs={9}>
          <Tabs value={value} onChange={handleChange}>
            <Tab sx={sxs.label} label="Documents" />
            {canViewStickyNotes && <Tab sx={sxs.label} label="Sticky Notes" />}
          </Tabs>
        </Grid>
        <Grid item container xs={3} className={classes.buttonGrid} pr={1.5}>
          {value === 0 && (
            <Grid item container xs={12}>
              <Grid
                item
                xs={7}
                sx={{
                  display: "flex",
                  textAlign: "left",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  onClick={handleManageType}
                  sx={{ fontWeight: "700 !important", cursor: "pointer" }}
                  className={classes.buttonTypo}
                >
                  Manage Document types
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <ButtonBase
                  type="submit"
                  sx={{
                    ...formButtonStyle.mainButtonStyle,
                    height: "40px !important",
                  }}
                  onClick={handleModalOpen}
                >
                  <Typography variant="h4" className={classes.buttonTypo}>
                    Upload Document
                  </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.tabSwitchGrid}>
        {value === 0 && (
          <AllDocuments
            isLoading={false}
            patientData={props?.patientData}
            pagination={pagination}
            refetch={getAllDocuments}
            setPagination={setPagination}
          />
        )}
        {value === 1 && <StickyNotes patientData={props?.patientData} />}
      </Grid>
      {modal.open &&
        (() => {
          switch (modal.type) {
            case DocumentFormType.UPLOAD_DOCUMENT:
              return (
                <UploadDocumentForm
                  open={modal.open}
                  onClose={handleClose}
                  patientData={props?.patientData}
                  title={"Upload Document"}
                  refetch={getAllDocuments}
                />
              );
            case DocumentFormType.MANAGE_DOCUMENT_TYPE:
              return (
                <ManageDocumentTypeForm
                  open={modal.open}
                  onClose={handleClose}
                  patientData={props?.patientData}
                  title={"Manage Document Types"}
                />
              );
            default:
              return;
          }
        })()}
    </Grid>
  );
}

export default DocumentsTab;

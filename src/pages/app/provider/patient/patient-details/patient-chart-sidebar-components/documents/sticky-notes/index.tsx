import { Grid } from "@mui/material";
import { PatientData } from "../../diagnoses";
import StickyNotesTable from "./sticky-notes-table";
import { useEffect, useState } from "react";
import {
  usePatientDocumentControllerServiceGetAllDocumentsOfPatient,
  useStickynotesControllerServiceGetAllStickyNote,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

function StickyNotes(props: PatientData) {
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

  const { data, isLoading, refetch } =
    useStickynotesControllerServiceGetAllStickyNote({
      patientUuid: pagination.patientUuid,
      page: pagination.page,
      size: pagination.size,
      sort:['created,desc'],
    });

  useEffect(() => {
    if (data?.data?.content) {
      setTableData(data.data.content);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [data?.data]);

  return (
    <Grid p={2}>
      <StickyNotesTable
        isLoading={isLoading}
        pagination={pagination}
        patientData={props?.patientData}
        refetch={refetch}
        setPagination={setPagination}
        tableData={tableData}
      />
    </Grid>
  );
}

export default StickyNotes;

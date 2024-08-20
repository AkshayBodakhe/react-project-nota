import { Grid } from "@mui/material";
import { PatientData } from "../../diagnoses";
import AllDocumentsTable from "./all-documents-table";
import { useEffect, useState } from "react";
import { usePatientDocumentControllerServiceGetAllDocumentsOfPatient } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

const response = {
  data: {
    data: {
      content: [
        {
          name: "Full Intake Form",
          type: "Intake Form",
          date: "12-10-2023",
          uploadedBy: "Brandon Jenkins",
        },
      ],
    },
  },
};

function AllDocuments(props: PatientData) {
  return (
    <Grid p={2}>
      <AllDocumentsTable
        isLoading={props.isLoading || false}
        pagination={props.pagination}
        patientData={props?.patientData}
        refetch={props.refetch}
        setPagination={props.setPagination}
      />
    </Grid>
  );
}

export default AllDocuments;

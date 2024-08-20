import { useEffect, useState } from "react";
import { PatientData } from "../../diagnoses";
import PastSurgicalHistoryTable from "./past-surgical-history-table";
import { usePatientSurgicalHistoryControllerServiceViewSurgicalHistory } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

function PastSurgicalHistoryIndex(props: PatientData) {
  return (
    <div>
      <PastSurgicalHistoryTable
        isLoading={props.isLoading || false}
        refetch={props.refetch}
        pagination={props.pagination}
        setPagination={props.setPagination}
        tableData={props?.data?.data?.content}
        patientData={props?.patientData}
      />
    </div>
  )
}

export default PastSurgicalHistoryIndex;

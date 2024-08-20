import { useEffect, useState } from "react"
import { PatientData } from "../../diagnoses"
import PastMedicalHistoryTable from "./past-medical-history-table"
import { useMedicalHistoryControllerServiceViewMedicalHistory } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";

function PastMedicalHistoryIndex(props: PatientData) {
  
  return (
    <div>
      <PastMedicalHistoryTable
        isLoading={props.isLoading || false}
        refetch={props.refetch}
        pagination={props.pagination}
        setPagination={props.setPagination}
        tableData={props.data?.data?.content}
        patientData={props.patientData}
      />
    </div>
  )
}

export default PastMedicalHistoryIndex

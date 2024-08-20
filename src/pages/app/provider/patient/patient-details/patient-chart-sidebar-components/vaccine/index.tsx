import { PatientData } from "../diagnoses"
import VaccineTable from "./vaccine-table"

function VaccineIndex(props: PatientData) {
  return (
    <div>
      <VaccineTable patientData={props.patientData} />
    </div>
  )
}

export default VaccineIndex

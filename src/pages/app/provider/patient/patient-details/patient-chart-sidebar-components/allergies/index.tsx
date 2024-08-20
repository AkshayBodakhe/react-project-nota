import { PatientData } from "../diagnoses";
import AllergyList from "./allergies-list";

function Allergies(props: PatientData) {
  return (
    <div>
      <AllergyList patientData={props.patientData} />
    </div>
  )
}

export default Allergies;

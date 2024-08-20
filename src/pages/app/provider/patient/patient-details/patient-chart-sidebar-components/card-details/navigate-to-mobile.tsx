import { useParams } from "react-router-dom";
import PatientCardDetails from "./patient-card-details";

const NavigateToMobile = () => {
  const uuid = useParams();
  return (
    <>
      <PatientCardDetails
        open={true}
        patientUuid={uuid.uuid}
        token={uuid.token}
      />
    </>
  );
};

export default NavigateToMobile;

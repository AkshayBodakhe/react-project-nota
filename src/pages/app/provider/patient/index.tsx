import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import PatientList from "./patientList";

const { PROVIDER } = adminConstants;

function PatientPage() {

    return (
        <div>
            <PatientList />
        </div>
    );
}

export default AppLayout(PatientPage, { source: PROVIDER });
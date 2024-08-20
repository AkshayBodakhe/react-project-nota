import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import PatientForm from "./patient-form";

const {
    PROVIDER
} = adminConstants;

function AddPatientPage() {
    return (
        <>
            <PatientForm />
        </>
    );
}

export default AppLayout(AddPatientPage, { source: PROVIDER });
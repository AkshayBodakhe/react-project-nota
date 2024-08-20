import { AccountsType } from "../../../common-files/enums";
import AccountsTable from "./tables/account-receivable-table";

function PatientAccountReceivable() {
    return (
        <>
            <AccountsTable type={AccountsType.Patient} />
        </>
    );
}

export default PatientAccountReceivable;
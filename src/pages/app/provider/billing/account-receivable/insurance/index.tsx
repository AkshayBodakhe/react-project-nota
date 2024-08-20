import { AccountsType } from "../../../common-files/enums";
import AccountsTable from "../patient/tables/account-receivable-table";

function InsuranceAccountReceivable(){
    return(
        <AccountsTable type={AccountsType.Insurance} />

    );
}

export default InsuranceAccountReceivable;
import { Outlet } from "react-router-dom";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import { providerConstants } from "../../../../../constants/provider";
import ClaimsPage from "./ClaimsPage";

const { PROVIDER } = adminConstants;

const { } = providerConstants;

function BillingClaimsPage(){
    return(
        <><ClaimsPage /><Outlet /></>
    );
}


export default AppLayout(BillingClaimsPage, { source: PROVIDER });
import { Outlet } from "react-router-dom";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import { providerConstants } from "../../../../../constants/provider";
import BillingNavButtons from "./billing-nav-buttons/billing-nav-buttons";
// import SuperBillPage from "./superbill";

const { PROVIDER } = adminConstants;

const { } = providerConstants;



function SuperBillingPage() {

    return (
        <>
            <BillingNavButtons />
            <Outlet />
        </>
    );
}

export default AppLayout(SuperBillingPage, { source: PROVIDER });
import { Outlet } from "react-router-dom";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import ReveivableNavBtns from "./account-receivable-nav-btns/nav-btns";

const {
    PROVIDER
} = adminConstants;

function AccountReceivablePage() {
    return (
        <>
            <ReveivableNavBtns />
            <Outlet />
        </>
    );
}

export default AppLayout(AccountReceivablePage, { source: PROVIDER });
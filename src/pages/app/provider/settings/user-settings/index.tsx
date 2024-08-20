import { Outlet } from "react-router-dom";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import UserNavBtns from "./user-nav-btns";

const {
    PROVIDER
} = adminConstants;

function UserSettings() {
    return (
        <>
            <UserNavBtns />
            <Outlet />
        </>
    );
}

export default AppLayout(UserSettings, { source: PROVIDER });
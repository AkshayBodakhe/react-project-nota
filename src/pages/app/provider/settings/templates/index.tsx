import { Outlet } from "react-router-dom";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import TemplateNavBtns from "./nav-btns/template-nav-btns";

const {
    PROVIDER
} = adminConstants;

function TemplatesPage() {

    return (
        <>
            <TemplateNavBtns />
            <Outlet />
        </>
    );
}

export default AppLayout(TemplatesPage, { source: PROVIDER });
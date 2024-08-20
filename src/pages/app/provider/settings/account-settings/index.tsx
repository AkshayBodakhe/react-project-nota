// import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import AccountSettingsNavBtns from "./account-settings-nav-btns";

const {
    PROVIDER
} = adminConstants;



function AccountSettingsPage() {
    return (
        <Grid sx={{background:"#fff"}} p={2}>
            <AccountSettingsNavBtns />
            {/* <Outlet /> */}
        </Grid>
    );
}

export default AppLayout(AccountSettingsPage, { source: PROVIDER });
import { Grid } from "@mui/material";
import NotificationTable from "./tables/notification-table";
import Form from "./tables/form";
import Note from "./tables/note";
import Claim from "./tables/claim";
import Invoice from "./tables/invoice";

function NotificationPage() {
    return (
        <>
        <Grid container>
            <Grid xs={12} item>
            <NotificationTable />
            </Grid>
            <Grid xs={12} item>
                <Form/>
            </Grid>
            <Grid xs={12} item>
                <Note/>
            </Grid>
            <Grid xs={12} item>
                <Invoice/>
            </Grid>
            <Grid xs={12} item>
                <Claim/>
            </Grid>
        </Grid>     
        </>
    );
}

export default NotificationPage;
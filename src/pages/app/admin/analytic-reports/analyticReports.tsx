import { Grid, Typography } from "@mui/material";
import App from "../../../../App";
import AppLayout from "../../../../components/core/layout/layout";
import { PROVIDER } from "../../provider/documents/documents-constant/documents-common-const";
import { adminConstants } from "../../../../constants/admin";
const { ADMIN } = adminConstants;

function AnalyticReports() {
  return (
    <>
      <Grid bgcolor={"white"} height={"80px"} p={2}>
        <Typography variant="h3" fontWeight={"500"}>
          {"Analytics/Reports"}
        </Typography>
        <Typography py={2}>{"No data available"}</Typography>
      </Grid>
    </>
  );
}

export default AppLayout(AnalyticReports, { source: ADMIN });

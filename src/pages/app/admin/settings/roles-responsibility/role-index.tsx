import { Grid } from "@mui/material"
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import RoleTable, { UI } from "./roles-responsibility-table";
const { ADMIN } = adminConstants;

function RoleIndex() {
  const classes = UI() ; 
  return (
    <Grid className={classes.mainContainer}>
      <RoleTable/>
    </Grid>
  )
}
export default AppLayout(RoleIndex, { source: ADMIN });

import { Checkbox, Grid, Typography } from "@mui/material";
import { patientStyle } from "./style/commonStyle";

function Privacy() {
  const classes = patientStyle();
  const privacy = [
    { id: "1", name: "Consent To Email", checked: "true" },
    { id: "2", name: "Consent To Call", checked: "true" },
    { id: "3", name: "Consent To Message", checked: "true" },
  ];
  return (
    <div>
      <Grid className={classes.formGridTitle} mt={3}>
        <Typography sx={{ fontWeight: "700" }}>Privacy</Typography>
      </Grid>
      <Grid sx={{ marginTop: "10px !important" ,color:"#000" }}>
        <Grid item className={classes.checkBoxGrid}>
          {privacy.map((item) => {
            return (
              <Grid item className={classes.checkBoxItem}>
                <Typography variant="h4" className={classes.checkBoxText}>
                  {item.name}
                </Typography>
                <Checkbox
                //   classes={{
                //     checked: classes.checkBoxColor,
                //     root: classes.checkBoxColor,
                //   }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default Privacy;

import ProvidersAndPatientsGraph from "./providers-patients-graph";
import ProviderGroupsGraph from "./provider-group-graph";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Grid } from "@mui/material";

Chart.register(CategoryScale);

function Graphs() {
  return (
    <>
      <Grid
        display={"grid"}
        gridTemplateColumns={"49.4% 49.4%"}
        columnGap={"1.2%"}
        mb={"15px"}
      >
        <Grid item>
          <ProviderGroupsGraph />
        </Grid>
        <Grid item>
          <ProvidersAndPatientsGraph />
        </Grid>
      </Grid>
    </>
  );
}

export default Graphs;

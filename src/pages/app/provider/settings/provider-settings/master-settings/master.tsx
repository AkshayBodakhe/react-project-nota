import { Grid } from "@mui/material";
import SubMenu from "../../../../admin/new-master/sub-menu-master.tsx";
type MasterProps = {
  setIsSetting: any;
  selectedIndex?: number;
};

const Master = (props: MasterProps) => {
  const { selectedIndex, setIsSetting } = props;

  return (
    <>
      <Grid mt={2}>
        <SubMenu selectedIndex={selectedIndex} setIsSetting={setIsSetting} />
      </Grid>
    </>
  );
};

export default Master;

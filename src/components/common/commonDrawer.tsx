import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  ButtonBase,
  Drawer,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import { drawerHeader, gridHeader } from "./drawer-bs.widgets";
// import { theme } from "../../utils/theme";
export const gridHeader = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 25px",
  borderBottom: "1px solid #EAECF0",
  marginBottom: "20px",
};

export const drawerHeader = {
  color: "#393939 !important",
  fontFamily: "Figtree !important",
  fontStyle: "normal !important",
  fontWeight: "500 !important",
  lineHeight: "150% !important",
  letterSpacing: "0.1px !important",
};

interface DrawerProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  title: string;
  drawerWidth?: string;
  drawerPadding?: string;
  onClose: () => void;
  headerStyle?: any;
}

const CommomDrawer = (props: React.PropsWithChildren<DrawerProps>) => {
  const { drawerWidth, drawerPadding } = props;
  //   const belowLg = useMediaQuery(theme.breakpoints.down("lg")) && !drawerWidth;

  return (
    <Drawer
      anchor={props.anchor}
      open={props.open}
      onClose={props.onClose}
      sx={{ borderRadius: 8 }}
    >
      <Grid
        container
        flexDirection={"column"}
        height={"100%"}
        flexWrap={"nowrap"}
      >
        <Grid
          container
          alignItems="center"
          sx={gridHeader}
          mt={props.headerStyle}
        >
          <Grid item>
            <Typography sx={drawerHeader} variant="h1">
              {props.title}
            </Typography>
          </Grid>
          <Grid item>
            <ButtonBase onClick={props.onClose}>
              <CloseOutlinedIcon />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid
          item
          flex={1}
          sx={{
            // maxWidth: "60rem",
            width: drawerWidth ? drawerWidth : "50vw",
            paddingX: drawerPadding ? drawerPadding : "50px",
            paddingBottom: "20px",
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CommomDrawer;

import { Backdrop, Box, CircularProgress } from "@mui/material";

export type loaderProps = {
  isLoading: boolean;
};

export const sxs = {
  loading: {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
    margin: "2%",
    color: "red",
  },
};

function Loader(props: loaderProps) {
  const { isLoading } = props;
  return (
    // <Box sx={sxs.loading}>
    <Backdrop
      sx={{
        zIndex: "10000 !important",
        color: "white",
      }}
      open={isLoading}
    >
      <CircularProgress disableShrink />
    </Backdrop>
    // </Box>
  );
}

export default Loader;

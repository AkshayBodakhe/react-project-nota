import { Box, CircularProgress } from "@mui/material";

export const sxs = {
  loading: {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
    margin: "2%",
    color: "red",
  },
};

function Loading() {
  return (
    <Box sx={sxs.loading}>
      <CircularProgress disableShrink />
    </Box>
  );
}

export default Loading;

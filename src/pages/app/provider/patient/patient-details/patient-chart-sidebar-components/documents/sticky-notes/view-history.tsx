import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { formTitle } from "../../../../../../../../styles/common";
import { formatTimestamp } from "./sticky-notes-table";

interface AddMasterModelProps {
  source?: string;
  open: boolean;
  setOpen: any;
  stickyData: any;
}

function ViewHistory(props: AddMasterModelProps) {
  const {
    //source,
    open,
    setOpen,
    stickyData,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="scroll-dialog-title">
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={11}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Typography sx={formTitle}>{"Note Details"}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ width: "450px" }}>
          <Grid xs={12}>
            <Typography>{stickyData.description}</Typography>
          </Grid>
          <Grid xs={12} mt={3} sx={{display:"flex",justifyContent:"end"}}>
            <Typography>{`${stickyData.noteName} | ${formatTimestamp(
              stickyData.createdDate
            )}`}</Typography>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default ViewHistory;

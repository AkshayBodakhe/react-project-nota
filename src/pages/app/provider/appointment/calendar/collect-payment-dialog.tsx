import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { formButtonStyle } from "../../../../../styles/common";
import CloseIcon from "@mui/icons-material/Close";

interface CollectPaymentProps {
  open: boolean;
  handleClose: any;
}

const CollectPaymentDialog = (props: CollectPaymentProps) => {
  const { open, handleClose } = props;
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3" fontWeight={"bold"}>
              {"Payment Method"}
            </Typography>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <ButtonBase
            // onClick={""}
            sx={formButtonStyle.saveButtonStyle}
          >
            {"Collect Payment"}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CollectPaymentDialog;

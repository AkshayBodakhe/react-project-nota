import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../store/features/common-actions/snackbar/alertSlice";

export type CommonSnackbarProps = {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning" | undefined;
}

function CommonSnackbar({ open, message, severity }: CommonSnackbarProps) {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(alertAction.resetAlert())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CommonSnackbar;
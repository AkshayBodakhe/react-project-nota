import { Box, ButtonBase, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import verifiedtick from "../../assets/other/successmodal-greentick.gif";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

export const successModalStyles = makeStyles(() => {
  return {
    customButtonSave: {
      marginTop: "20px !important",
      background: "#36588C 0% 0% no-repeat padding-box !important",
      borderRadius: "5px !important",
      width: "80px",
      height: "35px",
      color: "#FFFFFF !important",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
    },
    gif: {
      width: "200px",
    },
    boxStyle: {
      "@media (min-width: 300px) and (max-width: 650px)": {
        width: "80vw",
      },
      width: "30vw",
      backgroundColor: "#ffffff",
      outline: "none",
      borderRadius: "4px",
      padding: "30px",
    },
  };
});

interface EventSuccessModalProps {
  onClose: () => void;
  message: string;
  route?: string;
}

const EventSucessModal: React.FC<EventSuccessModalProps> = ({
  onClose,
  message,
  route,
}) => {
  const classes = successModalStyles();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const handleOkayClick = () => {
    onClose();
    setOpen(false);
    if (route) {
      navigate(route);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
    >
      <Box className={classes.boxStyle}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.gridItem}>
            <img
              src={verifiedtick}
              className={classes.gif}
              alt="confirmation-gif"
            />
          </Grid>
          <Grid item lg={12} xs={12} className={classes.gridItem}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {message}
            </Typography>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.gridItem}>
            <ButtonBase
              sx={{
                "@media (min-width: 300px) and (max-width: 650px)": {
                  display: "none",
                },
              }}
              className={classes.customButtonSave}
              onClick={handleOkayClick}
            >
              <Typography variant="h3">Okay</Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EventSucessModal;

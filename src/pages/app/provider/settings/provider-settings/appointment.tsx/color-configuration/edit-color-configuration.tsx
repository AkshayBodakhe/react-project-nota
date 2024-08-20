import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { formButtonStyle, formTitle } from "../../../../../../../styles/common";
import { patientStyle } from "../../../../patient/style/commonStyle";

interface ColorConfiguration {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
}

function EditColorConfiguration(props: ColorConfiguration) {
  const classes = patientStyle();
  const { open, setOpen, title } = props;
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [appointmentName] = useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSelectedColor(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            minWidth: "500px !important",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title" sx={{ marginBottom: "15px" }}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography sx={formTitle}>{title}</Typography>
            </Grid>
            <Grid item>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  color: "#1A1A1A !important",
                }}
              >
                Appointment Name
              </Typography>
              <InputBase
                value={appointmentName}
                name="appointName"
                fullWidth
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5">Color</Typography>&nbsp;&nbsp;
                {/* <Button
                  sx={{
                    width: "65px",
                    height: "24px",
                    background: "#01C019 0% 0% no-repeat padding-box",
                    borderRadius: "3px",
                    opacity: 1,
                    "&:hover" :{
                        background: "#01C019 0% 0% no-repeat padding-box",
                    }
                  }}
                ></Button> */}
                <input
                  type="color"
                  value={selectedColor}
                  onChange={handleChange}
                  style={{
                    padding: "0px",
                    width: "65px",
                    height: "35px",
                    border: "unset",
                    background: "transparent",
                  }}
                />
                {/* <div style={{ marginTop: "20px" }}>
                  Selected Color:{" "}
                  <span style={{ color: selectedColor }}>{selectedColor}</span>
                </div> */}
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
              <Button sx={formButtonStyle.saveButtonStyle}>
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Save
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditColorConfiguration;

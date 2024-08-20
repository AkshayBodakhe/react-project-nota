import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import { style } from "./style/common-style";

interface AddEditPendingResponseProps {
  title: string;
  onClose: () => void;
  open: boolean;
}

function PendingResponseModel(props: AddEditPendingResponseProps) {
  const classes = style();
  const commonStyle = commonWidget();
  const { onClose, open } = props;

  const close = () => {
    onClose();
  };

  const [isGridVisible, setGridVisibility] = useState(false);

  const toggleGrid = () => {
    setGridVisibility(!isGridVisible);
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid className={classes.dialogTitle}>
          <Grid>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Response
            </Typography>
          </Grid>
          <Grid style={{ cursor: "pointer" }}>
            <CloseIcon onClick={close} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid mt={2}>
            <Grid container xs={12} columnGap={1.3}>
              <Grid item xs={3.9} sx={{ padding: "0px !important" }}>
                <Grid
                  container
                  className={classes.box}
                  flexDirection={"column"}
                  gap={"10px"}
                >
                  <Grid xs={4} item>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: "bold", color: "#36588C" }}
                    >
                      Patient
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          Carl Philips
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid container>
                      <Grid xs={5} item>
                        <Typography variant="h5" className={classes.titleData}>
                          DOB
                        </Typography>
                      </Grid>
                      <Grid xs={7} item>
                        <Typography variant="h5" className={classes.data}>
                          21 Sept 1997
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Gender
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          Male
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid xs={5}>
                      <Typography variant="h5" className={classes.titleData}>
                        Address
                      </Typography>
                    </Grid>
                    <Grid xs={7}>
                      <Typography variant="h5" className={classes.data}>
                        teerth technospace baner
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid xs={5}>
                      <Typography variant="h5" className={classes.titleData}>
                        &#x200B;
                      </Typography>
                    </Grid>
                    <Grid xs={7}>
                      <Typography variant="h5" className={classes.data}>
                        &#x200B;
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.9} sx={{ padding: "0px !important" }}>
                <Grid
                  container
                  className={classes.box}
                  flexDirection={"column"}
                  gap={"10px"}
                >
                  <Grid xs={12} item>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: "bold", color: "#36588C" }}
                    >
                      Response From
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          Carl Philips
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid xs={5} item>
                        <Typography variant="h5" className={classes.titleData}>
                          Speciality
                        </Typography>
                      </Grid>
                      <Grid xs={7} item>
                        <Typography variant="h5" className={classes.data}>
                          Primary Provider
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          teerth technospace baner
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid xs={5} item>
                        <Typography variant="h5" className={classes.titleData}>
                          Phone
                        </Typography>
                      </Grid>
                      <Grid xs={7} item>
                        <Typography variant="h5" className={classes.data}>
                          (212)89343593045
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Fax
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          011(212)89343593045
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.9} sx={{ padding: "0px !important" }}>
                <Grid
                  container
                  className={classes.box}
                  flexDirection={"column"}
                  gap={"10px"}
                >
                  <Grid xs={12} item>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: "bold", color: "#36588C" }}
                    >
                      Response To
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          Carl Philips
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Speciality
                        </Typography>
                      </Grid>
                      <Grid xs={7} item>
                        <Typography variant="h5" className={classes.data}>
                          Primary Provider
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          teerth technospace baner
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Phone
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          (212)89343593045
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid xs={5}>
                        <Typography variant="h5" className={classes.titleData}>
                          Fax
                        </Typography>
                      </Grid>
                      <Grid xs={7}>
                        <Typography variant="h5" className={classes.data}>
                          011(212)89343593045
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Grid container xs={4}>
                  <Typography variant="h5" className={classes.label}>
                    Search By Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Choose Date"
                      slotProps={{ textField: { size: "small" } }}
                      sx={{
                        width: "100%",
                        "& fieldset": { border: "none" },
                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        "& label": {
                          color: "#1A1A1A80 !important",
                          fontSize: "14px !important",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12} mt={2}>
                <Typography variant="h5" className={classes.label}>
                  Note
                </Typography>
                <InputBase
                  placeholder="Type here"
                  multiline={true}
                  rows="3"
                  classes={{
                    root: commonStyle.providerTextAreaField,
                  }}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography variant="h5" style={{ color: "#1A1A1A" }}>
                      Attachments
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="h5"
                      className={classes.addlabel}
                      onClick={toggleGrid}
                    >
                      <AddIcon style={{ marginRight: "5px" }} />
                      Add
                    </Typography>
                  </Grid>
                </Grid>
                {isGridVisible && (
                  <Grid item xs={4} lg={4} mt={2}>
                    <DropzoneArea
                      dropzoneText="Drag & Drop files Or Browse Files"
                      onChange={(_files: any) => {}}
                      classes={{
                        root: classes.dropZone,
                        icon: classes.uploadIcon,
                        text: classes.textUploadZone,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>
        <Grid className={classes.footer}>
          <Grid className={classes.footerBtn}>
            <ButtonBase
              sx={{
                border: "1px solid #36588C",
                color: "#36588C",
                padding: "8px 10px",
                fontSize: "14",
                fontWeight: "bold",
                borderRadius: "4px",
              }}
            >
              sign
            </ButtonBase>
          </Grid>
          <Grid className={classes.footerBtn}>
            <ButtonBase sx={formButtonStyle.saveButtonStyle}>
              Save & review
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogContent>
      <Grid></Grid>
    </Dialog>
  );
}

export default PendingResponseModel;

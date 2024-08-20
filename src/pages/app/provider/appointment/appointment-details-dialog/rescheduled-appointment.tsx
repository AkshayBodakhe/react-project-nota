import { Close } from "@mui/icons-material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { commonWidget } from "../../../../../styles/common";

interface rescheduledAppProps {
  open: boolean;
  onClose: any;
}

export const dialogTitle = {
  background: "#F5F6F9",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
};

export const firstContainer = {
  border: "1px solid black",
  borderRadius: "5px",
  height: "70px",
  width: "70px",
};

export const apptType = ["Follow up", "New appointment"];
export const locType = ["Virtual", "Calle Palcilla 0184, Hospital,Chile"];
function RescheduledAppointment(props: rescheduledAppProps) {
  const { open, onClose } = props;
  const classes = commonWidget();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  return (
    <>
      <Dialog open={open} fullWidth onClose={onClose} maxWidth="md">
        <DialogTitle id="scroll-dialog-title" sx={dialogTitle}>
          <Typography variant="h3">{"Rescheduled Appointment"}</Typography>
          <Close sx={{ cursor: "pointer" }} onClick={onClose} />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Grid sx={firstContainer} />
            <Grid container flexDirection={"column"} rowGap={2}>
              <Box>
                <Typography fontWeight={"600"}>{"Henna West(8746)"}</Typography>
              </Box>
              <Box
                display={"grid"}
                gridTemplateColumns={"40% 30% 30%"}
                // rowGap={3}
              >
                <Grid container gap={2.5}>
                  <Typography>{"14 July 1965"}</Typography>
                  <Typography>{"73 yrs"}</Typography>
                  <Typography>{"Female"}</Typography>
                </Grid>
                <Box sx={{ display: "flex", gap: "3px" }}>
                  <PhoneIphoneIcon />
                  <Typography>{"(569)-822-4144"}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "3px" }}>
                  <MailOutlineIcon />
                  <Typography>{"hennawest@gmailcom"}</Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography sx={{ color: "black", fontWeight: "500" }}>
              {"Provider Name"}
            </Typography>
            <Typography>{"Corina Earle"}</Typography>
          </Box>
          <Box
            sx={{
              py: "14px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Grid>
              <Typography fontWeight={"bold"}>{"Appointment Mode"}</Typography>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={""}
              >
                <FormControlLabel
                  value="IN_PERSON"
                  control={<Radio onChange={() => {}} />}
                  label="In Person"
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "15px !important",
                      color: "black !important",
                    },
                  }}
                />
                <FormControlLabel
                  value="VIDEO_CALL"
                  control={<Radio onChange={() => {}} />}
                  label="Video Call"
                />
                <FormControlLabel
                  value="VOICE_CALL"
                  control={<Radio onChange={() => {}} />}
                  label="Voice Call"
                />
              </RadioGroup>
            </Grid>
            <Grid>
              <Typography fontWeight={"bold"}>{"Appointment Type"}</Typography>
              <Select
                className={classes.selectInputStyle}
                fullWidth
                // name="subjective.historyOfPresentIllness.patientAllergy.allergy.name"
                // value={
                //   formikData.values.subjective.historyOfPresentIllness
                //     .patientAllergy.allergy.name
                // }
                onChange={() => {}}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Type
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{""}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {apptType.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Box>
          <Box>
            <Grid>
              <Typography fontWeight={"bold"}>{"Location"}</Typography>
              <Select
                className={classes.selectInputStyle}
                fullWidth
                // name="subjective.historyOfPresentIllness.patientAllergy.allergy.name"
                // value={
                //   formikData.values.subjective.historyOfPresentIllness
                //     .patientAllergy.allergy.name
                // }
                onChange={() => {}}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1A1A1A80 !important",
                          }}
                        >
                          Select Type
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{""}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {locType.map((data) => {
                  return (
                    <MenuItem
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RescheduledAppointment;

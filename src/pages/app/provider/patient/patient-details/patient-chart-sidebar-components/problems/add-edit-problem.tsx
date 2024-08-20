import {
    Autocomplete,
    Box,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    InputBase,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import {
    selectStatus,
} from "../../../../../../../components/common/form-enum";
import { adminConstants } from "../../../../../../../constants/admin";
import {
    commonWidget,
    formBottom,
    formButtonStyle,
    formTitle,
} from "../../../../../../../styles/common";

export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
}

const StyledDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  "& .MuiInputBase-input": {
    padding: "10px !important",
  },
  "& .Mui-focused": {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #00418602 !important`,
    border: `1px solid #004186 !important`,
    borderRadius: "4px !important",
  },
}));

export const medStyle = makeStyles({
  contentContainer: {
    display: "flex",
    justifyContent: "start",
    gap: "15px",
    alignItems: "end",
  },
  activeStyle: {
    background: "#004186",
    fontSize: "5rem",
  },
  hello: {
    background: "yellow",
  },
});

const med = {
  keyStyle: {
    color: "#1A1A1A;",
    marginTop: "24px",
    marginBottom: "12px",
  },
};

export const buttonStyle = makeStyles(() => ({
  buttonActive: {
    fontSize: "16px !important",
    padding: "5px 10px!important",
    border: "1px solid #004186  !important",
    borderRadius: "5px !important",
    background: "#004186 !important",
    marginRight: "10px !important",
    width: "90px",
    height: "40px",
  },
  buttonTypoActive: {
    color: "#FFFFFF !important",
  },
  buttonTypoDeactive: { color: "#1A1A1A99" },
  buttonGrid1: {
    maxHeight: "40px",
    marginTop: "6px !important",
  },

  buttonDeactive: {
    padding: "5px 10px !important",
    border: "1px solid #00000029 !important",
    borderRadius: "5px !important",
    width: "90px",
    height: "40px",
    marginRight: "10px !important",
  },
  timeSlot: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  inputLabel: {
    marginTop: "18px",
  },
}));

interface RenderButtonProps {
  name: string;
  label: string;
  btnActive?: boolean;
}

export const multiSelectDropDown = {
  marginTop: "15px",
  border: "none",
  "& fieldset": { border: "none" },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",

  ".MuiOutlinedInput-root": {
    padding: "0px !important",
    height: "auto !important",
  },
  ".MuiChip-root": {
    height: "28px !important",
  },
};

const problemNames = [
  "Difficulty Breathing",
  "Wheezing",
  "Hoarseness",
  "Watery Eyes",
  "Headache",
  "Runny Nose",
  "Congestion",
];

export const selectType = [
  { label: "Chronic", name: "Chronic" },
  { label: "Acute", name: "Acute" },
];

const useStyles = makeStyles({
    customTextField: {
      "& input::placeholder": {
        fontSize: "14px",
        textAlign :"left",
        alignItems:"center",
      }
    }
  })

function AddProblem(props: DialogProps) {
  const { onClose, open, title } = props;
  const { ADD, CANCEL } = adminConstants;
  const classes = commonWidget();
  const [activeStatus, setActiveStatus] = useState("active");
  const subStyles = buttonStyle();
  const cs = medStyle();
  const classStyle = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [activeType, setActiveType] = useState("Chronic");
  
  const RenderButton: React.FC<
    RenderButtonProps & {
      activeLabel: string;
      setActiveLabel: (label: string) => void;
    }
  > = ({ label, name, activeLabel, setActiveLabel }) => {
    return (
      <ButtonBase
        className={
          activeLabel === label
            ? subStyles.buttonActive
            : subStyles.buttonDeactive
        }
        onClick={() => setActiveLabel(label)}
        focusRipple
      >
        <Typography
          variant="h5"
          className={
            activeLabel === label
              ? subStyles.buttonTypoActive
              : subStyles.buttonTypoDeactive
          }
        >
          {name}
        </Typography>
      </ButtonBase>
    );
  };

  const close = () => {
    onClose();
  };

  const handleInputChange = (value: any) => {
    setInputValue(value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        id="scroll-dialog-title"
        sx={{ background: "#F5F6F9", marginBottom: "15px" }}
      >
        <Typography sx={formTitle}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          //   ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div>
            <Typography
              variant="h5"
              sx={{ color: "#1A1A1A;" }}
            >
              Problem Name
            </Typography>
            <Grid item lg={12} mt={2}>
              <Autocomplete
                sx={multiSelectDropDown}
                id="tags-standard"
                options={problemNames}
                getOptionLabel={(option) => option}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                  classes={{ root: classStyle.customTextField }}
                    {...params}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: false,
                      sx: {
                        fontSize: "0.9rem",
                        textAlign: "center !important",
                      },
                    }}
                    placeholder={inputValue === "" ? "Select Or Search Problem" : ""}
                  />
                )}
              />
            </Grid>
          </div>
          <div className={cs.contentContainer}>
            <div style={{ width: "50%" }}>
              <Typography variant="h5" sx={med.keyStyle}>
                Status
              </Typography>
              <Box>
                <Box className={subStyles.buttonGrid1}>
                  {selectStatus.map((data: any) => {
                    return (
                      <RenderButton
                        key={data.label}
                        label={data.label}
                        name={data.name}
                        activeLabel={activeStatus}
                        setActiveLabel={setActiveStatus}
                      />
                    );
                  })}
                </Box>
              </Box>
            </div>
            <div style={{ width: "50%" }}>
              <Typography variant="h5" sx={med.keyStyle}>
                Type
              </Typography>
              <Box>
                <Box className={subStyles.buttonGrid1}>
                  {selectType.map((data: any) => {
                    return (
                      <RenderButton
                        key={data.label}
                        label={data.label}
                        name={data.name}
                        activeLabel={activeType}
                        setActiveLabel={setActiveType}
                      />
                    );
                  })}
                </Box>
              </Box>
            </div>
          </div>

          <div className={cs.contentContainer}>
            <div style={{ width: "70%" }}>
              <Typography variant="h5" sx={med.keyStyle}>
                Diagnosed Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "12px !important",
                      fontSize: "0.8rem",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={cs.contentContainer}>
            <div style={{ width: "100%" }}>
              <Typography variant="h5" sx={med.keyStyle}>
                Note
              </Typography>
              <InputBase
                fullWidth
                multiline={true}
                rows="3"
                placeholder="Type here"
                classes={{
                  root: classes.providerTextAreaField,
                  input: classes.textFieldInput,
                  focused: classes.textFieldActive,
                }}
              />
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
      >
        <ButtonBase onClick={close} sx={formButtonStyle.cancelButtonStyle}>
          {CANCEL}
        </ButtonBase>
        <ButtonBase sx={formButtonStyle.saveButtonStyle}>{ADD}</ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default AddProblem;

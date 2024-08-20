import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import { style } from "./style/common-style";

interface SendByEmailProps {
  title: string;
  onClose: () => void;
  open: boolean;
}

function SendByEmail(props: SendByEmailProps) {
  const { onClose, open, title } = props;
  const classes = style();
  const close = () => {
    onClose();
  };
  const [provider, SetProvider] = useState("");
  const commonStyle = commonWidget();
  const handleSelectOption = (e: string) => {
    SetProvider(e);
  };
  const providerList = ["Abcd", "wert", "tyuty", "rtwet"];
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
    <div>
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          <Grid className={classes.dialogTitle}>
            <Grid>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={close} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                Provider Name
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={provider}
                name="primaryProvider"
                onChange={(e: any) => handleSelectOption(e)}
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
                          Select
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {providerList.map((data) => {
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
            <Grid item xs={12} mt={2}>
              <Typography variant="h5" className={classes.label}>
                Email ID
              </Typography>
              <InputBase
                id="fax-number"
                type="text"
                name="Email ID"
                placeholder="Enter Email ID"
                classes={{
                  root: classes.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                  error: commonStyle.inputBoxError,
                }}
              />
            </Grid>
          </DialogContentText>
          <Grid className={classes.footer}>
            <Grid className={classes.footerBtn}>
              <ButtonBase sx={formButtonStyle.saveButtonStyle}>Send</ButtonBase>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SendByEmail;

import { Box, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import React from 'react';
import CustomFormLabel from './custom-form-label';
import CloseIcon from "@mui/icons-material/Close";
import { formButtonStyle } from '../../styles/common';

interface UnauthorizedDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

const UnauthorizedDialog: React.FC<UnauthorizedDialogProps> = ({ open, onClose, message }) => {
  return (
        <Box>
            <Dialog
                maxWidth="sm"
                fullWidth={true}
                onClose={onClose}
                open={open}
            >
                <DialogTitle>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography pl={1.5} variant="h4">
                        Unauthorized Access
                    </Typography>
                    <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
                </Box>
                </DialogTitle>
                <DialogContent>
                    <Grid mx={2} pb={3} pt={1}>
                        <Box mb={1.5}>
                            <CustomFormLabel label=""  />
                            <p>{message || 'You do not have permission to access this content.'}</p>
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <ButtonBase
                    sx={formButtonStyle.saveButtonStyle}
                    onClick={onClose}
                >
                    Close
                </ButtonBase>
                </DialogActions>
            </Dialog>
        </Box>
  );
};

export default UnauthorizedDialog;


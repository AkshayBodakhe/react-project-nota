import { ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, InputBase, Typography } from "@mui/material";
import { commonWidget, formButtonStyle, formTitle } from "../../../../../../../../../styles/common";
import { adminConstants } from "../../../../../../../../../constants/admin";

const DialogWidth = {
    ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
        // maxWidth: "700px !important",
    },
    ".css-ypiqx9-MuiDialogContent-root": {
        overflowY: 'none !important',
        paddingTop: '10px !important'
    },
    ".MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root": {
        paddingTop: '10px !important'
    }
};

type Props = {
    open: boolean,
    onClose: any,
    orderName: string,
    setOrderName: any,
    onSave: any
}

const { CANCEL } = adminConstants;

function OrderSetModal(props: Props) {

    const { open, onClose, orderName, setOrderName, onSave } = props;

    const commonStyle = commonWidget();

    return (
        <>
            <Dialog open={open} sx={DialogWidth}>
                <DialogTitle
                    id="scroll-dialog-title"
                    sx={{ background: "#F5F6F9", marginBottom: "15px", }}
                >
                    <Typography sx={formTitle}>{'Save Ad Lab Order Set'}</Typography>
                </DialogTitle>
                <DialogContent>
                    <InputBase
                        fullWidth
                        placeholder="Please specify order set name"
                        value={orderName}
                        onChange={(e) => { setOrderName(e.target.value) }}
                        sx={{ width: '30rem' }}
                        classes={{
                            root: commonStyle.textFieldFullWidth,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonBase onClick={onClose} sx={{ ...formButtonStyle.cancelButtonStyle, width: '6rem' }}>
                        {CANCEL}
                    </ButtonBase>
                    <ButtonBase sx={{ ...formButtonStyle.saveButtonStyle, width: '6rem' }} onClick={onSave} >{'Save'}</ButtonBase>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default OrderSetModal;
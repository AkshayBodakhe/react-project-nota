import {
    ButtonBase,
    Grid,
    Typography
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { backIcon, backToText } from "../../../../styles/auth-form";
import { formButtonStyle } from "../../../../styles/common";

export const TitleComponent = ({ name, handleBack }: any) => {
    return (
        <Grid container sx={formButtonStyle.drawerTitleContainer} xs={12}>
            <Grid item>
                <Typography variant="h2">
                    {name}
                </Typography>
            </Grid>
            <Grid item onClick={handleBack}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <ArrowBackIosIcon sx={backIcon} />
                    <Typography sx={backToText}>
                        Back
                    </Typography></Grid>
            </Grid>
        </Grid>
    );
}
export const DrawerButton = ({ handleBack, handleSubmit }: any) => {
    return (
        <Grid sx={formButtonStyle.drawerButtonContainer}>
            <ButtonBase
                onClick={handleBack}
                sx={formButtonStyle.cancelButtonStyle}
            >
                Cancel
            </ButtonBase>
            <ButtonBase
                type="submit"
                onClick={handleSubmit}
                sx={formButtonStyle.saveButtonStyle}
            >
                Save
            </ButtonBase>
        </Grid>
    );
}

import { Box, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
    backIcon,
    backToParent,
    backToText,
} from "../../../../../../styles/auth-form";

function ReviewAndPhysicalDetails() {

    const details: any = useLocation()?.state ? useLocation()?.state : null;

    const navigate = useNavigate();

    return (
        <>
            <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
                xs={12}
            >
                <Grid item>
                    <Typography variant="h2" sx={{ mt: 1, mb: 1 }}>
                        {details?.data?.type || '-'}
                    </Typography>
                </Grid>
                <Box sx={backToParent} onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={backIcon} />
                    <Typography sx={backToText}>
                        Back
                    </Typography>
                </Box>
            </Grid>
        </>
    );
}

export default ReviewAndPhysicalDetails;

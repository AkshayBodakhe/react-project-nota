import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { providerConstants } from "../../../../../../constants/provider";
import TotalPaymentRecevable from "../patient/tables/total-payment";
import { backIcon, backToParent, backToText } from "../../../../../../styles/auth-form";
import DetailsTable from "./details-table";
import { AccountsType } from "../../../common-files/enums";

const {
    PATIENT_LISTING,
    INSURANCE_LISTING
} = providerConstants;

const patientCols: any[] = [
    { id: "patientId", label: "Patient ID", minWidth: 120, displaySort: true },
    { id: "patientName", label: "Patient Name", minWidth: 120, displaySort: true },
    { id: "30days", label: "0-30 Days", minWidth: 120, displaySort: true },
    { id: "60days", label: "31-60 Days", minWidth: 120, displaySort: true },
    { id: "90days", label: "61-90 Days", minWidth: 120, displaySort: true },
    { id: "120days", label: "91-120 Days", minWidth: 120, displaySort: true },
    { id: "plusdays", label: "120+ Days", minWidth: 120, displaySort: false },
    { id: "total", label: "Total", minWidth: 120, displaySort: false }
];

const insuranceCols: any[] = [
    { id: "payerId", label: "Payer ID", minWidth: 120, displaySort: false },
    { id: "payerName", label: "Payer Name", minWidth: 120, displaySort: true },
    { id: "30days", label: "0-30 Days", minWidth: 120, displaySort: true },
    { id: "60days", label: "31-60 Days", minWidth: 120, displaySort: true },
    { id: "90days", label: "61-90 Days", minWidth: 120, displaySort: true },
    { id: "120days", label: "91-120 Days", minWidth: 120, displaySort: true },
    { id: "plusdays", label: "120+ Days", minWidth: 120, displaySort: false },
    { id: "total", label: "Total", minWidth: 120, displaySort: false },
];

function Listing() {

    const data = useLocation().state?.col ? useLocation().state.col : [];
    const type = useLocation().state?.type ? useLocation().state.type : null;
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h3">
                        {type === AccountsType.Patient ? PATIENT_LISTING : INSURANCE_LISTING}
                    </Typography>
                    <Box sx={backToParent}>
                        <ArrowBackIosIcon sx={backIcon} />
                        <Typography onClick={() => navigate(-1)} sx={backToText}>
                            Back
                        </Typography>
                    </Box>
                </Box>
                <TotalPaymentRecevable columns={type === AccountsType.Patient ? patientCols : insuranceCols} data={[data]} />
                <DetailsTable type={type} />
            </Box>
        </>
    );
}

export default Listing;
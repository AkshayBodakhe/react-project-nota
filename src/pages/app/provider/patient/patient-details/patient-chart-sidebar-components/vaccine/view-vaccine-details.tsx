import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import {
  calculateDOB,
  transformText,
} from "../../../../../../../components/common/helper";

interface VaccinceProps {
  open: boolean;
  vaccine: any;
  onClose: () => void;
}

function ViewVaccineDetails(props: VaccinceProps) {
  const { open, vaccine, onClose } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{ boxShadow: "0px 0px 8px #00000029" }}
      >
        <DialogTitle>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                View Vaccine
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase onClick={onClose}>
                <CloseIcon sx={{ fontSize: "20px" }} />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Vaccine Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.vaccineName || "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Dosages</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">{vaccine?.dose || "-"}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Route</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.route ? transformText(vaccine?.route) : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Site</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.site ? transformText(vaccine?.site) : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Administered Date</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.administerDate
                    ? moment(vaccine?.administerDate).format("MM-DD-YYYY")
                    : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Expiry Date</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.expiryDate
                    ? moment(vaccine?.expiryDate).format("MM-DD-YYYY")
                    : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Units</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.units ? transformText(vaccine?.units) : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">Manufacturer</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.manufacturer
                    ? transformText(vaccine?.manufacturer)
                    : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                <Typography variant="h4">NDC Code</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.ndcCode ? transformText(vaccine?.ndcCode) : "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                {" "}
                <Typography variant="h4">Age</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {calculateDOB(vaccine?.dob) || "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                {" "}
                <Typography variant="h4"> Ordered By</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {`${vaccine?.orderedBy?.firstName} ${vaccine?.orderedBy?.lastName}` ||
                    "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                {" "}
                <Typography variant="h4"> Administered By</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {`${vaccine?.administeredBy?.firstName} ${vaccine?.administeredBy?.lastName}` ||
                    "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
              <Grid item xs={4}>
                {" "}
                <Typography variant="h4">Note</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {vaccine?.note ? transformText(vaccine?.note) : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default ViewVaccineDetails;

import React, { useEffect, useState } from "react";
import axiosInstance, {
  API_BASE_URL,
} from "../../../../../../../interceptor/interceptor";
import { ButtonBase, Dialog, DialogActions } from "@mui/material";
import { Close } from "@mui/icons-material";
import Loading from "../../../../../../../components/common/spinner/loading";
import { formButtonStyle } from "../../../../../../../styles/common";
import { isNavalaCare } from "../../../../../../../components/common/helper";
import Loader from "../../../../../../../components/common/spinner/loader";

interface PrintPdf {
  open: boolean;
  onClose: () => void;
  uuid: string;
}

function PrintPdf(props: PrintPdf) {
  const { open, onClose, uuid: patientUuid } = props;
  const [pdfUrl, setPdfUrl] = useState("");
  const [showLoading, setshowLoading] = useState(true);
  const urlforprint = !isNavalaCare()
    ? `${API_BASE_URL}/api/master/patient/print/${patientUuid}`
    : `${API_BASE_URL}/api/master/care-patient-chart/print/${patientUuid}`;
  const openPdf = async () => {
    setshowLoading(true);
    try {
      const response = await axiosInstance.get(urlforprint, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    } finally {
      setshowLoading(false);
    }
  };

  const handleClose = () => {
    setshowLoading(false);
    URL.revokeObjectURL(pdfUrl);
    setPdfUrl("");
  };
  useEffect(() => {
    if (open) {
      openPdf();
    }
  }, [open]);

  return (
    <>
      {" "}
      {showLoading ? (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
          <Loader isLoading={true} />
        </Dialog>
      ) : (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "10000px" }}
            frameBorder="0"
          ></iframe>

          <DialogActions>
            <ButtonBase
              onClick={() => {
                onClose();
                handleClose();
              }}
              sx={formButtonStyle.cancelButtonStyle}
            >
              Cancel
            </ButtonBase>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
export default PrintPdf;

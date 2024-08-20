import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-formio";

interface viewIntakeProps {
  open: boolean;
  onClose: any;
  rowData?: any;
}

const ViewIntakeForm = (props: viewIntakeProps) => {
  const { open, onClose, rowData } = props;
  const [previewJson, setPreviewJson] = useState<any>();

  useEffect(() => {
    if (rowData) {
      const stringifiyJson=JSON.stringify(rowData?.content?.components)
      const convertedJson = JSON.parse(stringifiyJson);

      const createForm = {
        display: "form",
        components: convertedJson,
      };
      setPreviewJson(createForm);
    }
  }, [rowData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            background: "#F5F6F9",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">{"Intake Plan"}</Typography>
          <Close sx={{ cursor: "pointer" }} onClick={onClose} />
        </DialogTitle>
        <DialogContent>
          <Form form={previewJson} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewIntakeForm;

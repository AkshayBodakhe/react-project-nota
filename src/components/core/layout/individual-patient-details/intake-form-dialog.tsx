// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";

// import {
//   Dialog,
//   DialogContent,
//   Grid,
//   Typography,
//   ButtonBase,
// } from "@mui/material";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// interface IntakeFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onEventSuccessModalOpen: () => void;
// }

// export const IntakeFormDialog: React.FC<IntakeFormDialogProps> = ({
//   open,
//   onClose,
//   onEventSuccessModalOpen,
// }) => {
//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//         <DialogContent sx={{ overflowY: "hidden" }}>
//           <Grid container>
//             <Grid item xs={11}>
//               <Typography
//                 variant="h1"
//                 sx={{ color: "#1A1A1A", fontWeight: "bold" }}
//               >
//                 Intake Form
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               xs={1}
//               sx={{ display: "flex", justifyContent: "flex-end" }}
//             >
//               {" "}
//               <ButtonBase onClick={onClose}>
//                 <CloseOutlinedIcon />
//               </ButtonBase>
//             </Grid>
//           </Grid>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default IntakeFormDialog;

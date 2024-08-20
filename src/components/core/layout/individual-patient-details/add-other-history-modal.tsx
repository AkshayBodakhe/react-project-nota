// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import { ButtonBase, Grid, InputBase, Modal, Typography } from "@mui/material";
// import { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import CustomFormLabel from "../../common/custom-form-label";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import { commonWidget } from "../../../styles/common";

// export const addotherhistoryStyles = makeStyles(() => {
//   return {
//     modal: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     addbutton: {
//       height: "35px",
//       width: "90px",
//       backgroundColor: "#004186 !important",
//       borderRadius: "5px !important",
//       padding: "20px !important",
//     },
//     addtypo: {
//       color: "#FFFFFF",
//       fontWeight: "bold  !important ",
//     },
//     buttonGrid: {
//       display: "flex",
//       justifyContent: "flex-end",
//       marginTop: "50px",
//     },
//     note: {
//       alignItems: "baseline !important",
//       paddingLeft: "5px !important",
//       boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//       minHeight: "10vh",
//       width: "100% !important",
//     },
//     heading: {
//       color: "#1A1A1A !important",
//       fontWeight: "bold !important",
//     },
//     closebutton: {
//       display: "flex",
//       justifyContent: "flex-end",
//     },
//   };
// });

// interface AddOtherHistoryModalProps {
//   open: boolean;
//   onClose: () => void;
//   onEventSuccessModalOpen: () => void;
// }

// export const AddOtherHistoryModal: React.FC<AddOtherHistoryModalProps> = ({
//   open,
//   onClose,
//   onEventSuccessModalOpen,
// }) => {
//   const classes = addotherhistoryStyles();
//   const commonclasses = commonWidget();
//   const [otherhistory, setOtherHistory] = useState({
//     historyname: "",
//     note: "",
//   });

//   const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setOtherHistory((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = () => {
//     onEventSuccessModalOpen();
//   };

//   return (
//     <>
//       <Modal open={open} onClose={onClose} className={classes.modal}>
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 700,
//             backgroundColor: "#fff",
//             paddingLeft: 20,
//             paddingRight: 20,
//             paddingTop: 8,
//             borderRadius: 5,
//           }}
//         >
//           <Grid item xs={12}>
//             <Grid container mt={2} mb={1}>
//               <Grid item xs={11}>
//                 <Typography variant="h1" className={classes.heading}>
//                   Add Other History
//                 </Typography>
//               </Grid>
//               <Grid item xs={1} className={classes.closebutton}>
//                 <ButtonBase onClick={onClose}>
//                   <CloseOutlinedIcon />
//                 </ButtonBase>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid container pt={2}>
//             <CustomFormLabel label="History Name" />
//             <InputBase
//               name="historyname"
//               value={otherhistory.historyname}
//               fullWidth
//               placeholder="Enter History Name"
//               classes={{
//                 root: commonclasses.textFieldRoot,
//                 input: commonclasses.textFieldInput,
//                 focused: commonclasses.textFieldActive,
//               }}
//               onChange={(e: any) => inputData(e)}
//             />
//           </Grid>

//           <Grid container pt={2}>
//             <CustomFormLabel label="Note" />
//             <InputBase
//               fullWidth
//               name="note"
//               value={otherhistory.note}
//               placeholder="Type Here"
//               className={classes.note}
//               onChange={(e: any) => inputData(e)}
//             />
//           </Grid>
//           <Grid item xs={12} mb={5} mt={4} className={classes.buttonGrid}>
//             <ButtonBase className={classes.addbutton} onClick={handleSubmit}>
//               <Typography variant="h4" className={classes.addtypo}>
//                 Add
//               </Typography>
//             </ButtonBase>
//           </Grid>
//         </div>
//       </Modal>
//     </>
//   );
// };

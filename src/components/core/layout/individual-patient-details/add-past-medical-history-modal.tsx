// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import { ButtonBase, Grid, InputBase, Modal, Typography } from "@mui/material";
// import { useState } from "react";
// import { makeStyles, styled } from "@mui/styles";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import CustomFormLabel from "../../common/custom-form-label";
// // import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// // import { commonWidget } from "../../../styles/common";
// export const addpastmedicalStyles = makeStyles(() => {
//   return {
//     modal: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     addpmhbutton: {
//       height: "35px",
//       width: "130px",
//       backgroundColor: "#004186 !important",
//       borderRadius: "5px !important",
//       padding: "20px !important",
//     },
//     addpmhtypo: {
//       color: "#FFFFFF",
//       fontWeight: "bold  !important",
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

// interface AddPastMedicalHistoryModalProps {
//   open: boolean;
//   onClose: () => void;
//   onEventSuccessModalOpen: () => void;
//   title: string;
// }

// export const AddPastMedicalHistoryModal: React.FC<
//   AddPastMedicalHistoryModalProps
// > = ({ open, onClose, onEventSuccessModalOpen, title }) => {
//   const classes = addpastmedicalStyles();
//   // const commonclasses = commonWidget();
//   const [pastmedicalhistory, setPastMedicalHistory] = useState({
//     conditionname: "",
//     date: "",
//     note: "",
//   });

//   const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setPastMedicalHistory((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = () => {
//     onEventSuccessModalOpen();
//     setPastMedicalHistory({ conditionname: "", date: "", note: "" });
//   };
//   const StyledDatePicker = styled(DatePicker)(() => ({
//     "& .MuiInputBase-root": {
//       borderRadius: "5px",
//       border: "none",
//       "& fieldset": { border: "none" },
//       boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//       textAlign: "center",
//     },
//     "& .MuiInputBase-input": {
//       padding: "10px !important",
//     },
//     "& .Mui-focused": {
//       background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
//       boxShadow: `0px 0px 6px #00418602 !important`,
//       border: `1px solid #004186 !important`,
//       borderRadius: "4px !important",
//     },
//   }));

//   return (
//     <>
//       <Modal open={open} onClose={onClose} className={classes.modal}>
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500,
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
//                   {title} Past Medical History
//                 </Typography>
//               </Grid>
//               <Grid item xs={1} className={classes.closebutton}>
//                 <ButtonBase onClick={onClose}>
//                   {/* <CloseOutlinedIcon /> */}
//                 </ButtonBase>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid container pt={2}>
//             <CustomFormLabel label="Condition Name" />
//             <InputBase
//               value={pastmedicalhistory.conditionname}
//               name="conditionname"
//               fullWidth
//               placeholder="Enter Condition Name"
//               classes={{
//                 root: commonclasses.textFieldRoot,
//                 input: commonclasses.textFieldInput,
//                 focused: commonclasses.textFieldActive,
//               }}
//               onChange={(e: any) => inputData(e)}
//             />
//           </Grid>
//           <Grid container pt={2}>
//             <Grid container>
//               <CustomFormLabel label="Date" />
//             </Grid>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <StyledDatePicker
//                 sx={{
//                   "& .MuiInputBase-input": {
//                     padding: "12px !important",
//                     fontSize: "0.8rem",
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid container pt={2}>
//             <CustomFormLabel label="Note" />
//             <InputBase
//               fullWidth
//               name="note"
//               value={pastmedicalhistory.note}
//               placeholder="Type Here"
//               className={classes.note}
//               onChange={(e: any) => inputData(e)}
//             />
//           </Grid>
//           <Grid item xs={12} mb={5} mt={4} className={classes.buttonGrid}>
//             <ButtonBase className={classes.addpmhbutton} onClick={handleSubmit}>
//               <Typography variant="h4" className={classes.addpmhtypo}>
//                 Save PMH
//               </Typography>
//             </ButtonBase>
//           </Grid>
//         </div>
//       </Modal>
//     </>
//   );
// };

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import {
//   ButtonBase,
//   Grid,
//   InputBase,
//   MenuItem,
//   Modal,
//   Select,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import CustomFormLabel from "../../common/custom-form-label";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import { commonWidget } from "../../../styles/common";

// export const addfamilyhistoryStyles = makeStyles(() => {
//   return {
//     modal: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     addbutton: {
//       height: "35px",
//       width: "130px",
//       backgroundColor: "#004186 !important",
//       borderRadius: "5px !important",
//       padding: "20px !important",
//     },
//     addtypo: {
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
//     renderoption: {
//       maxHeight: "40px",
//       marginTop: "6px !important",
//     },
//     buttonActive: {
//       fontSize: "16px !important",
//       padding: "5px 10px!important",
//       border: "1px solid #004186  !important",
//       borderRadius: "5px !important",
//       background: "#004186 !important",
//       marginRight: "10px !important",
//       width: "90px",
//       height: "40px",
//     },
//     buttonTypoActive: {
//       color: "#FFFFFF !important",
//       fontWeight: "bold !important",
//     },
//     buttonDeactive: {
//       padding: "5px 10px !important",
//       border: "1px solid #00000029 !important",
//       borderRadius: "5px !important",
//       width: "90px",
//       height: "40px",
//       marginRight: "10px !important",
//     },
//     buttonTypoDeactive: { color: "#1A1A1A99" },
//   };
// });

// export const selectInputStyle = {
//   ".MuiOutlinedInput-notchedOutline": { border: 0 },
//   boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//   height: "42px !important",
//   width: "100%",
// };

// export const diedOption = [
//   { label: "Yes", name: "Yes" },
//   { label: "No", name: "No" },
// ];

// interface RenderButtonProps {
//   name: string;
//   label: string;
//   btnActive?: boolean;
// }

// interface AddFamilyHistoryModalProps {
//   open: boolean;
//   onClose: () => void;
//   onEventSuccessModalOpen: () => void;
//   title: string;
// }

// export const AddFamilyHistoryModal: React.FC<AddFamilyHistoryModalProps> = ({
//   open,
//   onClose,
//   onEventSuccessModalOpen,
//   title
// }) => {
//   const classes = addfamilyhistoryStyles();
//   const commonclasses = commonWidget();
//   const [yesType, setYesType] = useState("Yes");
//   const problemNames = [
//     "Difficulty Breathing",
//     "Wheezing",
//     "Hoarseness",
//     "Watery Eyes",
//     "Headache",
//     "Runny Nose",
//     "Congestion",
//   ];
//   const relativeList = ["Father", "Mother", "GrandMother", "Uncle"];
//   const [familyhistory, setFamilyHistory] = useState({
//     problemname: "",
//     relative: "",
//     onsetage: "",
//     died: "",
//     note: "",
//   });

//   const ITEM_HEIGHT = 25;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 50,
//       },
//     },
//   };
//   const handleSelectOption = (e: any) => {
//     const { value, name } = e.target;
//     setFamilyHistory((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setFamilyHistory((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = () => {
//     onEventSuccessModalOpen();
//     setFamilyHistory({
//       problemname: "",
//       relative: "",
//       onsetage: "",
//       died: "",
//       note: "",
//     });
//   };

//   const RenderButton: React.FC<
//     RenderButtonProps & {
//       yesLabel: string;
//       setYesLabel: (label: string) => void;
//     }
//   > = ({ label, name, yesLabel, setYesLabel }) => {
//     return (
//       <ButtonBase
//         className={
//           yesLabel === label ? classes.buttonActive : classes.buttonDeactive
//         }
//         onClick={() => setYesLabel(label)}
//         focusRipple
//       >
//         <Typography
//           variant="h5"
//           className={
//             yesLabel === label
//               ? classes.buttonTypoActive
//               : classes.buttonTypoDeactive
//           }
//         >
//           {name}
//         </Typography>
//       </ButtonBase>
//     );
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
//             width: 800,
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
//                   {title} Family History
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
//             <CustomFormLabel label="Problem Name" />
//             <Select
//               sx={selectInputStyle}
//               value={familyhistory.problemname}
//               name="problemname"
//               onChange={(e: any) => handleSelectOption(e)}
//               renderValue={(selected) => {
//                 if (!selected) {
//                   return (
//                     <span>
//                       <Typography
//                         variant="h5"
//                         sx={{
//                           color: "#1A1A1A80",
//                         }}
//                       >
//                         Select or Search Problem
//                       </Typography>
//                     </span>
//                   );
//                 }
//                 return <Typography variant="h5">{selected}</Typography>;
//               }}
//               MenuProps={MenuProps}
//               displayEmpty
//             >
//               {problemNames.map((data) => {
//                 return (
//                   <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
//                     {data}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </Grid>
//           <Grid container pt={2} spacing={4}>
//             <Grid item xs={6}>
//               <CustomFormLabel label="Relative" />
//               <Select
//                 sx={selectInputStyle}
//                 value={familyhistory.relative}
//                 name="relative"
//                 onChange={(e: any) => handleSelectOption(e)}
//                 renderValue={(selected) => {
//                   if (!selected) {
//                     return (
//                       <span>
//                         <Typography
//                           variant="h5"
//                           sx={{
//                             color: "#1A1A1A80",
//                           }}
//                         >
//                           Select Relative
//                         </Typography>
//                       </span>
//                     );
//                   }
//                   return <Typography variant="h5">{selected}</Typography>;
//                 }}
//                 MenuProps={MenuProps}
//                 displayEmpty
//               >
//                 {relativeList.map((data) => {
//                   return (
//                     <MenuItem value={data} sx={{ color: "#1A1A1A7F" }}>
//                       {data}
//                     </MenuItem>
//                   );
//                 })}
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <CustomFormLabel label="Onset Age" />
//               <InputBase
//                 name="onsetage"
//                 value={familyhistory.onsetage}
//                 fullWidth
//                 placeholder="Onset Age"
//                 classes={{
//                   root: commonclasses.textFieldRoot,
//                   input: commonclasses.textFieldInput,
//                   focused: commonclasses.textFieldActive,
//                 }}
//                 onChange={(e: any) => inputData(e)}
//               />
//             </Grid>
//           </Grid>

//           <Grid container pt={2}>
//             <CustomFormLabel label="Died" />
//             <Grid container className={classes.renderoption}>
//               {diedOption.map((data: any) => {
//                 return (
//                   <RenderButton
//                     key={data.label}
//                     label={data.label}
//                     name={data.name}
//                     yesLabel={yesType}
//                     setYesLabel={setYesType}
//                   />
//                 );
//               })}
//             </Grid>
//           </Grid>
//           <Grid container pt={2}>
//             <CustomFormLabel label="Note" />
//             <InputBase
//               fullWidth
//               name="note"
//               value={familyhistory.note}
//               placeholder="Type Here"
//               className={classes.note}
//               onChange={(e: any) => inputData(e)}
//             />
//           </Grid>
//           <Grid item xs={12} mb={5} mt={4} className={classes.buttonGrid}>
//             <ButtonBase className={classes.addbutton} onClick={handleSubmit}>
//               <Typography variant="h4" className={classes.addtypo}>
//                 Save FH
//               </Typography>
//             </ButtonBase>
//           </Grid>
//         </div>
//       </Modal>
//     </>
//   );
// };

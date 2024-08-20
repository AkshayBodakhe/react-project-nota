// import { Close } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";

// export const genStyle = makeStyles({
//   verticalBorder: {
//     borderRightStyle: "dashed",
//     borderColor: "#0000001c",
//     borderRightWidth: " 2px",
//   },
//   horizontalBorderTop: {
//     borderBottomStyle: "dashed",
//     borderColor: "#0000001c",
//     borderBottomWidth: " 2px",
//     marginTop: "16px",
//   },
//   rowStyle: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr 1fr",
//     background: "#1A1A1A0D",
//     borderRadius: "5px",
//     padding: "5px 0px",
//   },
//   rowContent: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   subHeading: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "10px",
//   },
//   subContent: {
//     display: "flex",
//     justifyContent: "start",
//     gap: "3px",
//     margin: "8px 0",
//   },
//   content: {
//     padding: "7px 30px",
//     border: "1px solid #1A1A1A4D",
//     borderRadius: "10px",
//     cursor: "pointer",
//     margin: "12px 28px",
//   },
//   tableData: {
//     paddingRight: "35px",
//     borderBottomStyle: "dashed",
//     borderColor: "#0000001c",
//     borderBottomWidth: " 2px",
//     margin: "16px 0px",
//   },
// });

// const sxs = {
//   headerContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   colorWeight: {
//     color: "#1A1A1A",
//     fontWeight: "600",
//   },
//   headingContainer: {
//     display: "grid",
//     gridTemplateColumns: "320px 1fr 1fr 1fr 1fr",
//   },
//   headingContent: {
//     padding: "10px",
//     color: "#1A1A1A",
//     fontWeight: "600",
//     display: "flex",
//     justifyContent: "center",
//   },
//   contentKey: {
//     display: "grid",
//     gridTemplateColumns: "320px 1fr",
//   },

//   points: {
//     padding: "6px 27px",
//     border: "1px solid #004186",
//     borderRadius: "5px",
//     background: "#CCECFF",
//     color: "#004186",
//     fontWeight: "600",
//   },
//   subContentKey: {
//     color: "#004186",
//     fontWeight: "600",
//   },
//   btnStyle: {
//     textTransform: "initial",
//     padding: "8px 10px",
//     fontWeight: "600",
//     "&:hover": {
//       backgroundColor: "#004186",
//     },
//   },
//   selectedNumber: {
//     background: "#CCECFF",
//     border: "1px solid #004186",
//     color: "#004186",
//     fontWeight: "600",
//   },
// };

// interface DataItem {
//   id: number;
//   name: string;
//   value1: string;
//   value2: string;
//   value3: string;
//   value4: string;
// }

// const data: DataItem[] = [
//   {
//     id: 1,
//     name: "1. Feeling nervous, anxious or on edge",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
//   {
//     id: 2,
//     name: "2. anxious or on edge",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
//   {
//     id: 3,
//     name: "3. Worrying too much about different things",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
//   {
//     id: 4,
//     name: "4. Trouble relaxing",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
//   {
//     id: 5,
//     name: "5. Being so restless that it is hard to sit stil",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
//   {
//     id: 6,
//     name: "6. Becoming easily annoyed or irritable",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
//   {
//     id: 7,
//     name: "7. Feeling afraid as if something awful might happen",
//     value1: "0",
//     value2: "1",
//     value3: "2",
//     value4: "3",
//   },
// ];

// interface AddEditPsychologicalProps {
//   source?: string;
//   open: boolean;
//   setOpen?: any;
//   scroll?: string;
//   onSave?: any;
// }

// export default function AddEditPsychological(props: AddEditPsychologicalProps) {
//   const { open, setOpen, scroll, onSave } = props;
//   const descriptionElementRef = React.useRef<HTMLElement>(null);
//   const classes = genStyle();
//   const [selectedValues, setSelectedValues] = useState<{
//     [key: number]: string | null;
//   }>({});
//   const [sum, setSum] = useState<number>(0);

//   const handleValueClick = (rowId: number, value: string) => {
//     setSelectedValues((prevSelectedValues) => ({
//       ...prevSelectedValues,
//       [rowId]: value,
//     }));
//   };

//   React.useEffect(() => {
//     let newSum = 0;
//     for (const rowId in selectedValues) {
//       if (selectedValues[rowId] !== null) {
//         newSum += parseInt(selectedValues[rowId]!);
//       }
//     }
//     setSum(newSum);
//   }, [selectedValues]);

//   React.useEffect(() => {
//     if (props.open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   const cellStyle = (rowId: number, value: string): React.CSSProperties => {
//     return {
//       padding: "7px 30px",
//       border:
//         selectedValues[rowId] === value
//           ? "1px solid #004186"
//           : "1px solid #1A1A1A66",
//       borderRadius: "10px",
//       cursor: "pointer",
//       margin: "2px 28px",
//       fontWeight: "600",
//       background: selectedValues[rowId] === value ? "#CCECFF" : "white",
//       color: selectedValues[rowId] === value ? "#004186" : "#1A1A1A66",
//     };
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSave = () => {
//     onSave(true);
//   };

//   return (
//     <>
//       <Dialog
//         open={props.open}
//         onClose={handleClose}
//         scroll={"paper"}
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle id="scroll-dialog-title" sx={sxs.headerContainer}>
//           <Typography variant="h2" sx={sxs.colorWeight}>
//             {"Generalized Anxiety Disorder 7-Item (GAD-7)"}
//           </Typography>
//           <div>
//             <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
//           </div>
//         </DialogTitle>
//         <DialogContent dividers={scroll === "paper"}>
//           <DialogContentText
//             id="scroll-dialog-description"
//             ref={descriptionElementRef}
//             tabIndex={-1}
//           >
//             <div>
//               <Box sx={sxs.headingContainer}>
//                 <div className={classes.verticalBorder}>
//                   <Typography sx={sxs.headingContent}>
//                     Over the last 2 weeks, how often have you been bothered by
//                     the following problems?
//                   </Typography>
//                 </div>
//                 <div className={classes.verticalBorder}>
//                   <Typography sx={sxs.headingContent}>Not at all</Typography>
//                 </div>
//                 <div className={classes.verticalBorder}>
//                   <Typography sx={sxs.headingContent}>Several days</Typography>
//                 </div>
//                 <div className={classes.verticalBorder}>
//                   <Typography sx={sxs.headingContent}>
//                     More than half the days
//                   </Typography>
//                 </div>
//                 <div>
//                   <Typography sx={sxs.headingContent}>
//                     Nearly every day
//                   </Typography>
//                 </div>
//               </Box>
//               <div className={classes.horizontalBorderTop} />
//               <div>
//                 <table>
//                   <tbody>
//                     {data.map((item) => (
//                       <tr key={item.id}>
//                         <td className={classes.tableData}>
//                           {" "}
//                           <div>{item.name}</div>
//                         </td>
//                         {Object.keys(item).map((key, index) => {
//                           if (key.startsWith("value")) {
//                             const value = item[key];
//                             return (
//                               <td
//                                 style={{
//                                   borderBottomStyle: "dashed",
//                                   borderColor: "#0000001c",
//                                   borderBottomWidth: " 2px",
//                                   margin: "16px 0px",
//                                 }}
//                                 key={key}
//                                 onClick={() => handleValueClick(item.id, value)}
//                               >
//                                 <div
//                                   style={{
//                                     margin: "10px -2px",
//                                     background: "rgba(26, 26, 26, 0.05)",
//                                     padding: "5px 5px",
//                                   }}
//                                 >
//                                   <div style={cellStyle(item.id, value)}>
//                                     +{value}
//                                   </div>
//                                 </div>
//                               </td>
//                             );
//                           }
//                           return null;
//                         })}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className={classes.subHeading}>
//                 <Typography variant="h5" sx={sxs.colorWeight}>
//                   GAD-7 score obtained by adding score for each question (total
//                   points)
//                 </Typography>
//                 <Typography variant="h2" sx={sxs.points}>
//                   {sum} Points
//                 </Typography>
//               </div>

//               <div>
//                 <div className={classes.subContent}>
//                   <Typography sx={sxs.subContentKey} variant="h4">
//                     Score 0-4:
//                   </Typography>
//                   <Typography variant="h4"> Minimal Anxiety</Typography>
//                 </div>
//                 <div className={classes.subContent}>
//                   <Typography sx={sxs.subContentKey} variant="h4">
//                     Score 5-9:
//                   </Typography>
//                   <Typography variant="h4"> Mild Anxiety</Typography>
//                 </div>
//                 <div className={classes.subContent}>
//                   <Typography sx={sxs.subContentKey} variant="h4">
//                     Score 10-14:
//                   </Typography>
//                   <Typography variant="h4"> Moderate Anxiety</Typography>
//                 </div>
//                 <div className={classes.subContent}>
//                   <Typography sx={sxs.subContentKey} variant="h4">
//                     Score greater than 15:
//                   </Typography>
//                   <Typography variant="h4"> Severe Anxiety</Typography>
//                 </div>
//               </div>
//             </div>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <div style={{ float: "right" }}>
//             <Button variant="contained" sx={sxs.btnStyle} onClick={handleSave}>
//               Save
//             </Button>
//           </div>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

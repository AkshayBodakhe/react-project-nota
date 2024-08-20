// // ChatComponent.js
// import React, { ChangeEvent, useState } from 'react';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import Link from '@mui/material/Link';
// import Tooltip from '@mui/material/Tooltip';
// import LinearProgress from '@mui/material/LinearProgress';
// import Alert from '@mui/material/Alert';
// import InputBase from '@mui/material/InputBase';
// import InputAdornment from '@mui/material/InputAdornment';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import SendIcon from '@mui/icons-material/Send';
// import ClearIcon from '@mui/icons-material/Clear';
// import DownloadIcon from '@mui/icons-material/Download';
// import theme from '../../../shared/theme';
// import { Box, useMediaQuery } from '@mui/material';

// const ChatComponent = ({
//   participants,
//   chatHistory,
//   currentUser,
//   getUserName,
//   getTimeOfMessageSent,
//   chatClient,
//   handleDownloadFile,
// }) => {
//   const [isChatStarted, setIsChatStarted] = useState(false);
//   const [newMessageReceived, setNewMessageReceived] = useState(false);
//   const belowLg1 = useMediaQuery(theme.breakpoints.down("lg"));
//   const belowMd = useMediaQuery(theme.breakpoints.down("md"));
//   const [progressOfFileUpload, setProgressOfFileUpload] = useState(0);
//   const [isFileSentOrDownloaded, setIsFileSentOrDownloaded] = useState("");
//   const [isFileSizeMoreThan50MB, setIsFileSizeMoreThan50MB] = useState(false);
//   const [typedMessage, setTypedMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>();


//     const isCurrentUser = (userId: number) => {
//         if (!userId) return false;
//         return participants?.length !== 1 && userId === currentUser?.userId;
//       };
    
//       const handleChat = () => {
//         setIsChatStarted((prev) => !prev);
//         setNewMessageReceived(false);
//       };
    
//       const handleSendMessage = async () => {
//         if (!typedMessage) {
//           return;
//         }
    
//         await chatClient?.sendToAll(typedMessage);
//         setTypedMessage("");
//       };
    
//       const handleAttachFile = () => {
//         document.getElementById("fileInput")?.click();
//       };

//       const handleInputFile = async (event: ChangeEvent<HTMLInputElement>) => {
//         setIsFileSizeMoreThan50MB(false);
    
//         const file = (event.target.files && event.target.files[0]) || null;
    
//         if (file?.size && file.size > 52428800) {
//           setIsFileSizeMoreThan50MB(true);
//           return;
//         }
    
//         if (file) {
//           setSelectedFile(file);
//         }
//       };
    
//       const handleSendSelectedFile = async () => {
//         if (!selectedFile) {
//           return;
//         }
//         await chatClient?.sendFile(selectedFile, 0);
//         setSelectedFile(null);
//         setTypedMessage("");
//       };
    
//       const handleRemoveSelectedFile = () => {
//         setSelectedFile(null);
//         setTypedMessage("");
//       };
    
      
//   return (
//     <Grid
//       width={'20%'}
//       height={'100%'}
//       bgcolor={theme.palette.common.white}
//       sx={{ transition: '', borderRadius: '16px' }}
//     >
//       <Grid container flexDirection={'column'} item height={'100%'}>
//         <Grid
//           container
//           justifyContent={'space-between'}
//           mt={4.5}
//           p={1.5}
//           alignItems={'center'}
//         >
//           <Grid item>
//             <Typography variant="subtitle1">{'In-call messages'}</Typography>
//           </Grid>
//           <Grid>
//             <IconButton onClick={() => handleChat()}>
//               <CloseOutlinedIcon />
//             </IconButton>
//           </Grid>
//         </Grid>
//         <Grid bgcolor={theme.palette.grey[200]} p={1.5} m={1} borderRadius={'16px'}>
//           <Typography variant="subtitle1">
//             {
//               'Messages can only be seen by people in the call when the message is sent. All messages are deleted when the call ends.'
//             }
//           </Typography>
//         </Grid>
//         <Grid
//           container
//           justifyContent={'flex-end'}
//           flexDirection={'column'}
//           flex={1}
//           flexWrap={'nowrap'}
//           height={'100%'}
//           mb={1}
//           p={1}
//         >
//           <Grid
//             item
//             maxHeight={
//               belowMd
//                 ? window.innerHeight * 0.34
//                 : belowLg1
//                 ? window.innerHeight * 0.45
//                 : window.innerHeight * 0.65
//             }
//             overflow={'auto'}
//             container
//             flexWrap={'nowrap'}
//             rowGap={3}
//             p={1}
//             flexDirection={'column'}
//           >
//             {chatHistory?.map((messages, index) => (
//               <Grid key={index} item width={'80%'} maxWidth={'80%'}>
//                 <Grid container flexDirection={'column'}>
//                   <Grid container columnGap={2}>
//                     <Typography variant="subtitle2" fontWeight={700}>
//                       {currentUser.userId === messages.sender.userId ? 'You' : getUserName(messages.sender.userId)}
//                     </Typography>
//                     <Typography variant="subtitle2" color={theme.palette.grey[800]}>
//                       {getTimeOfMessageSent(messages.timestamp)}
//                     </Typography>
//                   </Grid>
//                   {currentUser.userId === messages.sender.userId &&
//                     messages?.file?.fileUrl ? (
//                       <Link
//                         style={{
//                           cursor: 'pointer',
//                           color: theme.palette.common.black,
//                         }}
//                         onClick={() =>
//                           messages.id &&
//                           messages.file?.fileUrl &&
//                           chatClient?.downloadFile(
//                             messages.id,
//                             messages.file?.fileUrl
//                           )
//                         }
//                       >
//                         <Tooltip title="Click to download the file.">
//                           <Typography variant="subtitle2">
//                             {`Sent "${messages.file.name}".`}
//                           </Typography>
//                         </Tooltip>
//                       </Link>
//                     ) : currentUser.userId !== messages.sender.userId &&
//                     messages.file?.fileUrl ? (
//                       <Link
//                         style={{
//                           cursor: 'pointer',
//                           color: theme.palette.common.black,
//                         }}
//                         onClick={() =>
//                           messages.id &&
//                           messages.file?.fileUrl &&
//                           chatClient?.downloadFile(
//                             messages.id,
//                             messages.file?.fileUrl
//                           )
//                         }
//                       >
//                         <Tooltip title="Click to download the file.">
//                           <Typography variant="subtitle2">
//                             {`Received "${messages.file.name}".`}
//                           </Typography>
//                         </Tooltip>
//                       </Link>
//                     ) : (
//                       messages.message
//                     )}{' '}
//                 </Grid>
//               </Grid>
//             ))}
//           </Grid>
//           <Grid item justifyContent={'flex-end'} width={'100%'}>
//             {isFileSentOrDownloaded && (
//               <Box width={'100%'} p={1}>
//                 <LinearProgress
//                   variant="determinate"
//                   value={progressOfFileUpload}
//                   color={'primary'}
//                 />
//               </Box>
//             )}
//             {isFileSizeMoreThan50MB && (
//               <Alert
//                 severity="error"
//                 onClose={() => setIsFileSizeMoreThan50MB(false)}
//               >
//                 Please upload a file that is under 50 megabytes in size.
//               </Alert>
//             )}
//             <input
//               type="file"
//               id="fileInput"
//               onChange={handleInputFile}
//               style={{ display: 'none' }}
//             />
//             <InputBase
//               fullWidth
//               value={selectedFile ? selectedFile.name : typedMessage}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSendMessage();
//                   return;
//                 }
//               }}
//               placeholder="Send a message / file"
//               onChange={(e) => setTypedMessage(e.target.value)}
//               sx={{
//                 height: '50px',
//                 padding: '10px',
//                 borderRadius: '16px',
//                 background: theme.palette.grey[200],
//               }}
//               endAdornment={
//                 <InputAdornment position="end">
//                   {selectedFile && (
//                     <Tooltip title="Remove selected file">
//                       <IconButton
//                         onClick={() => handleRemoveSelectedFile()}
//                       >
//                         {<ClearIcon />}
//                       </IconButton>
//                     </Tooltip>
//                   )}
//                   {fileInfo && (
//                     <Tooltip title={'Download latest file.'}>
//                       <IconButton onClick={() => handleDownloadFile()}>
//                         {<DownloadIcon />}
//                       </IconButton>
//                     </Tooltip>
//                   )}

//                   <IconButton onClick={() => handleAttachFile()}>
//                     {<AttachFileIcon />}
//                   </IconButton>
//                   <IconButton
//                     onClick={() =>
//                       selectedFile
//                         ? handleSendSelectedFile()
//                         : handleSendMessage()
//                     }
//                   >
//                     {<SendIcon />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             ></InputBase>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default ChatComponent;

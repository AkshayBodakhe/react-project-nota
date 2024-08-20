// import React from "react";
// import { useEffect, useState, useRef } from "react";
// import "../../../styles/components/_joining-room-modal.scss";
// import { Avatar } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";


// const RemoteParticipant = ({
//   participant,
//   participantIndex,
//   room,
//   isLocal = false,
//   isLocalCameraEnable,
//   setIsLocalCameraEnable,
//   isLocalAudioEnable,
//   setIsLocalAudioEnable,
//   minimizeScreen = false,
//   setMinimizeScreen = () => {},
// }) => {
//   const [videoTrack, setVideoTrack] = useState<any>(null);
//   const [audioTrack, setAudioTrack] = useState<any>(null);
//   const [isCameraEnable, setIsCameraEnable] = useState(true);
//   const [isAudioEnable, setIsAudioEnable] = useState(true);
//   const [isParticipantPresent, setIsParticipantPresent] = useState(true);
//   const dispatch=useDispatch()
//   // const  {userRole}  = useSelector(editorSelectors.getAllState);

//   const ref = useRef<any>();
//   const audioRef = useRef();

//   useEffect(()=>{
//     if(room?.state==="disconnected"){
//     //  dispatch(setModal(CodingModalsEnum.completed))
//     }
//   },[room?.state==="disconnected"])


//   useEffect(() => {
//     if (participant) {
//       setTimeout(() => {
//         let videoTrack = participant.videoTracks?.values()?.next()
//           ?.value?.track;
//         let audioTrack = participant.audioTracks?.values()?.next()
//           ?.value?.track;
//         if (videoTrack && !videoTrack.isEnabled && isCameraEnable) {
//           setIsCameraEnable(false);
//         }
//         if (audioTrack && !audioTrack.isEnabled && isAudioEnable) {
//           setIsAudioEnable(false);
//         }
//         setVideoTrack(videoTrack);
//         setAudioTrack(audioTrack);
//       }, 2000);
//     }
//   }, [participant, room]);

//   useEffect(() => {
//     room.participants.forEach((participant) => {
//       participant.tracks.forEach((publication) => {
//         if (publication.isSubscribed) {
//           handleTrackDisabled(publication.track);
//         }
//         publication.on("subscribed", handleTrackDisabled);
//       });
//     });
//   }, [room]);

//   function handleTrackDisabled(track) {
//     if (!isLocal) {
//       track.on("disabled", () => {
//         const participant: any = Array.from(room.participants.values());
//         setTimeout(() => {
//           let videoTrack = participant[participantIndex]?.videoTracks
//             ?.values()
//             .next().value;
//           let audioTrack = participant[participantIndex]?.audioTracks
//             ?.values()
//             .next().value;

//           if (
//             track.kind === "video" &&
//             videoTrack &&
//             !videoTrack.isTrackEnabled
//           ) {
//             setIsCameraEnable(false);
//           }
//           if (
//             track.kind === "audio" &&
//             audioTrack &&
//             !audioTrack.isTrackEnabled
//           ) {
//             setIsAudioEnable(false);
//           }
//         }, 1000);
//       });
//       track.on("enabled", () => {
//         const participant: any = Array.from(room.participants.values());
//         setTimeout(() => {
//           let videoTrack = participant[participantIndex]?.videoTracks
//             ?.values()
//             .next().value;
//           let audioTrack = participant[participantIndex]?.audioTracks
//             ?.values()
//             .next().value;
//           if (
//             track.kind === "video" &&
//             videoTrack &&
//             videoTrack.isTrackEnabled
//           ) {
//             setIsCameraEnable(true);
//           }
//           if (
//             track.kind === "audio" &&
//             audioTrack &&
//             audioTrack.isTrackEnabled
//           ) {
//             setIsAudioEnable(true);
//           }
//         }, 1000);
//       });
//     }
//   }
//   useEffect(() => {
//     const handleParticipantDisconnected = (participant) => {
//       if (participant.identity === participant?.identity) {
//         setIsParticipantPresent(false);
//         const payloadData = {
//           status: true, 
//           message: `${participant.identity} ${
//             participant?.length > 2 && isLocal ? "(You)" : ""
//           } left the room.`
//         };
    
//       }
//     };
  
//     room.on("participantDisconnected", handleParticipantDisconnected);
  
//     return () => {
//       room.off("participantDisconnected", handleParticipantDisconnected);
//     };
//   }, [room, participant?.identity]);

//   useEffect(() => {
//     const handleParticipantConnected = (participant) => {
//       const payloadData = {
//         status: true, 
//         message: `${participant?.identity} joined the room.`,
//       };
  
//     };
  
//     room.on("participantConnected", handleParticipantConnected);
  
//     return () => {
//       room.off("participantConnected", handleParticipantConnected);
//     };
//   }, [room]);


//   useEffect(() => {
//     if (
//       videoTrack &&
//       ((!isLocal && isCameraEnable) || (isLocal && isLocalCameraEnable))
//     ) {
//       const el: any = ref.current;
//       if (el) el.muted = false;
//       videoTrack.attach(el);
//     }
//     if (audioTrack) {
//       const el: any = audioRef.current;
//       if (el) el.muted = false;
//       audioTrack.attach(el);
//     }
//   }, [
//     participant,
//     videoTrack,
//     audioTrack,
//     isCameraEnable,
//     isLocalCameraEnable,
//     isLocalAudioEnable,
//   ]);

//   return (
//     <div className="remote-participant">
//       <div
//         className={`video-content ${
//           ((!isLocal && isCameraEnable) || (isLocal && isLocalCameraEnable)) &&
//           "active"
//         }`}>
//         {((!isLocal && isCameraEnable) || (isLocal && isLocalCameraEnable)) && (
//           <video
//             ref={ref}
//             width="100%"
//             height="100%"
//             style={{ borderRadius: "16px", objectFit: "cover" }}
//           />
//         )}
//         {!(
//           (!isLocal && isCameraEnable) ||
//           (isLocal && isLocalCameraEnable)
//         ) && (
//           <Avatar
//             sx={{
//               backgroundColor: "#E83A59",
//               fontSize: "16px",
//               position: "absolute",
//               top: "35%",
//               width: "15%",
//               height: "24%",
//               left: "42%",
//             }}>
//             {participant?.identity?.charAt(0)?.toUpperCase()}
//           </Avatar>
//         )}
//       </div>
//       {!isLocal && !minimizeScreen && (
//         <div className="mic">
//           {isAudioEnable ? (
//             <BsMic className="icon" />
//           ) : (
//             <BsMicMute className="icon" />
//           )}
//         </div>
//       )}
//       {minimizeScreen && (
//         <div className="action">
//           <div className="action-card">
//             {!isLocal &&
//               (isAudioEnable ? (
//                 <BsMic className="icon" />
//               ) : (
//                 <BsMicMute className="icon" />
//               ))}
//             {isLocal &&
//               (isLocalAudioEnable ? (
//                 <BsMic className="icon" />
//               ) : (
//                 <BsMicMute className="icon" />
//               ))}
//           </div>
//           <div className="action-card">
//             {isLocal &&
//               (isLocalCameraEnable ? (
//                 <BiVideo className="icon" />
//               ) : (
//                 <BiVideoOff className="icon" />
//               ))}
//             {!isLocal &&
//               (isCameraEnable ? (
//                 <BiVideo className="icon" />
//               ) : (
//                 <BiVideoOff className="icon" />
//               ))}
//           </div>
//         </div>
//       )}
//       {participant?.length > 2 && isLocal && !minimizeScreen && (
//         <div className="mic">
//           {isLocalAudioEnable ? (
//             <BsMic className="icon" />
//           ) : (
//             <BsMicMute className="icon" />
//           )}
//         </div>
//       )}
//       {!isLocal && !minimizeScreen && (
//         <span className="remote-text">{`${participant?.identity}`}</span>
//       )}
//       {participant?.length > 2 && isLocal && !minimizeScreen && (
//         <span className="remote-text">{`${participant?.identity} "(You)"
//         `}</span>
//       )}
//     </div>
//   );
// };

// export default RemoteParticipant;

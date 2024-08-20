import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Grid, Modal, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

// import NoUser from '../../../../../assets/noUserProfile.svg';
import ReactPlayer from 'react-player';
import VideoAudioControls from '../../video-content/audioVideoControls';
import classess from '../../mobile.module.scss';
import { useZoomControllerServiceGetAuthToken } from '../../../../../../../../sdk/thinkemr-core-0.0.1/queries';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55vw',
  height: '65vh',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: '4rem',
  '@media (max-width: 1000px)': {
    width: '80vw',
    height: '60vh',
  },
  '@media (max-width: 768px)': {
    width: '900vw',
    height: '60vh',
  },
  // '@media (min-width: 100px)': {
  //   width: "80vw",
  //   height: "40vh"
  // }
};

// const ReactPlayer = ReactPlayer1;

type ResponseTypeForAuthToken = {
  authToken?: string;
  errorMessage?: string;
};

const ProviderDesktop = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { uuid } = useParams();
  const appointmentUuid = uuid as string;
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [isJoinVideo, setIsJoinVideo] = useState(false)
  const [showLoader, setShowLoader] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [showRequestDeniedAlert, setShowRequestDeniedAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // const [joinRoomResponse] = [{},{},{},() => {}] as any;
  const {data: joinRoomResponse, error, isLoading} = useZoomControllerServiceGetAuthToken({
    appointmentUuid
  },[],{enabled:isJoinVideo})
  useEffect(() => {
    if (joinRoomResponse) {
      const response = joinRoomResponse.data as ResponseTypeForAuthToken;
      if (response?.authToken) {
        const signature = response?.authToken;
        navigate(`/provider/join-room/${uuid}`, {
          state: { signature: signature },
        });
      }
    }
  }, [joinRoomResponse, uuid, navigate]);

  const handleCreateButton = async () => {
    setIsJoinVideo(true)
    // joinRoomHookHandler(null);
    // setNameEntered(true);
    // setShowLoader(true);
  };

  const stopVideoOnly = (stream: MediaStream | null) => {
    if (!stream) return;

    setVideo((prev) => !prev);
    // dispatch(setVideoEnable(!video));

    if (video) {
      stream.getVideoTracks().forEach((track) => (track.enabled = false));
    } else {
      stream.getVideoTracks().forEach((track) => (track.enabled = true));
    }
  };

  const stopAudioOnly = (stream: MediaStream | null) => {
    if (!stream) return;

    setAudio((prev) => !prev);
    // dispatch(setAudioEnable(!audio));
    stream.getTracks().forEach((track) => {
      if (track.readyState === 'live' && track.kind === 'audio') {
        track.stop();
      }
    });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream: MediaStream) => {
        setStream(stream);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const closeDialog = () => {
    const frame = window.parent.document.getElementById('iFrame');
    const draggable = window.parent.document.getElementById('parent');

    if (frame && draggable) {
      stream && stream.getVideoTracks()[0].stop();
      stream && stream.getAudioTracks()[0].stop();
      const uRl = ``;
      frame.setAttribute('data', uRl);
      frame.style.display = 'none';
      draggable.style.display = 'none';
    }
  };

  const playerStyle = {
    overflow: 'hidden',
  };

  const responsiveStyles = {
    height: '100vh',
    width: '100vw',
  };

  return (
    <>
      {isMobile ? (
        <Modal
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            border: '2px solid #000',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            boxShadow: 24,
            overflow: 'hidden',
          }}
          open={true}
        >
          <Box sx={style}>
            <Box sx={style}>
              <Box sx={{ ...playerStyle, ...responsiveStyles }}>
                {video ? (
                  <>
                    <ReactPlayer
                      width={'100%'}
                      height="100%"
                      playing={true}
                      className={'player'}
                      muted
                      url={stream as MediaStream}
                    />

                    {/* <ReactPlayer
                    playing={true}
                    muted
                    width="100%"
                    height="100%"
                    url={stream as MediaStream}
                    fileConfig={{
                      attributes: {
                        style: {


                          
                          display: 'block',
                          width: 'auto',
                          height: 'auto',
                        },
                      },
                    }}
                  /> */}
                    <Backdrop
                      open={true}
                      sx={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    />
                  </>
                ) : (
                  <Box
                    sx={{
                      justifyContent: 'center',
                      display: 'flex',
                      height: '100vh',
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    <img src={'NoUser'} width="25%" alt="No User" />
                  </Box>
                )}
                <Box
                  sx={{
                    position: 'absolute',
                    color: 'white',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                  }}
                >
                  <Stack spacing={2} textAlign={'center'} top={'3rem'}>
                    <Typography variant="h4">Ready to join?</Typography>
                    <Typography variant="h5">No one else is here</Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    color: 'white',
                    top: '80%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    '@media (max-width: 900px)': {
                      transform: 'translate(-50%, -70%)',
                    },
                  }}
                >
                  <VideoAudioControls
                    video={video}
                    audio={audio}
                    onVideoChange={stopVideoOnly}
                    onAudioChange={stopAudioOnly}
                    stream={stream}
                    handleCreateButton={handleCreateButton}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      ) : (
        <Modal open={true} sx={{ height: '100%' }}>
          <Box sx={style}>
            <Grid
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: video ? 'white' : 'black',
                borderRadius: '12px',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {video ? (
                  <ReactPlayer
                    playing={true}
                    muted
                    width="100%"
                    height="100%"
                    url={stream as MediaStream}
                    fileConfig={{
                      attributes: {
                        style: {
                          display: 'block',
                          width: 'auto',
                          height: 'auto',
                        },
                      },
                    }}
                  />
                ) : (
                  <img src={'NoUser'} width="35%" alt="No User" />
                )}
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  color: video ? 'black' : 'white',
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h3">Ready to join?</Typography>
                  <Typography variant="h5">No one else is here</Typography>
                </Box>
                <VideoAudioControls
                  video={video}
                  audio={audio}
                  onVideoChange={stopVideoOnly}
                  onAudioChange={stopAudioOnly}
                  stream={stream}
                  handleCreateButton={handleCreateButton}
                />
              </Box>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ProviderDesktop;

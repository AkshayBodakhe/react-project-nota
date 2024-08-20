import { Box, Tooltip, IconButton, Button } from '@mui/material';
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
interface Props {
  video: any;
  audio: any;
  onVideoChange: any;
  onAudioChange: any;
  stream: any;
  handleCreateButton?: any;
}
const VideoAudioControls = ({
  video,
  audio,
  onVideoChange,
  onAudioChange,
  stream,
  handleCreateButton,
}: Props) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 3,
          mt: 5,
        }}
      >
        <Tooltip title={audio ? 'Turn off microphone' : 'Turn on microphone'}>
          <IconButton
            sx={{
              color: 'white',
              padding: '12px',
              background: audio ? 'rgb(12, 18, 12,0.5)' : 'red',
              '&:hover': {
                background: audio ? 'rgb(12, 18, 12,0.5)' : 'red',
              },
              borderRadius: '1rem',
            }}
            aria-label="mic"
            onClick={() => onAudioChange(stream)}
          >
            {audio ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={video ? 'Turn off video' : 'Turn on video'}>
          <IconButton
            sx={{
              color: 'white',
              padding: '12px',
              background: video ? 'rgb(12, 18, 12,0.5)' : 'red',
              '&:hover': {
                background: video ? 'rgb(12, 18, 12,0.5)' : 'red',
              },
              borderRadius: '1rem',
            }}
            onClick={() => onVideoChange(stream)}
            aria-label="video"
          >
            {video ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box display={'flex'} justifyContent={'center'} flexDirection={'column'}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '18rem',
            mt: '1rem',
            backgroundColor: '#A0A0D8',
            color: '#42427C',
          }}
          onClick={() => {
            handleCreateButton();
          }}
        >
          Join Meetingss
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '18rem', m: '1rem 0' }}
          onClick={() => {
            // handleCreateButton();
          }}
        >
          <ArrowBackIcon /> Back to Track board
        </Button>
      </Box>
    </Box>
  );
};

export default VideoAudioControls;

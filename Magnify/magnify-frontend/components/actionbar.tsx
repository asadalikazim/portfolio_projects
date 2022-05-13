import { Flex, Spacer, Stack, Tooltip, Button, Icon, As } from "@chakra-ui/react";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { NextComponentType } from "next";
import { Component, MouseEventHandler } from "react";


type Props = {
  mute: boolean,
  toggleMute: MouseEventHandler<HTMLButtonElement>,
  video: boolean,
  toggleVideo: MouseEventHandler<HTMLButtonElement>,
  record: boolean,
  toggleRecording: MouseEventHandler<HTMLButtonElement>,
  copyRoomCode: MouseEventHandler<HTMLButtonElement>,
  leaveRoom: MouseEventHandler<HTMLButtonElement>
}

type action = {
  icon: any,
  tooltip: string,
  handler: MouseEventHandler<HTMLButtonElement>,
  color: string
}

export const ActionBar: React.FC<Props> = ({ mute, toggleMute, video, toggleVideo, record, toggleRecording, copyRoomCode, leaveRoom }) => {
  const actions: action[] = [
    {
      icon: ContentCopyIcon,
      tooltip: 'Copy room code',
      handler: copyRoomCode,
      color: ''
    },
    {
      icon: mute ? MicIcon : MicOffIcon,
      tooltip: mute ? 'Mute' : 'Unmute',
      handler: toggleMute,
      color: ''
    },
    {
      icon: video ? VideocamIcon : VideocamOffIcon,
      tooltip: video ? 'Disable camera' : 'Enable camera',
      handler: toggleVideo,
      color: ''
    },
    {
      icon: record ? RadioButtonUncheckedIcon : RadioButtonCheckedIcon,
      tooltip: record ? 'Stop recording' : 'Start recording',
      handler: toggleRecording,
      color: ''
    },
    {
      icon: LogoutIcon,
      tooltip: 'Leave call',
      handler: leaveRoom,
      color: '#9F7AEA'
    },
  ];


  return (
    <Flex h='100%'>
      <Spacer />
      <Stack direction='row' spacing={4} align='center'>
        {actions.map((action: action, idx: number) => {
          return (
            <Tooltip key={idx} label={action.tooltip}>
              <Button colorScheme='#81E7D9' color="#fff" bg={action.color} variant='solid' onClick={action.handler}>
                <Icon as={action.icon}></Icon>
              </Button>
            </Tooltip>);
        })}
      </Stack>
      <Spacer />
    </Flex>);
}

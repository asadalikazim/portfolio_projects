import { Grid, GridItem } from "@chakra-ui/react";
import { NextComponentType } from "next";
import router, { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ActionBar } from "./actionbar";
import { Chat } from "./chat";
import socketio, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Peer from "peerjs";
import adapter from 'webrtc-adapter';
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { VideoGrid } from "./videogrid";
import { display } from "@mui/system";

export const ConferenceLayout: NextComponentType = () => {
  // todo change all these states in one global state and use 
  // useReduce and pass function (action) => {useReducer(action)}
  // more clean and maintainable!
  // https://beta.reactjs.org/apis/usereducer#writing-the-reducer-function
  // https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer
  const [mute, setMute] = useState(true); // might not need to be here.
  const [video, setVideo] = useState(true);
  const [record, setRecord] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  const toggleMute = () => { setMute(!mute) };
  const toggleVideo = () => { setVideo(!video) };
  const toggleRecording = () => { setRecord(!record) };
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  const { query } = useRouter()

  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const [incomingVideoStreams, setincomingVideoStreams] = useState<MediaStream[]>([]);
  const localStreamRef = useRef(null);
  const peerInstance = useRef(null);
  const socket = useRef(socketio('http://localhost:4000/'));
  const peerId = useRef('');

  const [messages, setMessages] = useState<{ content: string, isIncoming: boolean }[]>([]);
  const chatInputRef = useRef(null);
  const display = useRef<MediaStream>(new MediaStream);
  const audio = useRef<MediaStream>(new MediaStream);
  const recording = useRef<Blob[]>([]);
  const recorder = useRef<MediaRecorder>(new MediaRecorder(new MediaStream()));
  const context = useRef<AudioContext>();
  const destination = useRef<MediaStreamAudioDestinationNode>();
  const combine = useRef<MediaStream>();
  const rectracks = useRef<MediaStreamTrack[]>([]);

  const chatSend = () => {
    if (chatInputRef && chatInputRef.current) {
      if (chatInputRef.current.value !== null && chatInputRef.current.value !== undefined && chatInputRef.current.value !== '') {
        socket.current.emit("send-message", { "roomId": roomCode, "peerId": peerId.current, "content": chatInputRef.current.value });

        setMessages((prevFriends) => [
          ...prevFriends,
          {
            content: chatInputRef.current?.value,
            isIncoming: false,
          },
        ]);
      }
    }
  }

  //peer logic
  let activePeers: { [id: string]: Peer.MediaConnection; } = {};
  let peer: Peer;
  const peerLogic = () => {
    import('peerjs').then(({ default: Peer }) => {
      peer = new Peer(undefined, {
        host: '/',
        path: '/peerjs',
        port: 5000
      })

      peer.on('open', (id) => {
        peerId.current = id;
        streamLogic();
      });

      peer.on('call', (incomingCall) => {
        incomingCall.answer(myStream);
        // create video element
        incomingCall.on('stream', (incomingStream: MediaStream) => {
          // grid.append(video)
          addVideoStream(incomingStream, true);
        });
        incomingCall.on('close', () => {
          // grid.append(video)
        });
      });
    });
  }

  // local stream logic
  let myStream: MediaStream;
  const streamLogic = async () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream: MediaStream) => {
      myStream = stream;
      addVideoStream(myStream, false);
      socketLogic();
    }).catch();
  }

  // socket logic
  const socketLogic = () => {
    socket.current.on('user-connected', remotePeerId => {
      const outgoing = peer.call(remotePeerId, myStream);
      // create a new video element, or react component <video></video>
      outgoing.on('stream', incomingStream => {
        // TODO add incoming stream

        addVideoStream(incomingStream, true); // grid.append(video)
      });
      outgoing.on('close', () => {
        // TODO remove incoming stream //grid.remove(video)
      });
      activePeers[remotePeerId] = outgoing;
    });

    socket.current.on('user-disconnected', remotePeerId => {
      if (activePeers[remotePeerId]) activePeers[remotePeerId].close()
    });

    // chat receive
    socket.current.on('recieve-message', message => {
      setMessages((prevFriends) => [
        ...prevFriends,
        {
          content: message,
          isIncoming: true,
        },
      ]);
    });

    socket.current.emit('join-room', { "roomId": roomCode, "peerId": peerId.current });
  }

  // ENTRY POINT: entering the room logic
  useEffect(() => {
    console.log("in main logic");
    let temp = localStorage.getItem('roomId');
    setRoomCode((temp === null || temp === undefined || temp === '') ? uuidv4() : temp);
    peerLogic();

    // chat send listener
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        chatSend();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [])

  const addVideoStream = (stream: MediaStream, incoming: boolean) => {
    if (incoming) {
      setincomingVideoStreams((incomingVideoStreams) => [...incomingVideoStreams, stream]);
    } else {
      const videoElement = currentUserVideoRef.current
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.addEventListener('loadedmetadata', function () {
          videoElement.play();
        });
      }
    }
  }

  const getDisplay = async () => {
    return await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
  }

  const getAudio = async () => {
    return await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true
    });
  }

  const confirmExit = (e: Event) => {
    e.preventDefault();
    e.returnValue = true;
  }

  //////////////////////////////////////////////////////////////////////// IDGAF BELOW THIS LINE
  const toggleStreamedVideo = (videoElement) => {
    const stream = videoElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();

      tracks.forEach((track: MediaStreamTrack) => {
        track.enabled = !track.enabled;
      });
    }
  }

  const toggleMicrophone = (stream: MediaStream) => {
    stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    //if (recorder.current.state === "recording") audio.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }

  const toggleLocalRecording = async (record: boolean) => {
    if (record) {
      // start recording meeting
      display.current = await getDisplay();
      audio.current = await getAudio();

      context.current = new AudioContext();
      destination.current = context.current.createMediaStreamDestination();

      if (display.current.getAudioTracks().length > 0) {
        context.current.createMediaStreamSource(display.current).connect(destination.current);
      }

      if (audio.current.getAudioTracks().length > 0) {
        context.current.createMediaStreamSource(audio.current).connect(destination.current);
      }

      rectracks.current = destination.current.stream.getTracks();
      rectracks.current = rectracks.current.concat(display.current.getVideoTracks());

      combine.current = new MediaStream(rectracks.current);

      recorder.current = new MediaRecorder(combine.current);

      recorder.current.addEventListener('start', (e) => {
        window.addEventListener('beforeunload', confirmExit);
      });

      recorder.current.addEventListener('stop', (e) => {
        window.removeEventListener('beforeunload', confirmExit);
      });

      recorder.current.addEventListener('dataavailable', (e) => {
        if (e.data && e.data.size > 0) {
          recording.current.push(e.data);
        }
      });

      recording.current = [];
      recorder.current.start(200); // every 200 ms record in a new blob 
      console.log("Recording started!");

    } else if (recorder.current.state === "recording") {
      // stop recording meeting
      recorder.current.stop();
      display.current.getTracks().forEach((track) => track.stop());
      audio.current.getTracks().forEach((track) => track.stop());
      console.log("Recording stopped!");
      const blobData = new Blob(recording.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blobData);
      const date = new Date();
      const filename = date.toLocaleDateString() + '_' + date.toLocaleTimeString().slice(0, date.toLocaleTimeString().length - 3) + '_' + date.toLocaleTimeString().slice(date.toLocaleTimeString().length - 2);
      if (recording.current.length > 0) {
        const element = document.createElement('a');
        element.href = url;
        element.download = filename + ".webm";
        element.click();
      }
    }
  }

  const stopStreamedVideo = (videoElement) => {
    const stream = videoElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();

      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
      videoElement.srcObject = null;
    }
  }

  const leaveRoom = (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
    console.log("in leave room")
    console.log(socket);
    socket.emit('leave-room', { "roomId": roomCode, "peerId": peerId.current })
    stopStreamedVideo(currentUserVideoRef.current);
    router.push('/');
  }

  useEffect(() => {
    if (currentUserVideoRef.current !== null) {
      toggleStreamedVideo(currentUserVideoRef.current)
    }
  }, [video])

  useEffect(() => {
    if (localStreamRef.current !== null) {
      toggleMicrophone(localStreamRef.current);
    }
  }, [mute])

  useEffect(() => {
    toggleLocalRecording(record)
  }, [record])

  return (<Grid
    h='100vh'
    templateRows='repeat(10, 1fr)'
    templateColumns='repeat(9, 1fr)'
    bg='#1A202C'
  >
    <GridItem rowStart={2} rowEnd={9} borderRadius="xl" ml="1em" mr="1em" colStart={1} colEnd={8} >
      <VideoGrid streams={incomingVideoStreams}></VideoGrid>
    </GridItem>
    <GridItem opacity={0.8} rowStart={10} colStart={3} colSpan={3} bg='#011628' borderTopRadius={35} mt={5}>
      <ActionBar mute={mute} toggleMute={toggleMute} video={video} toggleVideo={toggleVideo} record={record} toggleRecording={toggleRecording} copyRoomCode={copyRoomCode} leaveRoom={() => leaveRoom(socket.current)} />
    </GridItem>
    <GridItem colStart={8} colEnd={10} rowStart={1} rowEnd={11} p={[0, 2, 2, 2]} m={[1, 0, 1, 0]} borderLeftRadius={35} bg='#2D3748' >
      <Chat messages={messages} ref={chatInputRef} />
    </GridItem>
    <GridItem zIndex={1} opacity={0.9} borderRadius="xl" m={[0, 0, 1, 1]} colStart={1} colEnd={3} rowStart={8} rowSpan={2} bg='#9F7AEA'>
      <video ref={currentUserVideoRef} muted={true} style={{ "borderRadius": "15px" }}></video>
    </GridItem>
  </Grid >);
}
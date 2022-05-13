import { AspectRatio, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {  useRef } from "react";

type Props = {
    isIncoming: boolean,
    stream: MediaStream,
    isMuted: boolean,
    isVideo: boolean
};

export const VideoFrame:React.FC<Props> = ({stream}) => {
    const videoElementRef = useRef<HTMLVideoElement>();
    useEffect(() => {
        videoElementRef.current.srcObject = stream;
        videoElementRef.current.addEventListener('loadedmetadata', function () {
            videoElementRef.current.play();
        })
    }, [stream])
    return (
    <AspectRatio  ratio={16 / 9} >
        <video ref={videoElementRef} autoPlay style={{"borderRadius":"15px"}}></video>
    </AspectRatio>);

};
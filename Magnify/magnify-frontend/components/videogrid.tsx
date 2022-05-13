import { AspectRatio, Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { NextComponentType } from "next";
import { useEffect, useRef } from "react";
import { VideoFrame } from "./videoframe";

type Props = {
    streams: MediaStream[],
};

// NB: might need to make it a hook instead https://stackoverflow.com/questions/41303012/updating-source-url-on-html5-video-with-react/41303748
// useEffect(()=>{

// },[]);


export const VideoGrid:React.FC<Props> = ({streams}) => {

    return (
    <SimpleGrid minChildWidth='440px' spacing='20px'>
        {streams.map((stream:MediaStream, key:number) => 
            {
            return <GridItem borderRadius={15} key={key}>
                <VideoFrame stream={stream} isIncoming={false} isMuted={false} isVideo={false} />
            </GridItem>})}
    </SimpleGrid>);
};
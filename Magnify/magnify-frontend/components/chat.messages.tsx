import React from 'react'
import { Box, Flex, Spacer } from "@chakra-ui/react";

type Props = {
    content:  string,
    isIncoming: boolean
  }

export const ChatMessage: React.FC<Props> = ({ content, isIncoming }: Props) => 
{
    return (isIncoming ? 
    <Flex gap={0} mr={8} ml={2} mb={2}>
        <Box mt="auto" borderRadius={15} bg='#4A5568' boxSize={1} minH={1} minW={1}/>
        <Box p={2} bg='#4A5568' borderRadius={15} color="#fff">
        {content}
        </Box>
        <Spacer/>
      </Flex>
    :<Flex gap={0} ml={8} mr={2} mb={2}>
        <Spacer/>
        <Box p={2} bg='#B794F4' borderRadius={15} color="#fff">
        {content}
        </Box>
        <Box mt="auto" borderRadius={15} bg='#B794F4' boxSize={1} minH={1} minW={1}/>
      </Flex>);
}
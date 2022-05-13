import { Flex, Box, Spacer, InputGroup, Input, InputRightElement, Icon } from "@chakra-ui/react";
import SendIcon from '@mui/icons-material/Send';
import {ChatMessage} from "./chat.messages";
import React from "react";

type Message = {
  content: string,
  isIncoming: boolean
}
type Props = {
  messages: Message[],
}

export const Chat: React.FC<Props> = React.forwardRef(({messages}, ref: React.LegacyRef<HTMLInputElement>) => {
  return (<Flex direction='column' h="100%" >
  <Box mb={4} mt={4} ml="auto" mr="auto" color="#fff">
    Chat
  </Box>
  <Box overflow="auto">
  {messages.map((message: Message, key: number) => <ChatMessage key={key} content={message.content} isIncoming={message.isIncoming}/>)}
  </Box>
  <Spacer/>
  <Flex>
  <InputGroup>
  <Input ref={ref} variant='filled' mt={2} ml={2} mr={2} borderBottomLeftRadius={15} placeholder='Chat with everyone!' bg="#1A202C"/>
  <InputRightElement mt={2} mr={2}>
    <Icon as={SendIcon}/>
  </InputRightElement>
  </InputGroup>
  </Flex>
  </Flex>);
})

Chat.displayName = "Chat";
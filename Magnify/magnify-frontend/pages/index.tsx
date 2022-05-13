import { useLazyQuery } from '@apollo/client';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, HStack, Input, Stat, StatNumber, useDisclosure, Image, Center, StatLabel, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import LOGOUTUSER from '../lib/queries/logoutUser';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const router = useRouter();
  const roomIdRef = useRef(null);
  const [signedIn, setSignedIn] = useState(false);

  const createConference = () => {
    localStorage.setItem('roomId', '');
    router.push({pathname:'/conference'});    
  }

  const handleSubmit = () => {
    if (roomIdRef === null || roomIdRef.current === null || roomIdRef.current.value === null || roomIdRef.current.value === "") {
      onOpen();
    } else {
      localStorage.setItem('roomId', roomIdRef.current.value);
      router.push({pathname:'/conference'})
    }
  }

  const schedule = () => {
    router.push({pathname:'/schedule'})
  }

  const [logoutUser, {data, loading, error }] = useLazyQuery(LOGOUTUSER, { errorPolicy: 'all' });
  const signOut = () => {
    logoutUser()
    .catch(error => {
      console.log(error);
    });
    localStorage.setItem('signedIn','');
    router.push({pathname:'/'});
  }

  const signIn = () => {
    router.push({pathname:'/authentication/signin'})
  }

  const signUp = () => {
    router.push({pathname:'/authentication/signup'})
  }

  useEffect(() => {
    let temp = localStorage.getItem('signedIn');
    (temp === null || temp === undefined || temp === '') ? setSignedIn(false) : setSignedIn(true);
  })

  return (
    <>
    <Flex as="header" position="fixed" w="100%" direction="row-reverse">
      {!signedIn && <Button mt={2} mr={2} onClick={signUp}>Sign Up</Button>}
      {!signedIn && <Button mt={2} mr={2} onClick={signIn}>Sign In</Button>}
      { signedIn && <Button mt={2} mr={2} onClick={signOut}>Sign Out</Button>}
      { signedIn && <Button mt={2} mr={2} onClick={schedule}>Schedule</Button>}
    </Flex>

    <Center>
      <VStack boxSize='sm'>
        {/* https://www.iconsdb.com/purple-icons/camera-icon.html */}
        <Image src='/magnify.png' alt='Magnify Logo' maxWidth={250}/> 
        <Stat>
          <StatNumber fontSize={30} >Magnify</StatNumber>
          <StatLabel>your video conferencing experience</StatLabel>
        </Stat>
      </VStack>
    </Center>

    <HStack spacing='24px' justifyContent={'center'}>
      <Box>
        <Button  width={80} onClick={createConference}>
          Create a meeting
        </Button>
      </Box>
      <Box>
        <Stat  width={20}>
          <StatNumber> OR </StatNumber>
        </Stat>
      </Box>
      <Box>
        <FormControl width={80}>
          <Input required={true} type='text' ref={roomIdRef} placeholder="Enter a Room ID"/>
        </FormControl> 
        <Button mt={2} width={80} type="submit" onClick={handleSubmit}>
          Join meeting
        </Button>   
      </Box>
    </HStack>

    <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Could not join the room
        </AlertDialogHeader>

        <AlertDialogBody>
          Please provide a valid room id to join a room
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Okay
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
    </AlertDialog>

    </>
  )
}

export default Home


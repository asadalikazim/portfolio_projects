import { useLazyQuery } from "@apollo/client";
import { Image, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stat, StatLabel, StatNumber, useDisclosure, VStack, Flex, Center } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import { useRef, useState } from "react";
import * as Yup from 'yup';
import SCHEDULE from "../lib/queries/scheduleMeeting"
import moment from "moment";
import { TimePicker } from "./timepicker";
import React from "react";
import { useRouter } from "next/router";

interface ScheduleMeetingInput {
    summary: string;
    description: string;
    username1: string;
    username2: string;
    username3: string;
    username4: string;
    startDateTime: string;
    endDateTime: string;
  }
interface UserDetails {
  username: string;
}

const validateSchema = Yup.object({
    summary: Yup.string().required('Summary required').trim().max(30, "Must be 30 characters or less"),
    description: Yup.string().trim().max(150, "Must be 150 characters or less"),
    username1: Yup.string().required('At least one attendee required').trim().matches(/^[a-z0-9]+$/i,
    "Must Only Contain Characters and Numbers").max(30, "Must be 30 characters or less"),
    username2: Yup.string().trim().matches(/^[a-z0-9]+$/i,
    "Must Only Contain Characters and Numbers").max(30, "Must be 30 characters or less"),
    username3: Yup.string().trim().matches(/^[a-z0-9]+$/i,
    "Must Only Contain Characters and Numbers").max(30, "Must be 30 characters or less"),
    username4: Yup.string().trim().matches(/^[a-z0-9]+$/i,
    "Must Only Contain Characters and Numbers").max(30, "Must be 30 characters or less"),
    startTime: Yup.date()
  });

export const ScheduleForm:React.FC = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [scheduleMeeting, {data, loading, error}] = useLazyQuery<{saveUser: UserDetails},{user:ScheduleMeetingInput}>(SCHEDULE, { errorPolicy: 'all' });

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const [alertHeader,setAlertHeader] = useState('');
    const [alertMessage,setAlertMessage] = useState('');

    const router = useRouter();
    const goHome = () => {
      router.push({pathname:'/'})
    }

    const setValues = function (values: ScheduleMeetingInput) {
      let startTime = startTimeRef.current.innerText;
      let endTime = endTimeRef.current.innerText;

      let tempStart = moment('04-30-2022 ' + startTime,'MM-DD-YYYY hh:mm A').toISOString();
      let tempEnd = moment('04-30-2022 ' + endTime,'MM-DD-YYYY hh:mm A').toISOString();

      const newValues = {
        summary: values.summary,
        description: values.description,
        username1: values.username1,
        username2: values.username2,
        username3: values.username3,
        username4: values.username4,
        startDateTime: tempStart,
        endDateTime: tempEnd,
      }
      return newValues
    }

      return (
        <>
        <Image mt={2} ml={2} onClick={goHome} src='/magnify.png' alt='Magnify Logo' maxWidth={50}/>
        <Formik
          initialValues={{
              summary: "",
              description: "",
              username1: "",
              username2: "",
              username3: "",
              username4: "",
              startDateTime: moment().add(1, 'days').toString(),
              endDateTime: moment().add(1, 'days').add(1, 'hours').toString(),
          }}
          validationSchema={validateSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              scheduleMeeting({ variables: {user: setValues(values) } })
              .then(res => {
                if (!res.data.schedule) {
                  setAlertHeader("Failed to schedule meeting");
                  setAlertMessage("One or more usernames are incorrect. Please recheck!");
                  onOpen();
                } else {
                  router.push({pathname:'/'});
                }
              })
              .catch(error => {
                console.log(error);
                setAlertHeader("Action forbidden");
                setAlertMessage("Sorry for inconvenience. Please try signing in.");
                onOpen();
              });
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {(props) => (
            <Form>
            <Center>
            <Flex direction="row" gap={10}>
              <VStack>
              <Field name='summary' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.summary && form.touched.summary}>
                    <FormLabel htmlFor='summary'>Summary</FormLabel>
                    <Input {...field} id='summary' placeholder='Summary' />
                    <FormErrorMessage>{form.errors.summary}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='description' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.description && form.touched.description}>
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Input {...field} id='description' placeholder='Description' />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='username1' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username1 && form.touched.username1}>
                    <FormLabel htmlFor='username1'>Username1</FormLabel>
                    <Input {...field} id='username1' placeholder='Username1' />
                    <FormErrorMessage>{form.errors.username1}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='username2' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username2 && form.touched.username2}>
                    <FormLabel htmlFor='username2'>Username2</FormLabel>
                    <Input {...field} id='username2' placeholder='Username2' />
                    <FormErrorMessage>{form.errors.username2}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='username3' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username3 && form.touched.username3}>
                    <FormLabel htmlFor='username3'>Username3</FormLabel>
                    <Input {...field} id='username3' placeholder='Username3' />
                    <FormErrorMessage>{form.errors.username3}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='username4' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username4 && form.touched.username4}>
                    <FormLabel htmlFor='username4'>Username4</FormLabel>
                    <Input {...field} id='username4' placeholder='Username4' />
                    <FormErrorMessage>{form.errors.username4}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </VStack>

              <VStack>
              <TimePicker defaultTime={"12:00 am"} message1={"Starting Time"} message2={"Select starting time"} ref={startTimeRef}/>
                <TimePicker defaultTime={"12:00 am"} message1={"Ending Time"} message2={"Select ending time"} ref={endTimeRef}/>

              
              </VStack>              
            </Flex>
            </Center>
            <Center>
              <Button
                maxWidth={40}
                mt={4}
                isLoading={props.isSubmitting}
                type='submit'
                >
                Schedule Meeting
              </Button>
            </Center>
            </Form>
          )}
        </Formik>

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {alertHeader}
            </AlertDialogHeader>
                    
            <AlertDialogBody>
              {alertMessage}
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
      );
};
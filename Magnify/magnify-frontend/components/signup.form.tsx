import {  Image, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, FormControl, FormErrorMessage, FormLabel, GridItem, Icon, Input, InputGroup, InputRightElement, SimpleGrid, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { useState } from "react";
import { useMutation } from "@apollo/client";
import CREATEUSER from "../lib/queries/createUser";
import { useRouter } from "next/router";
import React from "react";


interface CreateUserInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
  }

  interface UserDetails {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
    }

    const validateSchema = Yup.object({
      firstName: Yup.string().trim()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
      lastName: Yup.string().trim()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
      username: Yup.string().required('Required').trim().matches(/^[a-z0-9]+$/i,
      "Must Only Contain Characters and Numbers").max(30, "Must be 30 characters or less"),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
      .required('Please Enter your password')
      .matches(/(?=.{8,})/, "Must Contain 8 Characters")
      .matches(/(?=.*[A-Z])/, "Must Contain One Uppercase Character")
      .matches(/(?=.*[0-9])/, "Must Contain One Number")
      .matches(/(?=.*[a-z])/, "Must Contain One Lowercase Character")
      .matches(/(?=.*[-.!@#\$%\^&\*])/, "Must Contain One Special Case Character"),
      passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });



export const SignupForm:React.FC = () => {
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [showPassword, setShowPassword] = useState(false) 
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm)
    const [createUser, { data, loading, error }] = useMutation<{saveUser: UserDetails},{user:CreateUserInput}>(CREATEUSER, { errorPolicy: 'all' });
    const colSpan = useBreakpointValue({ base: 2, md: 1 });
    if (loading) {

    }
    if (error) {
      console.log(error);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const [alertHeader,setAlertHeader] = useState('');
    const [alertMessage,setAlertMessage] = useState('');

    const router = useRouter();
    const goHome = () => {
      router.push({pathname:'/'})
    }

      return (
        <>
        <Image mt={2} ml={2} onClick={goHome} src='/magnify.png' alt='Magnify Logo' maxWidth={50}/>
        <Formik
        initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validateSchema}
          onSubmit={({confirmPassword, ...userInfo}, actions) => {
            setTimeout(() => {
              createUser({ variables: {user: userInfo } })
              .then(res => {
                if (res.errors) {
                  setAlertHeader("Failed to Sign Up");
                  setAlertMessage("Username and / or email is already in use. Please recheck!");
                  onOpen();
                } else {
                  localStorage.setItem('signedIn','true');
                  router.push({pathname:'/'});
                }
              })
              .catch(error => {
                console.log(error);
                setAlertHeader("Internal Error");
                setAlertMessage("Sorry for inconvenience. Please try again later.");
                onOpen();
              });
              actions.setSubmitting(false);               
            }, 1000)
          }}
        >
          {(props) => (
              <VStack >
              <Form>
              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              <GridItem colSpan={colSpan}>
              <Field name='firstName' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                    <FormLabel htmlFor='firstName'>First Name</FormLabel>
                    <Input {...field} id='firstName' placeholder='First Name' />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Field name='lastName' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                    <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                    <Input {...field} id='lastName' placeholder='Last Name' />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </GridItem>
              <GridItem colSpan={2}>
              <Field name='username' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username && form.touched.username}>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input {...field} id='username' placeholder='Username' />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </GridItem>
              <GridItem colSpan={2}>
              <Field name='email' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </GridItem>
              <GridItem colSpan={colSpan}>
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup>
                    <Input {...field} id='password' placeholder='password' type={showPassword ? 'text' : 'password'} />
                    <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' variant='ghost' size='sm' onClick={handleClickShowPassword}>
                    <Icon as={showPassword ? VisibilityIcon: VisibilityOffIcon}></Icon>
                    </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </GridItem>
              <GridItem colSpan={colSpan}>
              <Field name='confirmPassword'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                    <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                    <InputGroup>
                    <Input {...field} id='confirmPassword' placeholder='confirm password' type={showPasswordConfirm ? 'text' : 'password'}/>
                    <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' variant='ghost' size='sm' onClick={handleClickShowPasswordConfirm}>
                    <Icon as={showPasswordConfirm ? VisibilityIcon: VisibilityOffIcon}></Icon>
                    </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.passwordConfirmation}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </GridItem>
              <GridItem colSpan={2}>
              <Button
                mt={4}
                isLoading={props.isSubmitting}
                type='submit'
                width="100%"
              >
                Submit
              </Button>
              </GridItem>
            </SimpleGrid>
            </Form>
            </VStack>
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
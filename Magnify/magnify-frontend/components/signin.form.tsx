import { useLazyQuery, } from "@apollo/client";
import { Image, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputRightElement, useDisclosure, VStack } from "@chakra-ui/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Field, Form, Formik } from 'formik';
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import * as Yup from 'yup';
import LOGINUSER from "../lib/queries/loginUser";


interface LoginUserInput {
  email: string;
  password: string;
  }
interface UserDetails {
  username: string;
}


export const SigninForm:React.FC = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [loginUser, {data, loading, error }] = useLazyQuery<{saveUser: UserDetails},{user:LoginUserInput}>(LOGINUSER, { errorPolicy: 'all' });

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
              email: '',
              password: '',
          }}
          validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string()
              .required('Please Enter your password'),
          })}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              loginUser({ variables: {user: values } })
              .then(res => {
                if (!res.data.login) {
                  setAlertHeader("Failed to Sign In");
                  setAlertMessage("One or more credentials are incorrect. Please recheck!");
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
              
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {(props) => (
              <VStack>
              <Form>
              <Field name='email' >
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>password</FormLabel>
                    <InputGroup>
                    <Input {...field} id='password' placeholder='password' type={show ? 'text' : 'password'} />
                    <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' variant='ghost' size='sm' onClick={handleClick}>
                    <Icon as={show ? VisibilityIcon: VisibilityOffIcon}></Icon>
                    </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                width="full"
                mt={4}
                isLoading={props.isSubmitting}
                type='submit'
              >
                Sign in
              </Button>
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
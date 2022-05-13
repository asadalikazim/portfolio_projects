import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { NextComponentType } from "next";
import * as Yup from 'yup';
import { SigninForm } from "./signin.form";
import { SignupForm } from "./signup.form";

  export const AuthenticationLayout: NextComponentType = () => {
  
    // return <SignupForm></SignupForm>
    return <SigninForm></SigninForm>
  }
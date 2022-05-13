import React, { useState } from "react"
import { Link } from "gatsby"
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@material-ui/core"
import signUpImg from "../../ui-resources/registration/sign-up/sign-up-img.svg"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import ButtonComponent from "../../ui-components/register/sign-up/ButtonComponent"
import {
  STUDENT_ROLE,
  INSTRUCTOR_ROLE,
  INITIATIVE_ROLE,
} from "../../utils/constants"
import register from "../../services/registration/sign-up"
import { navigate } from "gatsby"
import Auth from "../../services/authorization/sign-in";

function validateEmail(email) {
  const regexp = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
  return regexp.test(email)
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [pressedButton, setPressedButton] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [errorText, setErrorText] = useState("")

  const validateSignup = () => {
    var valid = true;
    if (role == "") {
      setErrorText("Please select a role")
      valid = false;
    }

    if (!validateEmail(email)) {
      setErrorText("Please enter a valid email");
      valid = false;
    }

    if (password.length < 6) {
      setErrorText("Password should be at least 6 characters.")
      valid = false;
    }
    if (name.length < 2) {
      setErrorText("Your name should have  at least 2 characters")
      valid = false;
    }
    return valid
  }

  const completeSignUp = async () => {
    if (!validateSignup()) return
    try {
      const response = await register(email, name, password, role);
      if (response.status === 200) {
        alert("Registration Successful!")
        if (role != INITIATIVE_ROLE) navigate("/registration/sign-in")
        else {
          await Auth.login(email, password);
          navigate("/initiative/create-organization")
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) setErrorText("Email Already taken");
      else setErrorText("Internal server error. Try again later!");

    }
  }

  return (
      <>
        <Grid container justify="center" alignItems="center">
          <Grid
              container
              item
              xs={7}
              direction="column"
              justify="center"
              alignItems="center"
          >
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
              <Typography variant="h4">Join the movement,</Typography>

              <Typography variant="h4">Change the world</Typography>
            </Grid>
            <Grid item container justify="center" alignItems="center">
              <img src={signUpImg} alt="SignUp Img" style={{width: "30rem"}}/>
            </Grid>
          </Grid>
          <Grid
              container
              item
              xs={5}
              direction="column"
              justify="center"
              alignItems="center"
          >
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
              <Typography variant="h5">Create an Account</Typography>
              <Typography variant="subtitle1">
                <Box color="red">{errorText}</Box>
              </Typography>
            </Grid>
            <Grid
                item
                container
                justify="center"
                alignItems="flex-start"
                direction="column"
                style={{padding: "1rem"}}
            >
              <Typography variant="body1">Email</Typography>
              <TextField
                  id="signup-email-textfield"
                  variant="outlined"
                  size="small"
                  style={{width: "100%"}}
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
              />
            </Grid>
            <Grid
                item
                container
                justify="center"
                alignItems="flex-start"
                direction="column"
                style={{padding: "1rem"}}
            >
              <Typography variant="body1">Full Name</Typography>
              <TextField
                  id="signup-username-textfield"
                  variant="outlined"
                  size="small"
                  style={{width: "100%"}}
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid
                item
                container
                justify="center"
                alignItems="flex-start"
                direction="column"
                style={{padding: "1rem"}}
            >
              <Typography variant="body1">Password</Typography>
              <TextField
                  id="signup-password-textfield"
                  variant="outlined"
                  size="small"
                  style={{width: "100%"}}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton>
                        </InputAdornment>
                    ),
                  }}
              />
            </Grid>
            <Grid
                item
                container
                justify="center"
                alignItems="flex-start"
                direction="column"
                style={{padding: "1rem"}}
            >
              <Typography variant="body1">
                Are you joining as a Student, Instructor or Social Initiative?
              </Typography>
              <Typography variant="subtitle2">
                Please select your answer below
              </Typography>
              <Grid container direction="row">
                {[
                  {name: STUDENT_ROLE, key: 0},
                  {name: INSTRUCTOR_ROLE, key: 1},
                  {name: INITIATIVE_ROLE, key: 2},
                ].map(category => (
                    <Grid item key={category.key} style={{padding: "0.2rem"}}>
                      <Button
                          size="small"
                          variant="outlined"
                          key={category.key}
                          value={role}
                          onClick={() => {
                            setPressedButton(category.name)
                            setRole(category.name)
                          }}
                          style={
                            pressedButton == category.name
                                ? {width: "10.5rem", backgroundColor: "#A78EC3"}
                                : {width: "10.5rem", backgroundColor: "#5E6366"}
                          }
                      >
                        <Box color="#ffffff">
                          <Typography>{category.name}</Typography>
                        </Box>
                      </Button>
                    </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
              <Typography variant="subtitle1">
                Already have an account?{" "}
                <Link to="/registration/sign-in">Login</Link>
              </Typography>
            </Grid>
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
              <ButtonComponent
                  onClick={completeSignUp}
                  message="SIGN UP"
                  variant=""
              />
            </Grid>
          </Grid>
        </Grid>
      </>
  )
}
export default SignUp

import React, {useEffect, useState} from "react"
import {Link} from "gatsby"
import { Grid, Typography, TextField, InputAdornment, IconButton, Button, Box } from '@material-ui/core'
import signUpImg from '../../ui-resources/registration/sign-in/sign-in.jpg'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Auth from "../../services/authorization/sign-in";
import { Alert, AlertTitle } from '@material-ui/lab';
import {navigate} from "gatsby";
import {makeStyles} from "@material-ui/styles";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(0);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const classes = useStyles();
    const [user, setUser] = React.useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await Auth.getAuthUser((user) => setUser(user));
                if (response.status === 200) setUser(response.data);
            } catch (err){
                console.log(err);
                setUser(null);
            }
        };
        fetchData();
    }, []);

    if (user) {
        navigate('/dashboard');
    }

    const handleSubmit = async () => {
        console.log(email, password);
        try {
            const response = await Auth.login(email, password, (value) => setError(value));
            if (response.status === 200) navigate('/dashboard');
        } catch (err) {
            if (err.response.status === 404) setError(1)
            else setError(2)
            console.log(err)
        }
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid container item xs={7} direction="column" justify="center" alignItems="center">
                <Grid item container justify="center" alignItems="center" direction="column">
                    <Typography variant="h4">
                        A system you can rely on.
                    </Typography>
                </Grid>
                <Grid item container justify="center" alignItems="center">
                    <img src={signUpImg} alt="SignUp Img"  style={{width: "30rem"}}/>
                </Grid>
            </Grid>
            <Grid container item xs={5  } direction="column" justify="center" alignItems="center" style={{marginTop: "5rem"}}>
                <Grid item container justify="center" alignItems="center" direction="column">
                    <Typography variant="h4">
                        Welcome Back!
                    </Typography>
                </Grid>
                <Grid item container justify="center" alignItems="flex-start" direction="column" style={{padding: "1rem"}} >
                    <Typography variant="body1">
                        Email
                    </Typography>
                    <TextField id="signup-email-textfield"
                               onInput={ e=>{setEmail(e.target.value)}}
                               variant="outlined"
                               size="small"
                               style={{width: "100%"}}/>
                </Grid>
                <Grid item container justify="center" alignItems="flex-start" direction="column" style={{padding: "1rem"}} >
                    <Typography variant="body1">
                        Password
                    </Typography>
                    <TextField
                        id="signup-password-textfield"
                        variant="outlined" size="small"
                        style={{width: "100%"}}
                        onInput={ e=>setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                </Grid >
                <Grid item container justify="center" alignItems="flex-end" direction="column" style={{padding: "1rem", marginBottom: "3rem"}}>
                    <Button onClick={()=>{alert("unlucky...")}}>Forgot password</Button>
                </Grid>
                {error==1 && (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Wrong username or password
                </Alert>)}
                {error==2 && (<Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Internal server error
            </Alert>)}
                <Grid item container justify="center" alignItems="center" direction="column" style={{marginBottom: "5rem"}}>
                    <Button className={classes.button} onClick={handleSubmit}>Log In</Button>
                </Grid>
                <Grid item container justify="center" alignItems="center" direction="column">
                    <Typography variant="subtitle1">
                        Don't have an account yet? <Link to="/registration/sign-up">Sign Up</Link>
                    </Typography>
                </Grid>

            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles({
    button: {
        color: "#FFFFFF",
        backgroundColor: "#A78EC3",
        "&:hover": {
            backgroundColor: "#A78EC3",
        },
        margin: "0.5rem",
        boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
        padding: "0.5rem",
        borderRadius: "0.5rem",
    },
});

export default SignIn
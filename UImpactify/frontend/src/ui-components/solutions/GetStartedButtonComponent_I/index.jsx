import React from "react"
import { Grid, Typography, Box, } from "@material-ui/core"
import ButtonComponent from "../../home/ButtonComponent"
import "./styles.css"
import { navigate } from "gatsby"

const navToSignUp = () => {
    navigate("/registration/sign-up")
}

const GetStartedButtonComponent_I = () => {
    return (
        <Box className="GETSTARTED-I-outer-border-control">

            <Box className="GETSTARTED-I-border-control">

                <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                >
                    <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className="GetStartedButton_I"
                    >
                            <ButtonComponent  message="GET STARTED" variant="contained" onClick={navToSignUp}/>
                    </Grid>
                    
                </Grid>

            </Box>
            
        </Box>
    )
}

export default GetStartedButtonComponent_I
import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"

import ButtonComponent from "../ButtonComponent"

import iMacProImg from "../../../ui-resources/home/WhatIsUImpactifyPage/iMacProWelcome.svg"
import "./styles.css"
import { navigate } from "gatsby"

/**
 * Page that explains UImpactify briefly
 *
 * @example
 * return(
 *  <WhatIsUImpactify />
 * )
 */

const WhatIsUImpactify = () => {
  const navToSignUp = () => {
    navigate("/registration/sign-up")
  }

  return (
    <Box className="outer-border-control-home-what-is">
      <Box className="border-control-home-what-is">
        <Grid
          container
          justify="center"
          alignItems="center"
          className="what-is-uimpactify-grid"
          direction="row"
        >
          <Grid
            className="welcome-text-grid"
            item
            justify="center"
            alignItems="center"
            xs={6}
          >
            <Grid item className="what-is-grid-item">
              <Typography variant="subtitle1">
                <Box color="#7A7A7A">What is UImpactify?</Box>
              </Typography>
            </Grid>
            <Grid item className="uimpactify-desc-item">
              <Typography variant="h3">
                An online learning platform
                <br /> for social entrepreneurs
                <br /> and intrapreneurs
              </Typography>
            </Grid>
            <ButtonComponent
              message="GET STARTED"
              variant="contained"
              onClick={navToSignUp}
            />
          </Grid>
          <Grid item xs={3}>
            <img className="imac-img" src={iMacProImg} alt="imac" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WhatIsUImpactify

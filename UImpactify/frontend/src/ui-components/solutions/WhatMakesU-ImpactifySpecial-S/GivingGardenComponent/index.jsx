import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import GivingGarden from "../../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-S/GivingGarden.svg"
import { navigate } from "gatsby"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const GivingGardenComponent = () => {
  const useStyles = makeStyles(theme => ({
    btn: {
      borderRadius: "0.5rem",
      backgroundColor: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      borderColor: "#A78EC3",
      marginTop: "3rem",
    },
    root: {
      color: "#FFFFFF",
      backgroundColor: "#A78EC3",
      "&:hover": {
        backgroundColor: "#A78EC3",
      },
      padding: "0.5rem",
      borderRadius: "0.5rem",
    },
  }));

  const classes = useStyles();

  const navToAbout = () => {
    navigate("/about")
  }

  

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs={5}>
        <img className="pic" src={GivingGarden} alt="GivingGarden" />
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        xs={5}
        className="giving_garden_test"
      >
        <Grid container className="title">
          <Typography variant="h4">
            <Box >The Giving Garden</Box>
          </Typography>
        </Grid>
        <Grid item className="uimpactify-desc-item">
          <Typography variant="h7">
            Volunteer or work with our social initiative partners 
            with what your learnt from our classes.
          </Typography>
        </Grid>
        <Grid container justify = "center" alignItems="center">
          <Button className={classes.btn} variant="outlined" onClick={navToAbout}>
            
            <Typography variant="text" color="#A78EC3">
              <Box color="#A78EC3">
                LEARN MORE
              </Box>
            </Typography>
          </Button>
        </Grid>
        
      </Grid>
    </Grid>
  )
}

export default GivingGardenComponent

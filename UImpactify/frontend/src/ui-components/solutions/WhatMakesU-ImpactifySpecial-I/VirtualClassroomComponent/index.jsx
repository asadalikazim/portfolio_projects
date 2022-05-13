import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import VirtualClassroom from "../../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-I/VirtualClassroom.svg"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const VirtualClassroomComponent = () => {
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

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs={5}>
        <img className="pic" src={VirtualClassroom} alt="VirtualClassroom" />
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        xs={5}
        className="giving_garden_test"
      >
        <Grid container className="title" >
          <Typography variant="h4">
            <Box >Double down on the virtual classroom.</Box>
          </Typography>
        </Grid>
        <Grid container >
          <Typography variant="h7">
            Create customized lessons or use our 
            templates designed to create maximum engagement.
          </Typography>
        </Grid>
        
        
      </Grid>
    </Grid>
  )
}

export default VirtualClassroomComponent

import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"

import MonitorLearningProgress from "../../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-I/MonitorLearningProgress.svg"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const MonitorLearningProgressComponent = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
    >
      
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        xs={5}
        className="giving_garden_text"
      >
        <Grid container className="title">
          <Typography variant="h4">
            <Box >Monitor learning progress</Box>
          </Typography>
        </Grid>
        <Grid container className="content">
          <Typography variant="h7">
            Collect data about the average & individual performance of your classes. 
            This helps you to identify what works well in your class, and what is not.
          </Typography>
        </Grid>
        
      </Grid>

      <Grid
        container
        xs={5}
        justify="flex-end"
        alignItems="flex-end"
      >
        <img className="pic" src={MonitorLearningProgress} alt="MonitorLearningProgress" />
      </Grid>
    </Grid>
  )
}

export default MonitorLearningProgressComponent

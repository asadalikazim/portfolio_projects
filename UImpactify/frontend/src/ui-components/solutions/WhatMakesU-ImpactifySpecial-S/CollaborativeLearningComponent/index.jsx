import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"

import CollaborativeLearning from "../../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-S/CollaborativeLearning.svg"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const CollaborativeLearningComponent = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="CollaborativeLearningComponent"
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
            <Box >Collaborative learning</Box>
          </Typography>
        </Grid>
        <Grid container className="content">
          <Typography variant="h7">
            Learn as a group by participating in the chat room, whiteboard,
            and discussion thread.
          </Typography>
        </Grid>
        
      </Grid>

      <Grid
        container
        xs={5}
        justify="flex-end"
        alignItems="flex-end"
        className="CollaborativeLearning_img"
      >
        <img className="pic" src={CollaborativeLearning} alt="CollaborativeLearning" />
      </Grid>
    </Grid>
  )
}

export default CollaborativeLearningComponent

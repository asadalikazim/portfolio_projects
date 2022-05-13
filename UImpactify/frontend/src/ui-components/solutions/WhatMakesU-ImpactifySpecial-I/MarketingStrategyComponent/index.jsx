import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"

import MarketingStrategy from "../../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-I/MarketingStrategy.svg"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const MarketingStrategyComponent = () => {
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
            <Box >Marketing strategy</Box>
          </Typography>
        </Grid>
        <Grid container className="content">
          <Typography variant="h7">
            We provide you guides to strategize your class.
          </Typography>
        </Grid>
        
      </Grid>

      <Grid
        container
        xs={5}
        justify="flex-end"
        alignItems="flex-end"
      >
        <img className="pic" src={MarketingStrategy} alt="MarketingStrategy" />
      </Grid>
    </Grid>
  )
}

export default MarketingStrategyComponent

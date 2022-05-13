import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import VirtualClassroomComponent from "./VirtualClassroomComponent"
import MarketingStrategyComponent from "./MarketingStrategyComponent"
import HassleFreeBusinessComponent from "./HassleFreeBusinessComponent"
import MonitorLearningProgressComponent from "./MonitorLearningProgressComponent"

import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const WhatMakesUImpactifySpecial_I = () => {
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
    <Box className="border-control-why-uimpactify">
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className="why-uimpactify-grid"
        direction="column"
      >
        <Grid
          className="What-Makes-U-Impactify-Special"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h4">What Makes U-Impactify Special?</Typography>
        </Grid>
        
        <VirtualClassroomComponent />
        <MarketingStrategyComponent />
        <HassleFreeBusinessComponent />
        <MonitorLearningProgressComponent />
        
        
      </Grid>
    </Box>
  )
}

export default WhatMakesUImpactifySpecial_I

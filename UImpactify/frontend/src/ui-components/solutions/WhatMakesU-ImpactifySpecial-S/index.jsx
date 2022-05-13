import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import GivingGardenComponent from "./GivingGardenComponent"
import CollaborativeLearningComponent from "./CollaborativeLearningComponent"
import BeyondTheClassroom from "../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-S/BeyondTheClassroom.svg"
import Supports from "../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-S/Supports.svg"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const WhatMakesUImpactifySpecial_S = () => {
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
        
        <GivingGardenComponent />
        <CollaborativeLearningComponent />
        <Grid container justify="center" xs={10}>
          <img className="pic" src={BeyondTheClassroom} alt="BeyondTheClassroom" />
        </Grid>
        <Grid container justify="center" xs={10}>
          <img className="pic" src={Supports} alt="Supports" />
        </Grid>
        
      </Grid>
    </Box>
  )
}

export default WhatMakesUImpactifySpecial_S

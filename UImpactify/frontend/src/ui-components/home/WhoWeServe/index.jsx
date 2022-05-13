import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"

import SponsorsImg from "../../../ui-resources/home/WhoWeServePage/Sponsors.svg"
import "./styles.css"

/**
 * Page that list UImpactify's sponsors
 *
 * @example
 * return(
 *  <WhoWeServe />
 * )
 */

const WhoWeServe = () => {
  return (
    <Box className="outer-border-control-who-we">
      <Box className="border-control-who-we">
        <Grid
          container
          justify="center"
          alignItems="center"
          className="who-we-serve-grid"
          direction="column"
        >
          <Grid
            item
            container
            className="who-we-serve-grid-title"
            justify="center"
            alignItems="center"
            xs={12}
          >
            <Typography variant="h4">Who We Serve</Typography>
          </Grid>
          <Grid item xs={12}>
            <img className="sponsor-img" src={SponsorsImg} alt="sponsors" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WhoWeServe

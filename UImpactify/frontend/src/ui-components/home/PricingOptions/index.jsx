import React from "react"
import { Grid, Typography } from "@material-ui/core"

import PriceCards from "./components"

import "./styles.css"

/**
 * Page that Prices options for students and business
 *
 * @example
 * return(
 *  <PricingOptions />
 * )
 */

const PricingOptions = () => {
  const profiles = [
    {
      key: 1,
      name: "Individual",
      desc: "1-month free trial \
        then the CA$34.99/month",
    },
    {
      key: 2,
      name: "Business",
      desc: "1-month free trial \
          then the CA$288/year",
    },
  ]

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="option-grid"
      direction="column"
    >
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Select a learning plan for your
          <br /> 1 month free trial
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">You can cancel anytime</Typography>
      </Grid>

      <Grid //this one
        item
        container
        className="option-grid-title"
        justify="center"
        alignItems="center"
        xs={12}
      ></Grid>

      <Grid item container direction="row" justify="center">
        {profiles.map(profile => (
          <PriceCards key={profile.key} data={profile} />
        ))}
      </Grid>
    </Grid>
  )
}

export default PricingOptions

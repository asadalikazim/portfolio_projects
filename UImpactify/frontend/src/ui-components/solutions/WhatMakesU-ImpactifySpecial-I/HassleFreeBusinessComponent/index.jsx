import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import HassleFreeBusiness from "../../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-I/HassleFreeBusiness.svg"
import "./styles.css"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const HassleFreeBusinessComponent = () => {
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
        <img className="pic" src={HassleFreeBusiness} alt="HassleFreeBusiness" />
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
            <Box >Hassle-Free Business</Box>
          </Typography>
        </Grid>
        <Grid container >
          <Typography variant="h7">
            Automate financial transactions and 
            track customer analytics with ease.
          </Typography>
        </Grid>
        
        
      </Grid>
    </Grid>
  )
}

export default HassleFreeBusinessComponent

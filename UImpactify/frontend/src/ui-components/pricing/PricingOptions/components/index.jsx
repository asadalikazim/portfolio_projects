import React from "react"
import { Grid, Typography, Box, } from "@material-ui/core"
import ButtonComponent from "ButtonComponent"

import "./styles.css"

/**
 * Component to list Testimonials of students about teachers
 *
 * @param {Object} props
 * @param {Object} props.data Testimonial datas
 *
 * @example
 * return(
 *  <PriceCards
 *   data={}
 *  />
 * )
 */

const PriceCards = ({ data }) => {
  return (
    <Box className="PO-box">
      <Grid
        xs={12}
        container
        justify="flex-start"
        alignItems="flex-start"
        align="center"
      >
        <Grid
          className="PC-title"
          item
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h5">{data.name}</Typography>
        </Grid>
        <Box mt={3}>
          <Grid
            className="PC-desc"
            item
            container
            justify="center"
            alignItems="center"
          >
            <Typography variant="caption">{data.desc}</Typography>
          </Grid>
        </Box>
        <Box mt={4}>
          <Grid>
            <ButtonComponent message="Try For Free" variant="contained" />
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}

export default PriceCards

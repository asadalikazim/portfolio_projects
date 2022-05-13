import React from "react"
import { Grid, Typography } from "@material-ui/core"

import "./styles.css"

const ImgTitleDescComponent_I = ({ data }) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      xs={3}
    >
      <Grid
        className="ImgTitleDescComponent_I-img"
        item
        container
        justify="center"
        alignItems="center"
      >
        <img src={data.img} alt={data.imgAlt} />
      </Grid>

      <Grid
        className="ImgTitleDescComponent_I-title"
        item
        container
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5">{data.title}</Typography>
      </Grid>

      <Grid
        className="ImgTitleDescComponent_I-desc"
        item
        container
        justify="center"
        alignItems="center"
      >
        <Typography variant="body1" align="center">
          {data.desc}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ImgTitleDescComponent_I

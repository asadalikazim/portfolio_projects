import React from "react"
import { Grid, Typography } from "@material-ui/core"

import "./styles.css"

const ImgTitleDescComponent_S = ({ data }) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      xs={4}
    >
      <Grid
        className="ImgTitleDescComponent_S-img"
        item
        container
        justify="center"
        alignItems="center"
      >
        <img src={data.img} alt={data.imgAlt} />
      </Grid>

      <Grid
        className="ImgTitleDescComponent_S-title"
        item
        container
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5">{data.title}</Typography>
      </Grid>

      <Grid
        className="ImgTitleDescComponent_S-desc"
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

export default ImgTitleDescComponent_S

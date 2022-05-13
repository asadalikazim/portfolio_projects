import React from "react"
import { Grid, Typography } from "@material-ui/core"

import "./styles.css"

const ImgTitleDesc = ({ data }) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      xs={3}
    >
      <Grid
        className="imgTitleDesc-img"
        item
        container
        justify="center"
        alignItems="center"
      >
        <img src={data.img} alt={data.imgAlt} />
      </Grid>

      <Grid
        className="imgTitleDesc-title"
        item
        container
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5">{data.title}</Typography>
      </Grid>

      <Grid
        className="imgTitleDesc-desc"
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

export default ImgTitleDesc

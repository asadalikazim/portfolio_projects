import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"

import "./styles.css"

/**
 * Component to list Testimonials of students about teachers
 *
 * @param {Object} props
 * @param {Object} props.data Testimonial datas
 *
 * @example
 * return(
 *  <LinkedInCards
 *   data={}
 *  />
 * )
 */

const LinkedInCards = ({ data }) => {
  return (
    <Box className="LIC-box">
      <Grid
        xs={12}
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
      >
        <Grid item justify="flex-start" alignItems="flex-start">
          <Grid
            className="LIC-avatar"
            container
            justify="center"
            alignItems="center"
            direction="row"
          >
            <Grid item>
              <img
                className="LIC-instructor-avatar"
                src={data.avatar}
                alt={data.name}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">{data.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="LIC-occupation"
          item
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="body1">{data.occupation}</Typography>
        </Grid>
        <Grid
          className="LIC-desc"
          item
          container
          justify="center"
          alignItems="center"
        >
          <Typography variant="caption">{data.desc}</Typography>
        </Grid>
        <Grid item justify="center" alignItems="center" xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="row"
          >
            <Button type="button" href={data.url}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                direction="row"
              >
                <Grid item>
                  <img
                    className="LIC-student-avatar"
                    src={data.studentAvatar}
                    alt={data.studentName}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="caption">{data.studentName}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LinkedInCards

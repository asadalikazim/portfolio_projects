import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import Lessons from "../../../../ui-resources/solutions/ExploreOurClasses/Lessons.svg"
import Tasks from "../../../../ui-resources/solutions/ExploreOurClasses/Tasks.svg"
import Video from "../../../../ui-resources/solutions/ExploreOurClasses/Video.svg"
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

const ClassesCards = ({ data }) => {
  return (
    <Box className="class-box">

      <Grid
        xs={12}
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="cloumn"
      >
        <Grid
          container
          xs={12}
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
        >
          <img
            src={data.background}
            alt={data.name}
          />
        </Grid>

        <Grid container justify="flex-start" alignItems="flex-start">

          <Grid
            className="avatarAndName"
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
          >
            <Grid item>
              <Grid container className="avatar">
                <img
                  src={data.avatar}
                  alt={data.name}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Grid container className="name">
                <Box color="#FFFFFF">
                  <Typography variant="caption" color="#FFFFFF">{data.name}</Typography>
                </Box>
              </Grid>
            </Grid>

          </Grid>

        </Grid>

        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          className="occupation"
        >
          <Typography variant="h7">{data.occupation}</Typography>
        </Grid>

        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item >
            <Grid
              container
              className="tag"
            >
              <img src={Lessons} alt="Lessons" />
            </Grid>
          </Grid>
          
          <Typography variant="body">{data.lessons} lessons</Typography>

          <Grid item >
            <Grid
              container
              className="tag"
            >
              <img src={Tasks} alt="Tasks" />
            </Grid>
          </Grid>
          
          <Typography variant="body">{data.tasks} tasks</Typography>

          <Grid item >
            <Grid
              container
              className="tag"
            >
              <img src={Video} alt="Video" />
            </Grid>
          </Grid>
          
          <Typography variant="body">{data.minutes} minutes</Typography>
        </Grid>

        
      </Grid>
    </Box>
  )
}

export default ClassesCards

import React from "react"
import { Grid, Typography } from "@material-ui/core"

import ButtonComponent from "../ButtonComponent"

import DemoPerson1 from "../../../ui-resources/home/TestimonialsPage/DemoPerson1.svg"
import DemoPerson2 from "../../../ui-resources/home/TestimonialsPage/DemoPerson2.svg"
import DemoPerson3 from "../../../ui-resources/home/TestimonialsPage/DemoPerson3.svg"
import DemoStudent1 from "../../../ui-resources/home/TestimonialsPage/DemoStudent1.svg"
import DemoStudent2 from "../../../ui-resources/home/TestimonialsPage/DemoStudent2.svg"
import DemoStudent3 from "../../../ui-resources/home/TestimonialsPage/DemoStudent3.svg"

import LinkedInCards from "./LinkedInCards"
import "./styles.css"

import { navigate } from "gatsby"

/**
 * Page that list testimonials from students about teahers
 *
 * @example
 * return(
 *  <Testimonials />
 * )
 */

const Testimonials = () => {
  const profiles = [
    {
      key: 1,
      avatar: DemoPerson1,
      name: "Alexa",
      occupation: "Business Fundamentals",
      desc:
        "Alexa is an amazing instructor. \
        He has lots of great examples. \
        Once I completed the course I found myself read to get \
        started in my business journey.",
      url: "https://www.linkedin.com",
      studentAvatar: DemoStudent1,
      studentName: "Sherly",
    },
    {
      key: 2,
      avatar: DemoPerson2,
      name: "Kathryn Nguyen",
      occupation: "Business Strategy",
      desc:
        "Kathryn is an amazing instructor. \
        Her lessons are easy to follow. Once I completed the course \
        I found myself read to get started in my business journey.",
      url: "https://www.linkedin.com",
      studentAvatar: DemoStudent2,
      studentName: "Sean",
    },
    {
      key: 3,
      avatar: DemoPerson3,
      name: "Diane Miles",
      occupation: "UX Design",
      desc:
        "U-Impactify has accelerated my teaching process \
        and made online learning fun again! I love what U-Impactify \
        stands for and I can’t imagine myself using anything else.",
      url: "https://www.linkedin.com",
      studentAvatar: DemoStudent3,
      studentName: "Adam",
    },
  ]

  const navToSignUp = () => {
    navigate("/registration/sign-up")
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="testimonials-grid"
      direction="column"
    >
      <Grid
        item
        container
        className="testimonials-grid-title"
        justify="center"
        alignItems="center"
        xs={12}
      >
        <Typography variant="h4">Testimonials</Typography>
      </Grid>
      <Grid item container direction="row" justify="center">
        {profiles.map(profile => (
          <LinkedInCards key={profile.key} data={profile} />
        ))}
      </Grid>
      <Grid item xs={12}>
        <ButtonComponent
          message="GET STARTED"
          variant="contained"
          onClick={navToSignUp}
        />
      </Grid>
    </Grid>
  )
}

export default Testimonials

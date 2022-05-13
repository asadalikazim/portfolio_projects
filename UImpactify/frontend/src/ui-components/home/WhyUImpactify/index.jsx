import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"

import ButtonComponent from "../ButtonComponent"
import ImgTitleDesc from "../ImgTitleDescComponent"

import SpecializedImg from "../../../ui-resources/home/WhyUImpactifyPage/SpecializedImage.svg"
import GivingGardenImg from "../../../ui-resources/home/WhyUImpactifyPage/GivingGarden.svg"
import ResourcesImg from "../../../ui-resources/home/WhyUImpactifyPage/Resources.svg"
import "./styles.css"

import { navigate } from "gatsby"

/**
 * Page that list features of UImpactify
 *
 * @example
 * return(
 *  <WhyUImpactify />
 * )
 */

const WhyUImpactify = () => {
  const UImpactifyFeatures = [
    {
      key: 0,
      img: SpecializedImg,
      imgAlt: "SpecializedImg",
      title: "Specialized",
      desc:
        "Specialized in social entrepreneurship, non-profits, charities, and sustainability movements",
    },
    {
      key: 1,
      img: GivingGardenImg,
      imgAlt: "GivingGardenImg",
      title: "The Giving Garden",
      desc:
        "We donate to your choice of charity on your behalf when you complete a course",
    },
    {
      key: 2,
      img: ResourcesImg,
      imgAlt: "ResourcesImg",
      title: "Resources",
      desc:
        "Consisting of coaching as well as online communities and offline meetups",
    },
  ]

  const navToAbout = () => {
    navigate("/about")
  }

  return (
    <Box className="border-control-why-uimpactify">
      <Grid
        container
        justify="center"
        alignItems="center"
        className="why-uimpactify-grid"
        direction="column"
      >
        <Grid
          className="why-uimpactify-grid-title"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h4">Why U-Impactify</Typography>
        </Grid>
        <Grid
          container
          className="why-uimpactify-grid-points"
          item
          justify="center"
          alignItems="center"
          xs={12}
          direction="row"
        >
          {UImpactifyFeatures.map(features => (
            <ImgTitleDesc key={features.key} data={features} />
          ))}
        </Grid>
        <Grid className="why-uimpactify-grid-button" item xs={12}>
          <ButtonComponent
            message="Learn More About What U-Impactify Does"
            variant="contained"
            onClick={navToAbout}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default WhyUImpactify

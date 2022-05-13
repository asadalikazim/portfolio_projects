import React from "react"
import { Grid, Typography, Box, Button, hexToRgb } from "@material-ui/core"
import Plan from "../../../ui-resources/solutions/TeachOrCoachForStudentsSuccess/Plan.svg"
import Create from "../../../ui-resources/solutions/TeachOrCoachForStudentsSuccess/Create.svg"
import Teach from "../../../ui-resources/solutions/TeachOrCoachForStudentsSuccess/Teach.svg"
import ManageYourEarning from "../../../ui-resources/solutions/TeachOrCoachForStudentsSuccess/ManageYourEarning.svg"
import ImgTitleDescComponent_I from "../ImgTitleDescComponent_I"
import "./styles.css"

/**
 * Page that explains UImpactify briefly
 *
 * @example
 * return(
 *  <SolutionsComponent />
 * )
 */


const TeachOrCoachForStudentsSuccess_I = () => {
  const UImpactifyFeatures = [
    {
      key: 0,
      img: Plan,
      imgAlt: "Plan",
      title: "Plan",
      desc: ""
    },
    {
      key: 1,
      img: Create,
      imgAlt: "Create",
      title: "Create",
      desc: ""
    },
    {
      key: 2,
      img: Teach,
      imgAlt: "Teach",
      title: "Teach",
      desc: ""
    },
    {
      key: 3,
      img: ManageYourEarning,
      imgAlt: "ManageYourEarning",
      title: "Manage your earning",
      desc: ""
    },
  ]

  return (
    <Box className="TeachOrCoach-outer-border-control">
      <Box className="TeachOrCoach-border-control">
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          className="TeachOrCoach-grid"
          direction="column"
        >
          <Grid
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className="Develop_student"
          >
            <Grid
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="h4">Teach or Coach for Students’ Success</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className="Develop-content"
            >
              <Typography variant="h6">Host live sessions with students and clients, anywhere, anytime with the U-Impactify.</Typography>
            </Grid>
          </Grid>
          
          <Grid
            container
            className="Develop_icons"
            item
            justify="space-between"
            alignItems="center"
            xs={12}
            direction="row"
          >
              {UImpactifyFeatures.map(features => (
                <ImgTitleDescComponent_I key={features.key} data={features} />
              ))}
          </Grid>
         
            
          
          
        </Grid>
      </Box>
    </Box>
    
  )
}
export default TeachOrCoachForStudentsSuccess_I

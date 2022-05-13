import React from "react"
import { Grid, Typography, Box, Button, hexToRgb } from "@material-ui/core"
import Workspace from "../../../ui-resources/solutions/DevelopNewSkillsAndKnowledge/Workspace.svg"
import Licence from "../../../ui-resources/solutions/DevelopNewSkillsAndKnowledge/Licence.svg"
import Donate from "../../../ui-resources/solutions/DevelopNewSkillsAndKnowledge/Donate.svg"
import ImgTitleDescComponent_S from "../ImgTitleDescComponent_S"
import "./styles.css"

/**
 * Page that explains UImpactify briefly
 *
 * @example
 * return(
 *  <SolutionsComponent />
 * )
 */


const DevelopNewSkillsAndKnowledge_S = () => {
  const UImpactifyFeatures = [
    {
      key: 0,
      img: Workspace,
      imgAlt: "Workspace",
      title: "Learn",
      desc: ""
    },
    {
      key: 1,
      img: Licence,
      imgAlt: "Licence",
      title: "Complete & Recieve a certificate",
      desc: ""
    },
    {
      key: 2,
      img: Donate,
      imgAlt: "Donate",
      title: "Donate",
      desc: ""
    },
  ]

  return (
    <Box className="outer-border-control-what-is">
      <Box className="border-control-what-is">
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          className="Develop-grid"
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
              <Typography variant="h4">Develop New Skills and Knowledge</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              className="Develop-content"
            >
              <Typography variant="h6">Enhance your skills sets and knowledges to advance your business.</Typography>
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
                <ImgTitleDescComponent_S key={features.key} data={features} />
              ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
    
  )
}
export default DevelopNewSkillsAndKnowledge_S

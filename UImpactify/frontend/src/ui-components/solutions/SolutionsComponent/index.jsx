import React from "react"
import { Grid, Typography, Box, } from "@material-ui/core"
import { createMuiTheme } from '@material-ui/core/styles';
import ButtonGroup2Component from "../ButtonGroup2Component"

import Michel from "../../../ui-resources/solutions/SolutionsComponent/Michel.svg"
import "./styles.css"

/**
 * Page that explains UImpactify briefly
 *
 * @example
 * return(
 *  <SolutionsComponent />
 * )
 */

const SolutionsComponent = ({isStudents, setIsStudents}) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#A78EC3',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
  });

  const isInstructorsHandler = (e) => {
    setIsStudents(false);
  };

  return (
    <Box className="SolutionsComponent-border-control">
      <Grid
        container
        justify="center"
        alignItems="center"
        className="SolutionsComponent-grid"
        direction="row"
      >
        <Grid className="solutions-text-grid">
          <Grid
            item
            justify="center"
            alignItems="center"
            xs={12}
          >
            <Grid item>
              <Typography variant="h2" className="title">
                <Box color="#3d3d3d"> Solutions</Box>
              </Typography>
            </Grid>

            <Grid container className="content">
              <Typography variant="h6">
                U-Impactify is an eLearning platform helps you to make
                <br /> an impact as you learn.
              </Typography>
            </Grid>

            <Grid container justify="flex-start" className="button2">
              <ButtonGroup2Component
                message1="Students" 
                message2="Instructors"
                variant="contained"
                isStudents={isStudents}
                setIsStudents={setIsStudents}
              />
            </Grid>
          </Grid>
        </Grid>

        

        <Grid container xs={6} justify="center">
          <img className="Michel" src={Michel} alt="Michel" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SolutionsComponent

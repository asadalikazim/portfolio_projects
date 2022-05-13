import React from "react"
import {
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"

import CheckIcon from "@material-ui/icons/Check"
import "./styles.css"
/**
 * Page that list testimonials from students about teahers
 *
 * @example
 * return(
 *  <Testimonials />
 * )
 */

const IncludedPlans = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="option-grid"
      direction="column"
    >
      <Typography variant="h3">All Plans Include</Typography>

      <Box align="left" pl={11} pt={8}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Access expert-led courses" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Get personalized course recommendations" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Earn a certificate when you complete a course " />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Practice with exercise files and quizzes" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Use project files to practice while you learn" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Download exercise files so you can pratice while you learn." />
          </ListItem>
        </List>
      </Box>
    </Grid>
  )
}

export default IncludedPlans

/*
check mark pict ure

*/

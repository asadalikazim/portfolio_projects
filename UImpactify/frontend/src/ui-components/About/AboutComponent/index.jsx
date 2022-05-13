import React from "react"
import { Grid, Typography, Box, List } from "@material-ui/core"
import Desktop from "../../../ui-resources/home/About/desktop.svg"
import WhatIsUIMPACTIFY_img from "../../../ui-resources/home/About/WhatIsUIMPACTIFY_img.svg"
import Initiative from "../../../ui-resources/home/About/Initiative.svg"
import Instructor from "../../../ui-resources/home/About/Instructor.svg"
import { makeStyles } from '@material-ui/core/styles';

const AboutComponent = () => {
  const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: "2rem",
    },
    img: {
      marginTop: "2rem",
      width: "50%",
      zIndex: 1,
      
    },
    content: {
      marginLeft: "12rem",
      marginRight: "12rem",
      marginTop: "3rem",
    },
    BG: {
      marginTop: "0rem",
      zIndex: 0,
      background: 'linear-gradient(180deg, #FFFFFF 30%, #E2F4F4 90%)',
      
    },
    content_grid: {
      marginTop: "0rem",
    },
    cards: {
      background: 'linear-gradient(180deg, #E2F4F4 90%, #E2F4F4 100%)',
      paddingBottom: "3rem",
      paddingTop: "2rem",
    },
    card_content: {
      marginLeft: "2rem",
      marginRight: "2rem",
    },
    card_Ini: {
      marginTop: "1.5rem",
    },
    list: {
      listStyleType: "lower-alpha",
      listStyle: "lower-alpha",
    },
    card_title_content: {
      marginTop: "-5rem",
      minwidth: "40%"
    },
  }));

  const classes = useStyles();

    return (
      <>
        <Box>
        
          <Grid container justify="center">
              <Grid container justify="center" className={classes.title}>
                <Typography variant="h3">
                  About U-Impactify
                </Typography>
              </Grid>
          </Grid>
            
          

          <Grid className={classes.BG}>
            <Grid container justify="center" zIndex="tooltip">
              <Grid container justify="center" className={classes.img}>
                  <img src={Desktop} />
              </Grid>
            </Grid>
              
            <Grid container className={classes.content_grid}>
              <Grid container justify="center">
                  <Grid container justify="center" className={classes.title}>
                    <Typography variant="h4">
                      What is U-IMPACTIFY ?
                    </Typography>
                  </Grid>
                  
              </Grid>

              <Grid container justify="center">
                <Grid container justify="center" className={classes.content}>
                  U-Impactify is an online learning platform that supports hybrid learning 
                (online learning & offline meetups) model. We are helping impact specialists 
                to create their best learning modules around social entrepreneurship and 
                21st-century skills. On the other side, social ventures and intrapreneurs
                will be part of this curated and gamified learning support group to grow and thrive.
                </Grid>
              </Grid>
            </Grid>

          </ Grid>

          <Grid container className={classes.cards}>
            <Grid container justify="center">
                <Grid container justify="center" className={classes.title}>
                  <Typography variant="h3">
                  What are we aiming for?
                  </Typography>
                </Grid>
            </Grid>

            <Grid container justify="space-around" direction="row">
              <Grid container justify="center" className={classes.card_Ini} xs={4}>

                <img src={Initiative}/>

                <Grid container className={classes.card_title_content}>
                  <Grid container justify="center">
                      <Grid container justify="center" className={classes.title}>
                        <Typography variant="h4">
                          Social Initiative
                        </Typography>
                      </Grid>
                      
                  </Grid>

                  <Grid container justify="center">
                    <Grid container justify="center" className={classes.card_content}>
                      <List className={classes.list}>
                        <Typography>
                        • Helps students to gain new skiills or knowledge to apply in their organization.
                        </Typography>
                        <Typography>
                        • Builds a learning community to share expertise and experience.
                        </Typography> 
                        
                      </List>
                    
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>


              <Grid container justify="center" className={classes.card_Ins} xs={4}>
                <img src={Instructor}/>

                <Grid container className={classes.card_title_content}>
                  <Grid container justify="center">
                      <Grid container justify="center" className={classes.title}>
                        <Typography variant="h4">
                          Instructors
                        </Typography>
                      </Grid>
                      
                  </Grid>

                  <Grid container justify="center">
                    <Grid container justify="center" className={classes.card_content}>
                      <List className={classes.list}>
                        <Typography>
                        • Helps instructors to get more clients.
                        </Typography>
                        <Typography>
                        • Helps instructor to create and manage their courses.
                        </Typography> 
                        
                      </List>
                    
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </Grid>


        </Box>
          
        
          
      </>
      
    )
  }

export default AboutComponent
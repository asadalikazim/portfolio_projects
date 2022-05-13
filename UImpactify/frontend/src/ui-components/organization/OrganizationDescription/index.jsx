import React from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const OrganizationDescription = ( {name, about} ) => {
  const useStyles = makeStyles((theme) => ({
    courseInfo: {
        marginLeft: "3rem",
        marginBottom: "2rem"
    },
    heading: {
        margin: "1rem",    
    },
    sideMessage: {
        margin: "1rem",
        marginLeft: "4rem"
    },
  }));

  const classes = useStyles();

  const organizationName = "Toronto Humane Society"

  const organizationDescription = "It is the mission of Toronto Humane Society to promote the humane \
                                   care and protection of all animals and to prevent cruelty and \
                                   suffering. Following no kill principles, Toronto Humane Society \
                                   aspires to be a best-in-class animal shelter – working in partnership \
                                   with the community to find creative solutions and improve outcomes \
                                   for all animals. Our 2020-2025 Strategic plan was created to guide \
                                   us as we work to achieve that ambitious goal. To learn more about our \
                                   work please visit the What We Do section of our website. To stay \
                                   informed on what’s happening at our shelter, subscribe to our weekly \
                                   e-newsletter or visit the News & Events section of our website. \
                                   Charitable Registration #: 11925 9513 RR0001"

    return (
      <>
        <Box>
            <Grid container xs={11} className={classes.courseInfo}>
                <Grid item xs={8} >
                    <Grid >
                        <Typography variant="h5" className={classes.heading}>
                            {name}
                        </Typography>
                    </Grid>
                        <Typography className={classes.heading}>
                            {about}
                        </Typography>
                </Grid>
                <Grid item xs={4}>
                     <Grid >
                        <Typography className={classes.sideMessage}>
                            For more information, please visit our website!
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>  
      </>
    )
  }

export default OrganizationDescription
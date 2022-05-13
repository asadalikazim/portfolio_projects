import React from "react"
import { Grid, Box, Typography, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from "@material-ui/lab"
import OrgImage from '../../../ui-resources/opportunity/organizationimage.svg'

const OrganizationTitle = ( {orgName, orgWebsite, orgAddress, orgPhone, orgRating} ) => {
  const useStyles = makeStyles((theme) => ({
    organization: {
        marginLeft: "3rem",
        marginBottom: "2rem",
        marginTop: "2rem"
    },
    image: {
        margin: "1rem",    
    },
    orginfo: {
        margin: ".5rem",
        marginLeft: "2rem"
    },
    button: {
        marginLeft: "1rem",
        marginTop: "2rem",
        marginRight: "1rem",
        border: "2px solid",
        color: "#A78EC3",
        backgroundColor: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#A78EC3",
          color: "#FFFFFF"
        },
        borderColor: "#A78EC3",
        borderRadius: ".8rem"
    },
    rating: {
        marginTop: "1rem",
        marginLeft: "3rem"
    }
  }));

  const classes = useStyles();

    return (
      <>
        <Box>
            <Grid className={classes.organization} >
                <Typography variant="h4" >
                    {orgName}
                </Typography>
            </Grid>
            <Grid container className={classes.organization} xs={11}>
                <Grid item xs={4} >
                        <Typography className={classes.image}>
                            <img src={OrgImage} />
                        </Typography>
                </Grid>
                <Grid container item xs={4} style={{ maxHeight: '1vh' }} className={classes.orginfo}>
                        <Typography className={classes.orginfo}>
                            NAME: {orgName}
                        </Typography>
                        <Typography className={classes.orginfo}>
                            LOCATION: {orgAddress}
                        </Typography>
                        <Typography className={classes.orginfo}>
                            PHONE: {orgPhone}
                        </Typography>
                </Grid>
                <Grid item xs={3}>
                     <Grid >
                        <Rating value={orgRating} precision={0.5} readOnly className={classes.rating}/>
                        <Button className={classes.button} href={orgWebsite}>
                            Visit our Website
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>  
      </>
    )
  }

export default OrganizationTitle
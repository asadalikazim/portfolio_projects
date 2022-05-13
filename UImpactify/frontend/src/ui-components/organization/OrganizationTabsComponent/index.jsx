import React from "react"
import { Grid, Box, Tabs, Tab, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import OrganizationDescription from "../OrganizationDescription";
import JobsAvailable from "../JobsAvailable";

const OrganizationTabsComponent = ( {orgName, orgAbout, orgId} ) => {
  const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: "2rem",
        marginRight: "2rem",
        color: "#FFFFFF",
        "&:hover": {
          color: "#FFFFFF"
        },
        // borderColor: "#9ED9D9",
        borderRadius: ".8rem"
    },
    buttonsLayout: {
        marginBottom: "2rem",
        backgroundColor: "#30D5C8",
        borderRadius: "1rem",
        width: "90%",
        justifyContent: "center"
        
    },
    message: {
      margin: "2rem",
      marginLeft: "4rem"
    }
  }));

  const classes = useStyles();

  const [selectedButton, setSelectedButton] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedButton(newValue);
  }
    return (
      <>
        <Box>
            <Grid container justify="center">
                <Tabs TabIndicatorProps={{style: {backgroundColor: "#FFFFFF", height: ".25rem"}}} 
                      value={selectedButton} onChange={handleChange} 
                      className={classes.buttonsLayout}
                      centered>

                    <Tab label="About us" className={classes.button}/>
                    <Tab label="Current Campaigns"  className={classes.button}/>
                    <Tab label="What can you do" className={classes.button}/>
                    <Tab label="Opportunities" className={classes.button}/>

                </Tabs>
            </Grid>
            <Grid>
                {selectedButton === 0 && <OrganizationDescription name={orgName} about={orgAbout}/>}
                {selectedButton === 1 && <Typography className={classes.message}>
                  Campaigns not available yet</Typography>}
                {selectedButton === 2 && <Typography className={classes.message}>
                  You can do a lot but not now</Typography>}
                {selectedButton === 3 && <JobsAvailable orgId={orgId}/>}

            </Grid>
        </Box>  
      </>
    )
  }

export default OrganizationTabsComponent
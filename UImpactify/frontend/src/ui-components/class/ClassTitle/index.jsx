import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import ClassBackground from '../../../ui-resources/class/classtitle.svg'

const ClassTitle = ({classTitle}) => {
  const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: "-15rem",
        marginBottom: "13rem"
    },
    background: {
        marginLeft: "3rem",
        marginRight: "3rem",
        width: "90%",
    },
    classname: {
        color: "#FFFFFF"
    }
  }));

  const classes = useStyles();

    return (
      <>
        <Box>
            <Grid container justify="center" className={classes.background}>
                <img src={ClassBackground} />
            </Grid>
            <Grid container justify="center" className={classes.title}>
               <Typography variant="h4" className={classes.classname}>
                    {classTitle}
               </Typography>
            </Grid>
        </Box>  
      </>
    )
  }

export default ClassTitle
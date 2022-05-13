import React from "react"
import { Grid, Box } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "gatsby"

const ToOrganizations = () => {
  const useStyles = makeStyles((theme) => ({
    title: {
      marginBottom: "1rem",
      marginLeft: "3rem"
    },
    link: {
        color: "#7A7A7A",
        "&:hover": {
            color: "#000000",
        }
    }
  }));

  const classes = useStyles();

    return (
      <>
        <Box>
            <Grid className={classes.title}>
                <Link className={classes.link} style={{ textDecoration: 'none' }} to="/dashboard/opportunities">
                    return to Explore Organizations
                </Link>
            </Grid>
        </Box>  
      </>
    )
  }

export default ToOrganizations
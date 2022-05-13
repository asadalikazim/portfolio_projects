import { Link } from "gatsby"
import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, colors } from "@material-ui/core"
import "../../ui-styles/base/header.css"
import Auth from "../../services/authorization/sign-in"
import {navigate} from "../../../.cache/gatsby-browser-entry";
import logo from "../../ui-resources/base/logo.svg";

const Header = () => {

  const handleSignOut = async () => {
    try {
      const response = await Auth.logout();
      if (response.status === 200) navigate('/');
    } catch (err) {
      console.log(err);
    }

  }

  const useStyles = makeStyles({
    contained_btn: {
      color: "#FFFFFF",
      minWidth: "15vh",
      backgroundColor: "#A78EC3",
      "&:hover": {
        backgroundColor: "#A78EC3",
      },
      margin: "0.5rem",
      boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
      borderRadius: "0.5rem",
    },
    link: {
      color: "#000000",
      backgroundColor: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      textDecoration: "none",
    },
    logo: {
      marginTop: "2.5rem",
      marginLeft: "3rem",
    },
    outlined_btn: {
      borderRadius: "0.5rem",
      minWidth: "15vh",
      color: "#A78EC3",
      backgroundColor: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      borderColor: "#A78EC3",
      textDecoration: "none",
    },
  });

  const classes = useStyles();

  return (<header>
    <Grid container>
      <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justify="flex-start"
          style={{flexGrow: `1`}}
          xs={6}
      >
        <Grid container xs={3}>
            <Link to="/" className={classes.logo}>
              <img src= {logo}/>
            </Link>
        </Grid>
        <Grid item xs={2}>
              <Link to="/about" className={classes.link}>
                About
              </Link>
        </Grid>
        <Grid item xs={2}>
            <Link to="/solutions" className={classes.link}>
              Solutions
            </Link>
        </Grid>
        <Grid item xs={2}>
            <Link to="/pricing" className={classes.link}>
              Pricing
            </Link>
        </Grid>
        
      </Grid>
      <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{flexGrow: `1`}}
          xs={6}
      >
        <Grid item xs={3}>
            <Link to="/registration/sign-up" className={classes.outlined_btn}>
              <Button className={classes.outlined_btn} variant="outlined">
                Sign Up
              </Button>
            </Link>
        </Grid>
        <Grid item xs={3}>
            <Link to="/registration/sign-in" className={classes.link}>
              <Button className={classes.contained_btn} variant="contained">
                LOGIN
              </Button>
            </Link>
        </Grid>
        
      </Grid>
    </Grid>
    
  </header>)
}

export default Header

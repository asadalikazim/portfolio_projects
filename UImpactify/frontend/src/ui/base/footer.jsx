import React from "react"
import { Link } from "gatsby"
import { Grid, Box, Typography, FormControl, Select, MenuItem } from "@material-ui/core"
import logo from "../../ui-resources/base/logo.svg"
import language from "../../ui-resources/base/language.svg"
import twitter from "../../ui-resources/base/twitter.svg"
import instagram from "../../ui-resources/base/instagram.svg"
import linkedin from "../../ui-resources/base/linkedin.svg"
import { makeStyles } from '@material-ui/core/styles';

const Footer = () => {

  const useStyles = makeStyles({
    outerbox: {
      backgroundColor: "#FAFAFA",
      minHeight: "50vh",
    },
    outerGrid: {
      minHeight: "50vh",
    },
    innerGrid: {
      marginTop: "2rem",
      minHeight: "30vh",
    },
    logoblock:{
      marginLeft: "5%",
    },
    logotext:{
      marginLeft: "2rem",
    },
    textlist:{
      marginLeft: "2rem",
      marginRight: "2rem",
    },
    followblock:{
      marginLeft: "5rem",
      marginRight: "1rem",
    },
    Selector: {
      minWidth: "5rem",
      maxHeight: "1.5rem",
      backgroundColor: "#FFFFFF",
      borderColor: "#000000",
      "&: hover": {
        backgroundColor: "#FFFFFF",
      }
    },
    languagelogo: {
      marginTop: "0.2rem",
      marginLeft: "0.5rem",
    },
    followlogo: {
      marginTop: "1rem",
      marginRight: "1.5rem",
    },
  })

  const classes= useStyles();

  return(
    <Box className={classes.outerbox} color="#A78EC3" borderTop={1} borderColor="#C6CACC"
    >
      <Grid
        container 
        className={classes.outerGrid}
        justify="center" 
        alignItems="center"
      >
        <Grid
        container 
        className={classes.innerGrid}
        style={{ flexGrow: `1` }} 
        justify="flex-start" 
        alignItems="flex-start"
        >
          <Grid container className={classes.logoblock} justify="center" xs={3}>
            <Grid item>
              <Grid container justify="flex-end">
                <Link
                  to="/"
                >
                  <img src={logo} />
                </Link>
              </Grid>
            </Grid>
            
            <Grid item>
              <Grid container className={classes.logotext}  direction="column" alignItems="flex-start">
                <Typography>uimpactify@gmail.com</Typography>
                <Typography>647-647-647</Typography>
                <Typography>U-Impactify Inc. Toronto</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container className={classes.textlist} alignItems="center" direction="column">
              Product
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Help Centre</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Platform</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Accessibility</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Terms of Use</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Privacy Policy</Link>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.textlist} alignItems="center" direction="column">
              Use Cases
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Non-Profits</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Governments</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Social Enterprises</Link>
              <Link to="/" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Charities</Link>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.textlist} alignItems="center" direction="column">
            About
              <Link to="/about" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >About Us</Link>
              <Link to="/about" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Contact Us</Link>
              <Link to="/about" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >Blog</Link>
              <Link to="/about" style={{ marginTop:"0.5rem", color: "black", textDecoration: `none` }} >FAQ</Link>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container className={classes.followblock} alignItems="center" direction="column">
              <Grid container className={classes.followUs} justify="flex-start">
                <Typography>
                  Follow Us
                </Typography>
                
                <Grid container justify="flex-start" >
                  <Link to="https://twitter.com/">
                    <img src={twitter} className={classes.followlogo}/>
                  </Link>
                  <Link to="https://www.instagram.com/">
                    <img src={instagram} className={classes.followlogo}/>
                  </Link>
                  <Link to="https://www.linkedin.com/">
                    <img src={linkedin} className={classes.followlogo}/>
                  </Link>
                </Grid>
              </Grid>

              <Grid container className={classes.languageblock} alignItems="flex-start" direction="column">
                <Grid container alignItems="flex-start">
                  <Grid item>
                    <Typography>Language</Typography> 
                  </Grid>

                  <Grid item>
                    <Grid container className={classes.languagelogo} alignItems="flex-start">
                      <img src={language} />
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <Select
                      value="10"
                      displayEmpty
                      className={classes.Selector}
                      variant="outlined"
                    >
                      <MenuItem value={10}>CA - English</MenuItem>
                      <MenuItem value={20}>CA - French</MenuItem>
                    </Select>
                  </FormControl>
                  
                </Grid>
                
              </Grid>
                
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default Footer

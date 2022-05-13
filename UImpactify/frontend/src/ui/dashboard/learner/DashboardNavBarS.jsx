import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Drawer, Button } from "@material-ui/core"
import BtnProvider from "./BtnProvider";
import logo from "../../../ui-resources/base/logo.svg";



const DashboardNavBarS = ({ pageTag, setpageTag }) => {

  const [isShowing, setIsShowing] = React.useState(false);
  
  const useStyles = makeStyles({
    outergrid: {
      minHeight: "10vh",
      boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
      borderRadius: "0rem 0rem 2rem 2rem",
    },
    barlogo: {
      marginTop: "2rem",
      marginLeft: "4rem",
    },
    logo: {
      marginTop: "1.8rem",
      marginLeft: "3.4rem",
    },
    Drawer: {
      boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
      borderRadius: "0rem 0rem 2rem 2rem",
    }
  });

  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsShowing(open);
  };

  return (
      <>
        <Drawer open = {isShowing} onClose={toggleDrawer(false)} className={classes.Drawer}>
          <Grid item>
            <img src= {logo} className={classes.barlogo}/>
          </Grid>
          <BtnProvider pageTag={pageTag} setpageTag={setpageTag} message={"dashboard"} />
          <BtnProvider pageTag={pageTag} setpageTag={setpageTag} message={"classes"} />
          <BtnProvider pageTag={pageTag} setpageTag={setpageTag} message={"social Initiatives"} />
        </Drawer>
        <Button onClick={() => setIsShowing(!isShowing)} style={{ backgroundColor: 'transparent' }}>
          <img src={logo} className={classes.logo}></img>
        </Button>
      </>
  )
}

export default DashboardNavBarS

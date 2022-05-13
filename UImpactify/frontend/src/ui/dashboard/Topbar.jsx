//EFF3F9
import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Drawer, Button, Typography, TextField, InputAdornment } from "@material-ui/core"
import DashboardNavBarS from "./learner/DashboardNavBarS";
import DashboardNavBarC from "./consultant/DashboardNavBarC";
import DashboardNavBarI from "./organization/DashboardNavBarI";
import search from "../../ui-resources/dashboard/Bars/search.svg";
import avatardemo from "../../ui-resources/dashboard/Bars/avatardemo.svg";
import message from "../../ui-resources/dashboard/Bars/message.svg";
import notification from "../../ui-resources/dashboard/Bars/notification.svg";
import signout from "../../ui-resources/dashboard/Bars/signout.svg";
import Auth from "../../services/authorization/sign-in";
import {navigate} from "gatsby";
import {INITIATIVE_ROLE, INSTRUCTOR_ROLE} from "../../utils/constants";


const Topbar = ({ role, pageTag, setpageTag }) => {
  
  const useStyles = makeStyles({
    outergrid: {
    },
    bargrid: {
        maxHeight: "10vh",
        width: "95%",
        marginTop: "2rem",
        marginRight: "0rem",
        boxShadow: "0.3rem 0.3rem 1rem 0rem rgba(120, 98, 188, 0.16)",
        borderRadius: "1rem",
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
    },
    title: {
        textTransform: "capitalize",
        color: "#A78EC3",
        marginLeft: "1rem",
        marginTop: "1rem",
    },
    search: {
        marginTop: "1.5rem",
    },
    TextField: {
        minWidth: "40vh",
        marginTop: "0.2rem",
    },
    icon: {
        marginTop: "0.4rem",
    },
  });

  const classes = useStyles();

  const processPageTag = () =>{
      if(pageTag == "reviews&Feedback"){
          return "Reviews and Feedback"
      }else if(pageTag == "billing&Marketing"){
        return "Billing and Marketing"
      }
      return pageTag
  }

  const getNavbar = () =>{
        if(role == INSTRUCTOR_ROLE){
            return <DashboardNavBarC pageTag={pageTag} setpageTag={setpageTag}/>
        }else if(role == INITIATIVE_ROLE){
            return <DashboardNavBarI pageTag={pageTag} setpageTag={setpageTag}/>
        }
        return <DashboardNavBarS pageTag={pageTag} setpageTag={setpageTag}/>
  }

    const handleSignOut = async () => {
        try {
            const response = await Auth.logout();
            if (response.status === 200) navigate('/');
        } catch (err) {
            console.log(err);
        }

    }

  return (
      <>
        <Grid container className={classes.outergrid} >
            <Grid xs={2}>
                {getNavbar()}
            </Grid>
            <Grid xs={10} >
                <Grid container className={classes.bargrid} alignItems="flex-start">
                    <Grid xs={6} >
                        <Typography className={classes.title} variant="h4">{processPageTag()}</Typography>
                    </Grid>

                    <Grid xs={3} >
                        <Grid container spacing={1} justify="flex-end" alignItems="flex-end">
                            <Grid item>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="input-with-icon-grid" 
                                    label="Search" 
                                    InputProps={{
                                        endAdornment: 
                                            <InputAdornment position="start">
                                                <img src={search} className={classes.search} />
                                            </InputAdornment>,
                                    }} 
                                    variant="outlined"
                                    className={classes.TextField}
                                    borderRadius="5rem"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container xs={3} justify="space-around" alignItems="center">
                        <img src={avatardemo} className={classes.icon}/>
                        <img src={message} className={classes.icon}/>
                        <img src={notification} className={classes.icon}/>
                        <Button onClick={() => handleSignOut()} style={{backgroundColor : "transparent"}}>
                            <img src={signout} className={classes.icon}/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </>
  )
}

export default Topbar
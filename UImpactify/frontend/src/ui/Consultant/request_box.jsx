import React from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import RequestCalls from "../../axios/RequestCalls"
import EnrolledCalls from "../../axios/EnrolledCalls"
import { useEffect } from "react"


const Request_box = ({ data, role }) => {
  
  const useStyles = makeStyles({
    outergrid: {
        minHeight: "10vh",
        width: "95%",
        marginTop: "2rem",
        marginRight: "0rem",
        boxShadow: "0.3rem 0.3rem 1rem 0rem rgba(120, 98, 188, 0.16)",
        borderRadius: "1rem",
      },
      text_box: {
        marginLeft: "0.5rem",
        marginTop: "0.2rem",
      },
      btn_outer: {
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
      },
      btn: {
        textTransform: "capitalize",
        width: "10rem",
        marginRight: "0.5rem",
        color: "#A78EC3",
      },
      selected_btn: {
        textTransform: "capitalize",
        width: "10rem",
        marginRight: "0.5rem",
        color: "#FFFFFF",
        backgroundColor: "#A78EC3",
        "&:hover": {
          backgroundColor: "#A78EC3",
        },
      }
  });

  const classes = useStyles();

  const handler = async (requestId, isAccept, courseId, studentId) => {
    try {
      const response = await RequestCalls.updateRequest(requestId, isAccept)
      if(studentId != null && isAccept){
        const response2 = await EnrolledCalls.setEnrolment(courseId, studentId)
        if (response2.status === 200) {
          alert("Student Enrollment Succesful!")
        } else {
          alert("Enrollment Failed :(")
        }
      }
    } catch (err){
      console.log(err);
    }
    navigate("/refresh")
  }

  const getAcceptBtn = (status) => {
    if (status == "ACCEPTED"){
      return <Button className={classes.selected_btn} variant="contained">accepted</Button>
    }
    return <Button className={classes.btn} variant="outlined" onClick={() => handler(data._id, true, data.courseId, data.studentId)}>accept</Button>
  }

  const getRejectBtn = (status) => {
    if (status == "REJECTED"){
      return <Button className={classes.selected_btn} variant="contained">rejected</Button>
    }
    return <Button className={classes.btn} variant="outlined" onClick={() => handler(data._id, false, data.courseId, data.studentId)}>reject</Button>
  }

  return(
      <Box className={classes.outergrid}>
        <Grid container direction="row">
          <Grid container className={classes.text_box}>
            <Box color="#A78EC3"><Typography>From {role}: {data.name}</Typography> </Box> 
          </Grid>
          <Grid container className={classes.text_box}>
            <Box color="#A78EC3"><Typography>Course: {data.courseName}</Typography> </Box> 
          </Grid>
          <Grid container className={classes.text_box}>
            <Box color="#A78EC3"><Typography> Description: {data.description} </Typography></Box> 
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid className={classes.btn_outer}>
            {getAcceptBtn(data.status)}
            {getRejectBtn(data.status)}
          </Grid>
        </Grid>
      </Box>
  )
}

export default Request_box
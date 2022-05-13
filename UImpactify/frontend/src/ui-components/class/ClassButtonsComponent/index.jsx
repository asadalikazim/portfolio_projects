import React, {useEffect} from "react"
import { Grid, Box, Tabs, Tab, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import Auth from "../../../services/authorization/sign-in";
import Description from "../ClassDescription";
import EnrolledCalls from "../../../axios/EnrolledCalls";
import Assignments from "../ClassAssignments";
import Lectures from "../ClassLectures";
import GivingGardenRequest from "../../../ui/giving-garden/GardenForm";
import {STUDENT_ROLE, CONSULTANT_ROLE, INITIATIVE_ROLE} from "../../../utils/constants";
import LoadingComponent from "../../LoadingComponent";
import Submissions from "../ClassSubmissions";

const ClassButtonsComponent = ({classDetails}) => {
  const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: "4rem",
        border: "2px solid",
        color: "#505050",
        backgroundColor: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#FFFFFF",
          borderColor: "#30D5C8",
          color: "#000000"
        },
        borderColor: "#30D5C8",
        borderRadius: ".8rem"
    },
    buttonsLayout: {
        marginBottom: "2rem"
    },
    message: {
      margin: "3rem",
      marginLeft: "4rem"
    }
  }));

  const classes = useStyles();

  const [selectedButton, setSelectedButton] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedButton(newValue);
  }

  const [user, setUser] = React.useState(null);
  const [enrolled, setEnrolled] = React.useState(null); 
  useEffect(   () => {
      const fetchData = async () => {
          try {
              const response = await Auth.getAuthUser((user) => setUser(user));
              if (response.status === 200) setUser(response.data);
              const response1 = await EnrolledCalls.getEnrolment(classDetails._id, response.data.id)
              if (response1.status === 200) {
                setEnrolled(true);
              } else {
                setEnrolled(false);
              }
          } catch (err){
              console.log(err);
              //setUser(null);
              setEnrolled(null);
          }
      };
      fetchData();
  }, []);

  const handleEnroll = async () => {
    const response = await EnrolledCalls.setEnrolment(classDetails._id, user.id)
    if (response.status === 200) {
      alert("Enrollment Succesful! Refresh the page to view lecture materials and assignments.")
      setEnrolled(true);
    } else {
      alert("Enrollment Failed :(")
    }
  }

  const handleGardenRequest = () => {
    alert("Redirecting to Request Page...")
  }

  if (!user) return <LoadingComponent/>

    if (!enrolled && (user.role === STUDENT_ROLE || user.role === INITIATIVE_ROLE)) {
      return (
      <>
        <Box>
            <Grid>
                <Tabs TabIndicatorProps={{style: {backgroundColor: "#30D5C8"}}} 
                      value={selectedButton} onChange={handleChange} 
                      className={classes.buttonsLayout}>

                    <Tab label="Course Info" className={classes.button} />
                    <Tab label="Enroll" className={classes.button}/>
                    {classDetails.givingGarden &&
                      <Tab label="Giving Garden" className={classes.button} />}

                </Tabs>

                {selectedButton === 0 && 
                <Description 
                  description={classDetails.description}
                  instructorId={classDetails.instructorId}
                  rating={classDetails.rating}
                />}
                {selectedButton === 1 && handleEnroll()}
                {selectedButton === 2 && <GivingGardenRequest classId={classDetails._id}/>}

            </Grid>
        </Box>  
      </>
    )
  }
  return (
    <>
      <Box>
          <Grid>
              <Tabs TabIndicatorProps={{style: {backgroundColor: "#30D5C8"}}} 
                    value={selectedButton} onChange={handleChange} 
                    className={classes.buttonsLayout}>

                  <Tab label="Course Info" className={classes.button} />
                  <Tab label="Lectures" className={classes.button} />
                  <Tab label="Announcements" className={classes.button}/>
                  <Tab label="Assignments" className={classes.button}/>
                  {classDetails.instructorId == user.id &&
                  <Tab label="Submissions" className={classes.button} />
                  }

              </Tabs>

              {selectedButton === 0 && 
              <Description 
                description={classDetails.description}
                instructorId={classDetails.instructorId}
                rating={classDetails.rating}
              />}
              {selectedButton === 1 && <Lectures classId={classDetails._id}/>}
              {selectedButton === 2 && 
              <Typography className={classes.message}>
                Announcements not available yet
              </Typography>}
              {selectedButton === 3 && <Assignments classId={classDetails._id}/>}
              {selectedButton === 4 && <Submissions classId={classDetails._id}/>}

          </Grid>
      </Box>  
    </>
  )
}

export default ClassButtonsComponent
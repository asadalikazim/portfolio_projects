import React, {useState, useEffect} from "react"
import {
  Paper,
  Grid,
  TextField,
  Container,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Button from "../../ui-components/home/ButtonComponent"
import Auth from "../../services/authorization/sign-in";
import LoadingComponent from "../../ui-components/LoadingComponent";
import courseImage from "../../ui-resources/consultant/create-class1.jpg"
import RequestCalls from "../../axios/RequestCalls"
import OrgCalls from "../../axios/OrgCalls"

const useStyles = makeStyles(() => ({
  root: {
    alignItems: "stretch",
    "&$checked": {
      color: "black",
    },
  },
  textField: {
    width: "95%",
    margin: 8,
  },
  checkBox: {
    color: "#A78EC3",
    size: "medium",
  },
  label: {
    marginLeft: "10px",
  },
  heading: {
    textAlign: "Left",
    color: "#A78EC3",
  },
}))

const GardenForm = ({classId}) => {
  const [requestDescription, setRequestDescription] = useState("");
  const [user, setUser] = useState(null);
  useEffect(   () => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser((user) => setUser(user));
        if (response.status === 200) setUser(response.data);
      } catch (err){
        console.log(err);
        setUser(null);
      }
    };
    fetchData();
  }, []);
  const style = useStyles()

  if (!user) return <LoadingComponent/>

  const handleSubmit = async event => {
    /**axios controller submit to backend */

    const finalObject =
    requestDescription === ""
      ? {}
      : {
          description: requestDescription,
          courseId: classId,
        }
        if (user.role === "STUDENT") {
            finalObject.studentId = user.id

        } else {
            const org = await OrgCalls.getOrgByUid(user.id)
            finalObject.organizationId = org.data._id
        }

    try {
      const response = await RequestCalls.addRequest(finalObject);
      if (response.status === 200) alert("Request Submitted!")
    } catch (err) {
      if (err.response.status === 409) alert("Submission Error! You already submitted a request :(")
      if (err.response.status === 400) alert("Description cannot be empty! Please try again!")
      if (err.response.status === 500) alert("Internal server error!")
      console.log(err);
    }
    event.preventDefault()
  }

  const requestMessage = "Thank you for your interest in using the giving garden! \
                          Please fill the description below with the details regarding \
                          your request. If you are a student, describe your interest and \
                          reasons to why you should receive a free enrollment into this class \
                          courtesy of Giving Garden. If you are an organization initiative, \
                          describe your interest and need from our class's instructor."

  return (
    <Container>
    <Grid item xs={12}>
      <Typography variant='h4' className={style.heading}>Giving Garden Form</Typography>
    </Grid>
    <Grid container space={0}>
      <Grid item xs={5}>
        <img alt="Teacher vector" src={courseImage} />
      </Grid>
      <Grid item xs={7}>

    <Container className={style.root}>
      <Paper variant="elevation" elevation={2}>
        <Grid container>
          <Grid item xs={12}>
            <Typography>
                Hi {user.name}! {requestMessage}               
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="requestDesc"
              label="Request Description"
              className={style.textField}
              helperText="Enter the details of your request"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setRequestDescription(e.target.value)}
              multiline
              required
            />
          </Grid>
          <Grid item xs={5}>
            <Button
              onClick={handleSubmit}
              message={"Submit Request"}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>

    </Grid>
      </Grid>
    </Container>
  )
}

export default GardenForm

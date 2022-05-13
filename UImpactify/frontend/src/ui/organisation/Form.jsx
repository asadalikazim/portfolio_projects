import React, {useState, useContext, useEffect} from "react"
import { Paper, Grid, TextField, Checkbox, Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Button from "../../ui-components/home/ButtonComponent/index";
import OrgCalls from "../../axios/OrgCalls";
import {navigate} from "gatsby";
import JobCalls from "../../axios/JobCalls";
import Auth from "../../services/authorization/sign-in";
import LoadingComponent from "../../ui-components/LoadingComponent";

const useStyles = makeStyles(() => ({
  textField: {
    width: "95%",
    margin: 8,
  },
  SubmitBtn: {
    backgroundColor: "#ccccff",
    position: "center",
    marginLeft: "42.5%",
    textColor: "white",
  },
  checkBox: {
    color: "black",
  },
}))

const Form = () => {
  const [jobName, setJobName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobLink, setJobLink] = useState("")
  const [volunteerOp, setVolunteerOp] = useState(false)
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);
  useEffect(   () => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser();
        const response2 = await OrgCalls.getOrgByUid(response.data.id);
        if (response.status === 200) {
          setUser(response.data);
          if (response2.status === 200) {
            console.log(response2.data)
            setOrg(response2.data);
          }
        }
      } catch (err){
        console.log(err);
        setUser(null);
      }
    };
    fetchData();
  }, []);
  const style = useStyles()


  if (!user || !org) return <LoadingComponent/>


  const handleSubmit = async event => {
    /**axios controller submit to backend */

    const finalObject = {
      name: jobName,
      description: jobDescription,
      orgId: org._id,
      volunteerOp: volunteerOp,
      opportunityLink: jobLink,
    

    }
    console.log(finalObject)
    const response = await JobCalls.addJob(finalObject)
    if (response.status === 200) alert("Your job has been made!");
    navigate('/dashboard');
    event.preventDefault();
  }

  return (
    <Container className={style.root}>
      <Paper variant="elevation" elevation={2}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="jobName"
              className={style.textField}
              label="Job Name"
              placeholder="Assistant Manager"
              helperText="Enter the position of job"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setJobName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="jobDescription"
              label="Job Description"
              className={style.textField}
              style={{ margin: 8 }}
              placeholder={
                "This job is about: \n 1. Managing daily operations of a NGO  \n 2. Make new connections with wide variety of people"
              }
              helperText="Enter a small description of the job"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setJobDescription(e.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="jobLink"
              className={style.textField}
              label="Opportunity Link"
              placeholder="https://ca.indeed.com/?r=us"
              helperText="Provide the link to the Volunteer/employement opportunity"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setJobLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>
              Is this job position a volunteer Opportunity?
              <Checkbox
                name="volunteerOp"
                checked={volunteerOp}
                className={style.checkBox}
                onChange={e => setVolunteerOp(e.target.checked)}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={style.SubmitBtn}
              onClick={handleSubmit}
              message={"Create Job"}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Form

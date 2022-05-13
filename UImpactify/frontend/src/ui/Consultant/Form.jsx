import React, {useState, useContext, useEffect} from "react"
import {
  Paper,
  Grid,
  TextField,
  Checkbox,
  Container,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Button from "../../ui-components/home/ButtonComponent"
import UserCalls from "../../axios/UserCalls";
import ClassCalls from "../../axios/ClassCalls";
import Auth from "../../services/authorization/sign-in";
import LoadingComponent from "../../ui-components/LoadingComponent";

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
}))

const Form = () => {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [givingGarden, setGivingGarden] = useState(false);
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
      classDescription === "" && className === ""
        ? {}
        : {
            name: className,
            description: classDescription,
            rating: 5,
            givingGarden,
            instructorId: user.id
          }
          console.log(finalObject)
    try {
      const response = await ClassCalls.addClass(finalObject);
      if (response.status === 200) {
        alert("Course has been made!")
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) alert("Internal server error!")
      else if (err.response.status === 400) {
        alert("Please fill out all fields!");
        return;
      }
    }
    event.preventDefault()
  }

  return (
    <Container className={style.root}>
      <Paper variant="elevation" elevation={2}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="courseName"
              className={style.textField}
              label="Course Name"
              placeholder="CSCC01: Intro To Comp Eng"
              helperText="Enter a name for the course"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setClassName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="courseDesc"
              label="Course Description"
              className={style.textField}
              placeholder={
                "This course is about: \n 1. Making teams and building projects \n 2. Learn new technology to create apps"
              }
              helperText="Enter the objectives of the course"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setClassDescription(e.target.value)}
              multiline
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" className={style.label}>
              Do you want to include Giving garden with this course
              <Checkbox
                name="givingGarden"
                checked={givingGarden}
                className={style.checkBox}
                onChange={e => {
                  setGivingGarden(e.target.checked)
                }}
              ></Checkbox>
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              onClick={handleSubmit}
              message={"Create Course"}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Form

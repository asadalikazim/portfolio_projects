import React, {useEffect} from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid,Typography } from "@material-ui/core"
import Auth from "../../services/authorization/sign-in"
import ClassCalls from "../../axios/ClassCalls"
import Request_by_class from "./request_by_class"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  heading: {
    textAlign: "Left",
    color: "#A78EC3",
  },
}))

/**
 * Helpful chunks
 * <TextField error id="standard-error" label="Error" defaultValue="Hello World" /> */

const Request = (() => {
  const style = useStyles()
  const [user, setUser] = React.useState(null)
  const [courses, setCourses] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser(user => setUser(user))
        const response2 = await ClassCalls.getClassByInstructor(response.data.id)
        console.log(response2.data)
        if (response.status === 200) setUser(response.data)
        if (response2.status === 200) setCourses(response2.data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    fetchData()
  }, [])

  if(!user || !courses){
    return <Grid></Grid>
  }else{
    return (
      <Container>
        <Grid container space={0}>
          {courses.map(course => (
              <Request_by_class course={course} />
          ))}
        </Grid>
      </Container>
    )
  }
  
  
  
}
)
export default Request
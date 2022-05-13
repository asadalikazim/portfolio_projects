import React, {useEffect} from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid,Typography,Divider } from "@material-ui/core"
import courseImage from "../../ui-resources/consultant/create-class1.jpg"
import Form from "./Form"
import UserCalls from "../../axios/UserCalls";

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

export default function CreateClass() {
  const style = useStyles()


  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant='h2' className={style.heading}>Create a new class</Typography>
      </Grid>
      <Grid container space={0}>
        <Grid item xs={5}>
          <img alt="Teacher vector" src={courseImage} />
        </Grid>
        <Grid item xs={7}>
          <Form />
        </Grid>
      </Grid>
    </Container>
  )
}

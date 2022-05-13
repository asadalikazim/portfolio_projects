import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid,Typography,Divider } from "@material-ui/core";
import JobImage from "../../ui-resources/organisation/JobVector.jpg";
import Form from "./Form";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  heading: {
    textAlign: "Left",
    color: "#7a34eb",
  },
  picture:{
      height:'330px',
      width:'450px',
      paddingLeft:'30px',

  }
}))

/**
 * Helpful chunks
 * <TextField error id="standard-error" label="Error" defaultValue="Hello World" /> */

export default function CreateJob() {
  const style = useStyles()
  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant='h2' className={style.heading}>Create a new Job</Typography>
        <Divider/>
      </Grid>
      <Grid container space={0}>
        <Grid item xs={5}>
          <img alt="Job vector" src={JobImage} className={style.picture} />
        </Grid>
        <Grid item xs={7}>
          <Form />
        </Grid>
      </Grid>
    </Container>
  )
}

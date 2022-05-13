import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid,Typography,Divider } from "@material-ui/core";
import organisationImage from "../../ui-resources/initiative/organisation.png";
import Form from "./Form";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems:'stretch'
  },
  heading: {
    textAlign: "Left",
    color: "#7a34eb",
    fontFamily:'Roboto,Helvetica,Times New Roman',
  },
}))

/**
 * Helpful chunks
 * <TextField error id="standard-error" label="Error" defaultValue="Hello World" /> */

export default function CreateClass() {
  const style = useStyles();
  return (
    <Grid container className={style.root}>
      <Grid item xs={12}>
        <Typography variant='h2' className={style.heading}>Create a New Organisation</Typography>
        <Divider/>
      </Grid>
      <Grid container space={1}>
        <Grid item xs={5}>
          <img alt="Organisation vector" src={organisationImage} />
        </Grid>
        <Grid item xs={7}>
          <Form />
        </Grid>
      </Grid>
    </Grid>
  )
}

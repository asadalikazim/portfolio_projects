import React from "react"
import { Button, Typography,ButtonGroup } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const ButtonGroup2Component = ({ message1, message2, variant, isStudents, setIsStudents }) => {
  const useStyles = makeStyles(theme => ({
    btn: {
      borderRadius: "0.5rem",
      width: "10rem",
    },
    root: {
      color: "#FFFFFF",
      width: "10rem",
      backgroundColor: "#A78EC3",
      "&:hover": {
        backgroundColor: "#A78EC3",
      },
      variant: { variant },
      padding: "0.5rem",
      borderRadius: "0.5rem",
    },
  }));

  const classes = useStyles();

  const isStudentsHandler = (e) => {
    setIsStudents(true);
  };
  
  const isInstructorsHandler = (e) => {
    setIsStudents(false);
  };

  if (isStudents) {
    return (
      <ButtonGroup disableElevation  color="primary" aria-label="contained primary button group">
        <Button onClick={isStudentsHandler} className={classes.root}>
          <Typography variant="text">{message1}</Typography>
        </Button>
        
        <Button onClick={isInstructorsHandler} className={classes.btn}>
          <Typography variant="text">{message2}</Typography>
        </Button>
      </ButtonGroup>
    )
  }
  return (
    <ButtonGroup disableElevation  color="primary" aria-label="contained primary button group">
      <Button onClick={isStudentsHandler} className={classes.btn}>
        <Typography variant="text">{message1}</Typography>
      </Button>
      <Button onClick={isInstructorsHandler} className={classes.root}>
        <Typography variant="contained">{message2}</Typography>
      </Button>
    </ButtonGroup>
  )
  
}

export default ButtonGroup2Component

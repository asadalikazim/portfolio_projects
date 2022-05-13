import React, { useState } from "react"
import { Paper, Grid, Typography, Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import Button from "../../ui-components/dashboard/ButtonComponent/index"
import LectureCalls from "../../axios/LectureCalls"
import LectureDetails from "./lecture-details"

const useStyle = makeStyles(theme => ({
  root: {
    padding: "1%",
    display: "flex",
    flexWrap: "wrap",
  },
  createLectures: {
    textAlign: "Left",
    color: "#A78EC3",
    marginTop: "20px",
  },
  button: {
    marginLeft: "90%",
    backgroundColor: "#A78EC3",
    color: "#FFFF",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    "&:hover": {
      backgroundColor: "#ae8ae3",
      color: "#FFFF",
    },
  },
  fieldList: {
    padding: "5px",
    marginBottom: "1.5%",
    marginLeft: "5%",
    width: "80%",
  },
  listText: {
    paddingRight: "20%",
    color: "#3279a8",
  },
  deletebtn: {
    marginLeft: "5%",
    marginTop: "55%",
  },
  lectureText: {
    color: "#bd71b3",
  },
}))

const CreateLectures = ({ id }) => {
  const style = useStyle()
  const [lectures, setLectures] = useState([
    { name: null, description: null, url: null, classId: id },
  ])

  const handleChange = (i, event) => {
    const values = [...lectures]
    const fieldName = event.target.name
    values[i][fieldName] = event.target.value
    setLectures(values)
  }

  const handleAdd = () => {
    const values = [...lectures]
    values.push({ name: null, description: null, url: null, classId: id })
    setLectures(values)
  }

  const handleRemove = i => {
    const values = [...lectures]
    values.splice(i, 1)
    setLectures(values)
  }

  const handleUpload = () => {
    /**
     * Add the classId here if you can
     */
    if(lectures.length>0){
      LectureCalls.addLectures(lectures)
      .then(results => {
        if (
          results.reduce((flag, response) => {
            return flag && response.status === 200
          })
        ) {
          alert("Lectures added")
        }
      })
      .catch(err => {
        console.log(err)
        alert("Some problem occured.Please try again")
      })
 
    }else{
      alert("Add details for the lectures");
    }
     }

  return (
    <Grid container spacing={2} className={style.root}>
      <Grid item xs={12}>
        <Typography className={style.createLectures} variant="h2">
          Create Lectures
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Paper className={style.fieldList}>
        {lectures.map((lecture, idx) => {
          return <LectureDetails key={`Lecture ${idx}`} idx={idx} handleChange={handleChange} handleRemove={handleRemove} lecture={lecture} />
        })}
      </Paper>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline"
      >
        <Grid item>
          <Fab
            type="button"
            size="large"
            onClick={() => handleAdd()}
            className={style.button}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Button message={"Create Lectures"} onClick={handleUpload} />
        </Grid>
      </Grid>
      <Grid />
    </Grid>
  )
}
export default CreateLectures

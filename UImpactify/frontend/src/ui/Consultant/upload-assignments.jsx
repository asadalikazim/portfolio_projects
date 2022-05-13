import React, { useState } from "react"
import { Paper, Grid, Typography, Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import AssignmentCalls from "../../axios/AssignmentCalls"
import Button from "../../ui-components/dashboard/ButtonComponent/index"
import AssignmentDetails from "./assignment-details"

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
  fieldList: {},
}))

/*
  name: String,
  description: String,
  classId: Schema.Types.ObjectId,
  point: Number,
  duedate: Date,
*/
const CreateAssignments = ({ id }) => {
  const style = useStyle()
  const [assignments, setAssignments] = useState([
    { name: "", description: "", point: 0, duedate: "", link: "", classId: id },
  ])

  const handleChange = (i, event) => {
    const values = [...assignments]
    const fieldName = event.target.name
    values[i][fieldName] = event.target.value
    setAssignments(values)
  }

  const handleAdd = () => {
    const values = [...assignments]
    values.push({
      name: null,
      description: null,
      point: null,
      duedate: null,
      link: null,
      classId: id,
    })
    setAssignments(values)
  }

  const handleRemove = i => {
    const values = [...assignments]
    values.splice(i, 1)
    setAssignments(values)
  }

  const handleUpload = () => {
    /**
     * Add the classId here if you can
     */
    if(assignments.length>0){
      AssignmentCalls.addAssignments(assignments)
      .then(results => {
        if (
          results.reduce((flag, response) => {
            return flag && response.status === 200
          })
        ) {
          alert("Assignments added")
        }
      })
      .catch(err => {
        console.log(err)
        alert("Some problem occured.Please try again")
      })
    }else{
      alert("Add details for the assignments first")
    }
    
  }

  return (
    <Grid container spacing={2} className={style.root}>
      <Grid item xs={12}>
        <Typography className={style.createLectures} variant="h2">
          Create Assignments
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={style.fieldList}>
          {assignments.map((assignment, idx) => {
            return (
              <AssignmentDetails
                key={`Assignment ${idx}`}
                assignment={assignment}
                handleChange={handleChange}
                handleRemove={handleRemove}
                idx={idx}
              />
            )
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
          <Button message={"Create Assignments"} onClick={handleUpload} />
        </Grid>
      </Grid>
      <Grid />
    </Grid>
  )
}
export default CreateAssignments

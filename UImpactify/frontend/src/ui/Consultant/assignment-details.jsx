import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import {
  Grid,
  List,
  ListItem,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles({
  root: {
    padding: "5px",
    marginBottom: "1.5%",
    marginLeft: "5%",
    width:"80%",
    
  },
  listText: {
    paddingRight: "20%",
    color: "#3279a8",
  },
  deletebtn: {
    marginLeft: "2%",
    marginTop: "50%",
  },
  assignmentText: {
    color: "#bd71b3",
  },
})

const AssignmentDetails = ({ assignment, handleChange, handleRemove,idx }) => {
  const style = useStyle()
  
  return (
    <Grid container space={0}>
      <Grid item xs={9}>
        <List className={style.root}>
          <Typography
            variant="h4"
            className={style.assignmentText}
          >{`Assignment ${idx + 1}`}</Typography>
          <ListItem>
            <TextField
              name="name"
              type="text"
              placeholder="Enter name of the Assignment"
              label={`Name`}
              value={assignment.name}
              onChange={e => handleChange(idx, e)}
              fullWidth
              variant="outlined"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="description"
              type="text"
              placeholder="Enter description of the lecture"
              label={`Description`}
              value={assignment.description}
              onChange={e => handleChange(idx, e)}
              fullWidth
              variant="outlined"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="link"
              type="url"
              placeholder="Enter link for the lecture video"
              label={`Url`}
              value={assignment.link || ""}
              onChange={e => handleChange(idx, e)}
              fullWidth
              variant="outlined"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="point"
              type="number"
              placeholder="Enter the marks for the assignment"
              label={`Points`}
              value={assignment.point || ""}
              onChange={e => handleChange(idx, e)}
              fullWidth
              error={assignment.point < 0 || assignment.point > 100}
              helperText={
                assignment.point < 0 || assignment.point > 100
                  ? "Invalid Points"
                  : ""
              }
              variant="outlined"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="duedate"
              type="date"
              label={`Due Date`}
              value={assignment.duedate || ""}
              onChange={e => handleChange(idx, e)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3}>
        <IconButton
          className={style.deletebtn}
          onClick={() => handleRemove(idx)}
         
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default AssignmentDetails

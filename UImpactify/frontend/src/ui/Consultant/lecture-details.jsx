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
    width: "80%",
  },
  listText: {
    paddingRight: "20%",
    color: "#3279a8",
  },
  deletebtn: {
    marginLeft: "50%",
  },
  lectureText: {
    color: "#bd71b3",
    paddingLeft: "3%",
  },
})

const LectureDetails = ({ lecture, handleChange, handleRemove, idx }) => {
  const style = useStyle()
  return (
    <Grid container space={3}>
        <Grid item xs={12}>
        <Typography variant="h4" className={style.lectureText}>{`Lecture ${
              idx + 1
            }`}</Typography>
        </Grid>
      <Grid item xs={10}>
        <List className={style.fieldList}>
          <ListItem>
            <TextField
              name="name"
              type="text"
              placeholder="Enter name of the lecture"
              label={`Name`}
              onChange={e => handleChange(idx, e)}
              value={lecture.name || ""}
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
              onChange={e => handleChange(idx, e)}
              value={lecture.description || ""}
              fullWidth
              variant="outlined"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="url"
              type="url"
              placeholder="Enter link for the lecture video"
              label={`Url`}
              onChange={e => handleChange(idx, e)}
              value={lecture.url || ""}
              fullWidth
              variant="outlined"
            />
          </ListItem>
        </List>
        <Grid item >
          <IconButton onClick={handleRemove} className={style.deletebtn}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LectureDetails

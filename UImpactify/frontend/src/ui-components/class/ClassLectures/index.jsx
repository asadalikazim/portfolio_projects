import React, {useEffect, useState} from "react"
import { Grid, GridList, Box, Typography, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LoadingComponent from "../../LoadingComponent";
import Auth from "../../../services/authorization/sign-in";
import AssignmentCalls from "../../../axios/AssignmentCalls";
import LectureCalls from "../../../axios/LectureCalls";

const lectureEx = [{"name": "Week 1", "description": "**Lecture Description", "url": "https://www.google.ca/"},
    {"name": "Week 2", "description": "**Lecture Description", "url": "https://www.google.ca/"},
    {"name": "Week 3", "description": "**Lecture Description", "url": "https://www.google.ca/"}];

const Lectures = ({classId}) => {
    const [lectures, setLectures] = React.useState(null);
    const [user, setUser] = useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const [response, response2] = await Promise.all([Auth.getAuthUser(), LectureCalls.getLecture(classId)]);

                if (response2.status === 200) setLectures(response2.data);
                if (response.status === 200) setUser(response.data);
            } catch (err){
                console.log(err);
                setUser(null);
                setLectures(null);
            }
        };
        fetchData();
    }, []);
  const useStyles = makeStyles((theme) => ({
    courseInfo: {
        marginLeft: "3rem",
        marginBottom: "2rem"
    },
    heading: {
        margin: "1rem",    
    },
    lectureSummary: {
        "&:hover": {
            backgroundColor: "#AFEEEE"
        },
    },
    notes: {
        marginLeft: "3rem"
    }
  }));



  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  if (!lectures) return <LoadingComponent/>

  // use instructorId for query here to get name and email

    return (
      <>
        <Box>
            <Grid container xs={11} className={classes.courseInfo}>
                <Grid item xs={8} >
                    <Grid >
                        <Typography variant="h5" className={classes.heading}>
                            Lectures
                        </Typography>
                    </Grid>
                    <Grid >
                        {lectures.map((lecture) => {
                            return (   
                                <Accordion>
                                    <AccordionSummary 
                                    className={classes.lectureSummary} 
                                    expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h7">{lecture.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <List>
                                        <Button href={lecture.url}>watch lecture</Button>
                                        <Button href={lecture.url} className={classes.notes}>notes</Button>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>                            
                        )})}
                    </Grid>
                </Grid>
            </Grid>
        </Box>  
      </>
    )
  }

export default Lectures
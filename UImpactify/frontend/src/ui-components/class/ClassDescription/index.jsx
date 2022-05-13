import React, {useEffect} from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from "@material-ui/lab"
import UserCalls from "../../../axios/UserCalls";
import LoadingComponent from "../../LoadingComponent";

const ClassDescription = ({description, instructorId, rating} ) => {
    const [instructor, setInstructor] = React.useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await UserCalls.getUserById(instructorId)
                if (response.status === 200) setInstructor(response.data);
            } catch (err){
                console.log(err);
                setInstructor(null);
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
    instructor: {
        margin: "1rem",
        marginLeft: "4rem"
    },
    rating: {
        marginLeft: "4rem"
    }
  }));

  const classes = useStyles();

  if (!instructor) return <LoadingComponent/>

  // use instructorId for query here to get name and email

    return (
      <>
        <Box>
            <Grid container xs={11} className={classes.courseInfo}>
                <Grid item xs={8} >
                    <Grid >
                        <Typography variant="h5" className={classes.heading}>
                            Course Description
                        </Typography>
                    </Grid>
                        <Typography className={classes.heading}>
                            {description}
                        </Typography>
                </Grid>
                <Grid item xs={4}>
                     <Grid >
                        <Typography variant="h5" className={classes.instructor}>
                            Class Rating
                        </Typography>
                    </Grid>
                    <Rating value={rating} precision={0.5} readOnly className={classes.rating}/>
                    <Grid >
                        <Typography variant="h5" className={classes.instructor}>
                            Instructors
                        </Typography>
                    </Grid>
                        <Typography className={classes.instructor}>
                            {instructor.name} ({instructor.email})
                        </Typography>
                </Grid>
            </Grid>
        </Box>  
      </>
    )
  }

export default ClassDescription
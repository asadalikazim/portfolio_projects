import React, {useEffect} from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Grid,
  Link
} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import Button from "../../ui-components/home/ButtonComponent/index"
import ClassCalls from "../../axios/ClassCalls";
import UserCalls from "../../axios/UserCalls";
import {Link as GLink} from "gatsby";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderColor: "#7a34eb",
    borderRadius: "0.5cm",
  },
  title: {
    fontSize: 20,
    fontFamily:'Roboto,Helvica',
  },
  pos: {
    marginBottom: '15%',
    marginLeft: "65%",
    marginTop: "-4.5%",
    width: "200%"
  },
  content: {
    marginLeft: "10%",
    marginRight:'10%',
  },
  
})

export default function Class(props) {
  const style = useStyles()
  const { course } = props
  const [instructor, setInstructor] = React.useState(null);
  useEffect(   () => {
    const fetchData = async () => {
      try {
        const response = await UserCalls.getUserById(course.instructorId)
        if (response.status === 200) setInstructor(response.data);
      } catch (err){
        console.log(err);
        setInstructor(null);
      }
    };
    fetchData();
  }, []);

  const handleEnroll = () => {
    alert("Thanks for enrolling in the Course")
  }
  return (

      <Card className={style.root} variant="outlined" elevation={3}>
        <CardContent className={style.content}>
          <Grid container>
            <Grid item xs={12}>
              <Link component={GLink} style={{ textDecoration: 'none' }} to={`/app/class/${course._id}`}>
              <Typography className={style.title} color="textPrimary">
                {course.name}
              </Typography>
              </Link>
              <Divider />
              <Typography variant="body1" color="textSecondary">
                {course.description}
              </Typography>
              <Typography variant="body2">{(instructor!=null) && instructor.name}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Rating
                  name="courseRating"
                  value={course.rating}
                  readOnly
                  precision={0.5}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={style.pos}>
        <Link component={GLink} style={{ textDecoration: 'none' }} to={`/app/class/${course._id}`}>
          <Button message={"Learn More"}></Button>
        </Link>
        </CardActions>
      </Card>


  )
}

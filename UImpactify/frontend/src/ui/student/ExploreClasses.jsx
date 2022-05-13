import React, {useEffect} from "react"
import {
  GridList,
  GridListTile,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core"
import Class from "./Class"
import { makeStyles } from "@material-ui/core/styles"
import ClassCalls from "../../axios/ClassCalls";
import LoadingComponent from "../../ui-components/LoadingComponent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  gridList: {
    width: "75%",
    height: "auto",
    paddingLeft: "25%",
    paddingTop: "1.5%",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
  heading: {
    color: "#7e05f0",
    paddingLeft: "2.5%",
    maxWidth: "lg",
    fontFamily:'Roboto,Helvetica,Proxima Nova,Open Sans',
  },
}))

const ExploreClasses = () => {
  const style = useStyles()
  const [classes, setClasses] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ClassCalls.getClass()
        if (response.status === 200) setClasses(response.data);
      } catch (err){
        console.log(err);
        setClasses([]);
      }
    };
    fetchData();
  }, []);

  if (!classes) return <LoadingComponent/>

  return (
    <Grid container className={style.root} space={2}>
      <Grid item xs={12}>
        <Typography variant="h3" className={style.heading}>
          Explore Classes
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <GridList cellHeight="auto" spacing={0} className={style.gridList}>
          {classes.map(course => (
            <GridListTile key={course.id} cols={2}>
              <Class course={course} />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </Grid>
  )
}

export default ExploreClasses

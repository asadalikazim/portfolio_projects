import React, {useEffect} from "react"
import { GridList, GridListTile, Grid, Typography } from "@material-ui/core"
import Opportunity from "./Opportunities"
import { makeStyles } from "@material-ui/core/styles"
import ClassCalls from "../../axios/ClassCalls";
import LoadingComponent from "../../ui-components/LoadingComponent";
import OrgCalls from "../../axios/OrgCalls";

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
    color: "#A78EC3",
    paddingLeft: "2.5%",
    maxWidth: "lg",
    fontFamily: "Roboto,Helvetica,Proxima Nova,Open Sans",
  },
}))

const ExploreOrgs = () => {
  const style = useStyles()
  const [orgs, setOrgs] = React.useState(null);
  useEffect(   () => {
    const fetchData = async () => {
      try {
        const response = await OrgCalls.getOrg()
        if (response.status === 200) setOrgs(response.data);
      } catch (err){
        console.log(err);
        setOrgs([]);
      }
    };
    fetchData();
  }, []);

  if (!orgs) return <LoadingComponent/>

  return (
    <Grid container className={style.root} space={2}>
      <Grid item xs={12}>
        <Typography variant="h3" className={style.heading}>
          Explore Organizations
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <GridList cellHeight="auto" spacing={0} className={style.gridList}>
          {orgs.map(organization => (
            <GridListTile key={organization.id} cols={2}>
              <Opportunity organization={organization}/>
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    </Grid>
  )
}

export default ExploreOrgs

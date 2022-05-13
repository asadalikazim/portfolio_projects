import React, {useEffect} from "react"
import { Grid, Box, Typography, } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClassCalls from "../../../axios/ClassCalls";
import JobCalls from "../../../axios/JobCalls";
import LoadingComponent from "../../LoadingComponent";
import ButtonComponent from "../../home/ButtonComponent"

const JobsAvailable = ( {orgId} ) => {
    const [jobs, setJobs] = React.useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await JobCalls.getJobs(orgId)
                if (response.status === 200) setJobs(response.data);
            } catch (err){
                console.log(err);
                setJobs(null);
            }
        };
        fetchData();
    }, []);
    const classes = useStyles();

    if (!jobs) return <LoadingComponent/>;

  // const jobDescription = "Mastering the fundamentals of management can help you launch \
  //                           your business career, change jobs or assume more responsibility \
  //                           at work. This comprehensive program will give you the knowledge and \
  //                           foundational skills you need for business and management leadership. \
  //                           You'll be able to add new capabilities to your résumé and pursue \
  //                           professional designations with greater confidence."
  //
  //   // use orgId to query jobs for the organization
  //   const jobs = [{name: "Graphic Designer", description: jobDescription, orgId: orgId, volunteerOp: true, opportunityLink: "https://www.youtube.com/"},
  //                 {name: "Solutions IT Designer", description: jobDescription, orgId: orgId, volunteerOp: true, opportunityLink: "https://www.facebook.com/"},
  //                 {name: "Chief Executive Officer", description: "you wish!", orgId: orgId, volunteerOp: false, opportunityLink: "https://twitter.com/login}]




    return (
      <>
        <Box>
            <Grid container xs={11} className={classes.courseInfo}>
                <Grid item xs={8} >
                    <Grid >
                        <Typography variant="h5" className={classes.volunteerHeading}>
                            Volunteer Opportunities
                        </Typography>
                    </Grid>
                    <Grid className={classes.jobs}>
                        {jobs.map((job) => {
                            if (job.volunteerOp) {
                                return (
                                    <Accordion>
                                        <AccordionSummary 
                                        className={classes.jobSummary} 
                                        expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h6">{job.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.jobDetails}>
                                        
                                            <Typography variant="h10">
                                                {job.description}
                                            </Typography>

                                        </AccordionDetails>
                                        <ButtonComponent
                                            
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href=job.opportunityLink;
                                                }}
                                            message={'APPLY'}
                                        />
                                    </Accordion>                                
                            )}})}
                    </Grid>
                    <Grid >
                        <Typography variant="h5" className={classes.employHeading}>
                            Employment Opportunities
                        </Typography>
                    </Grid>
                    <Grid className={classes.jobs}>
                        {jobs.map((job) => {
                            if (!job.volunteerOp) {
                                return (
                                    <Accordion>
                                        <AccordionSummary 
                                        className={classes.jobSummary} 
                                        expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h6">{job.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.jobDetails} >
                                            <Typography variant="h10">
                                                {job.description}
                                            </Typography>
                                        </AccordionDetails>
                                        <ButtonComponent
                                            
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href=job.opportunityLink;
                                                }}
                                            message={'APPLY'}
                                        />
                                    </Accordion>                                
                            )}})}
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                     <Grid >
                        <Typography className={classes.sideMessage}>
                            For more available opportunities, please visit our website!
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>  
      </>
    )
  };

const useStyles = makeStyles((theme) => ({
    courseInfo: {
        marginLeft: "3rem",
        marginBottom: "2rem"
    },
    volunteerHeading: {
        margin: "1rem",
        marginBottom: "2rem"
    },
    employHeading: {
        margin: "1rem",
        marginBottom: "2rem",
        marginTop: "2rem"
    },
    sideMessage: {
        margin: "1rem",
        marginLeft: "4rem"
    },
    jobs: {
        margin: "1rem"
    },
    jobSummary: {
        "&:hover": {
            backgroundColor: "#AFEEEE"
        },
    },
    jobDetails: {
        marginTop: "1rem",
        marginBottom: "1rem"
    }
}));

export default JobsAvailable
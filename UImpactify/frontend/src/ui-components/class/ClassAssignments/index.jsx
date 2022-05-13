import React, { useEffect } from "react"

import { Grid, GridList, Box, Typography, Button, Modal } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Rating } from "@material-ui/lab"
import LoadingComponent from "../../LoadingComponent"
import TitleUploadLinkModal from "../../../ui-components/TitleUploadLinkModal"
import { useState } from "react"
import Auth from "../../../services/authorization/sign-in";
import AssignmentCalls from "../../../axios/AssignmentCalls";

const assignmentEx = [
    {
        name: "A1",
        description: "**Assignment Description",
        duedate: "never",
        points: "100",
        link: "https://www.google.ca/",
    },
    {
        name: "A2",
        description: "**Assignment Description",
        duedate: "never",
        points: "100",
        link: "https://www.google.ca/",
    },
    {
        name: "A3",
        description: "**Assignment Description",
        duedate: "never",
        points: "100",
        link: "https://www.google.ca/",
    },
]

const Assignments = ({classId}) => {
    const [openModal, setOpenModal] = useState(false)
    const [assignments, setAssignments] = useState(null)
    const [AId, setAId] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const [response, response2] = await Promise.all([Auth.getAuthUser(), AssignmentCalls.getAssignment(classId)]);

                if (response2.status === 200) setAssignments(response2.data);
                if (response.status === 200) setUser(response.data);
            } catch (err){
                console.log(err);
                setUser(null);
                setAssignments(null);
            }
        };
        fetchData();
    }, []);
    const useStyles = makeStyles(theme => ({
        courseInfo: {
            marginLeft: "3rem",
            marginBottom: "2rem",
        },
        heading: {
            margin: "1rem",
        },
        assignmentSummary: {
            "&:hover": {
                backgroundColor: "#AFEEEE",
            },
        },
    }))



    const classes = useStyles()

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />
    }

    const handleUploadAssignment = (aId) => {
        setOpenModal(true);
    }

    if (!assignments || !user) return <LoadingComponent />

    // use instructorId for query here to get name and email

    return (
        <>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ top: "25%", left: "25%", translate: `translate(-25%, -25%)` }}
            >
                <TitleUploadLinkModal
                    title="Submit Assignment"
                    aId={AId}
                    sId={user.id}
                />
            </Modal>
            <Box>
                <Grid container xs={11} className={classes.courseInfo}>
                    <Grid item xs={8}>
                        <Grid>
                            <Typography variant="h5" className={classes.heading}>
                                Assignments
                            </Typography>
                        </Grid>
                        <Grid>
                            {assignments.map(assignment => {
                                return (
                                    <Accordion key={classes.name}>
                                        <AccordionSummary
                                            className={classes.assignmentSummary}
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography variant="h7">{assignment.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List>
                                                <ListItemText primary={assignment.description} />
                                                <ListItemText
                                                    primary={"Due Date: " + assignment.duedate}
                                                />
                                                <ListItemText
                                                    primary={"Points: " + assignment.point}
                                                />
                                                <Button href={assignment.link}>view assignment</Button>
                                                <Button onClick={()=>{
                                                    setOpenModal(true);
                                                    setAId(assignment._id);
                                                }}>
                                                    Upload Assignment
                                                </Button>
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default Assignments
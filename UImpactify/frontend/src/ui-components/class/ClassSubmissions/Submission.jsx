import React, {useEffect, useState} from 'react';
import Auth from "../../../services/authorization/sign-in";
import AssignmentCalls from "../../../axios/AssignmentCalls";
import {Card, Typography, Container, TextField, Button} from "@material-ui/core";
import UserCalls from "../../../axios/UserCalls";
import LoadingComponent from "../../LoadingComponent";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "gatsby";
import SubmissionCalls from "../../../axios/SubmissionCalls";

const Submission = ({data}) => {

    const [student, setStudent] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [gradeField, setGradeField] = useState(null);
    const [grade, setGrade] = useState(null);

    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await UserCalls.getUserById(data.sId);
                if (response.status === 200) setStudent(response.data);
            } catch (err){
                console.log(err);
                setUser(null);
                setAssignments(null);
            }
        };
        fetchData();
    }, []);
    const classes = useStyles();

    const updateGrade = async () => {
        try {
            if (!gradeField) {
                alert("Enter a numeric grade!");
                return;
            }
            setGrade(gradeField);
            const response = await SubmissionCalls.updSubmission(data._id, gradeField);
            if (response.status === 200) alert("Update Successful!");
        } catch (err) {
            alert("Something went wrong!");
        }
    }

    if (!student) return <LoadingComponent/>;

    return (
        <Container>
            <Card className={classes.container}>
                <Typography>Student: {student.name}</Typography>
                <Typography>Student ID: {student._id}</Typography>
                <Typography>Submission: <Button component={Link} to={data.link}>Here</Button></Typography>
                <Typography>Grade: {grade ? grade : data.grade}</Typography>
                <TextField onInput={ e=>setGradeField(parseInt(e.target.value, 10))}/>
                <Button onClick={updateGrade}>Update</Button>
            </Card>
        </Container>);
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: "1rem"
    }
}))

export default Submission;
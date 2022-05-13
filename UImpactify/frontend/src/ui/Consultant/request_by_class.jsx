import React, {useEffect} from "react"
import { Container, Grid,Typography } from "@material-ui/core"
import RequestCalls from "../../axios/RequestCalls"
import Request_box from "./request_box"


export default function Request_by_class({course}) {
  
    //get StudentRequests by classId
  
    const [StudentRequests, setStudentRequests] = React.useState([]);
    const [OrgRequests, setOrgRequests] = React.useState([]);
    useEffect(   () => {
      const fetchData = async () => {
        try {
          const response = await RequestCalls.getStudentRequest(course._id)
          const response2 = await RequestCalls.getOrganizationRequest(course._id)
          if (response.status === 200) setStudentRequests(response.data);
          if (response2.status === 200) setOrgRequests(response2.data);
        } catch (err){
          console.log(err);
          setStudentRequests([]);
          setOrgRequests([]);
        }
      };
      fetchData();
    }, []);
  
    if(!StudentRequests){
      return <Grid>no StudentRequests</Grid>
    }else if(!OrgRequests){
      return <Grid>no OrgRequests</Grid>
    }
    return (
      <Container>
        <Grid container space={0}>
          {StudentRequests.map(StudentRequests => (
            <Request_box data={StudentRequests} role={"student"}/>
          ))}
          {OrgRequests.map(OrgRequests => (
            <Request_box data={OrgRequests} role={"organization"}/>
          ))}
        </Grid>
      </Container>
    )
  }
import React, { useState, useEffect } from "react"
import { Box, Grid, GridList, Typography, Button } from "@material-ui/core"
import GridCategoryList from "../../../ui-components/dashboard/GridCategoryList"
import Michel from "../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-S/SupportsArts.svg"
import Auth from "../../../services/authorization/sign-in"
import JobCalls from "../../../axios/JobCalls"
import OrgCalls from "../../../axios/OrgCalls"
import LoadingComponent from "../../../ui-components/LoadingComponent"

const DashboardInitiatives = () => {
  const [user, setUser] = React.useState(null)
  const [posting, setPosting] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser(user => setUser(user))
        console.log(response.data.id)
        const response3 = await OrgCalls.getOrgByUid(response.data.id)
        const response2 = await JobCalls.getJobs(response3.data._id)
        console.log(response3)
        if (response.status === 200) setUser(response.data)
        if (response2.status === 200) setPosting(response2.data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    fetchData()
  }, [])

  if (!user || !posting) return <LoadingComponent />

  return (
    <Box className="box-main-dashboard-student">
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className="grid-main-dashboard-student"
        direction="row"
      >
        <Grid
          justify="flex-start"
          alignItems="center"
          className="big-category-main-dashboard-student"
          direction="column"
          xs={6}
        >
          {/* COURSES */}
          <GridCategoryList
            title="Your Postings"
            data={posting}
            extraText="Create Posting"
          />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="big-category-main-dashboard-student"
          direction="column"
          xs={6}
        >
          <img
            style={{ width: "30rem", margin: 0 }}
            src={Michel}
            alt="Michel"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardInitiatives

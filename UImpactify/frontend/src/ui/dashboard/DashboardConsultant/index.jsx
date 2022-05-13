import React, { useEffect, useState } from "react"
import { Box, Grid } from "@material-ui/core"
import GridCategoryList from "../../../ui-components/dashboard/GridCategoryList"
import Auth from "../../../services/authorization/sign-in"
import ClassCalls from "../../../axios/ClassCalls"
import LoadingComponent from "../../../ui-components/LoadingComponent"
import Michel from "../../../ui-resources/solutions/WhatMakesU-ImpactifySpecial-S/CollaborativeLearning.svg"

const DashboardConsultant = () => {
  const [user, setUser] = React.useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser(user => setUser(user))
        const response2 = await ClassCalls.getClassByInstructor(
          response.data.id
        )
        console.log(response2.data)
        if (response.status === 200) setUser(response.data)
        if (response2.status === 200) setCourses(response2.data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    fetchData()
  }, [])

  if (!user || !courses) return <LoadingComponent />

  return (
    <>
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
              title="Your Courses"
              data={courses}
              extraText="Create Course"
            />
          </Grid>
          <Grid xs={6} container alignItems="center" justify="center">
            <Grid item>
              <img
                style={{ width: "30rem", margin: 0 }}
                src={Michel}
                alt="Michel"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default DashboardConsultant

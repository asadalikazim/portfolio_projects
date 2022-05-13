import React from "react"
import { useEffect, useState } from "react"
import DashboardLayoutS from "../ui/dashboard/learner/DashboardLayoutS"
import DashboardLayoutC from "../ui/dashboard/consultant/DashboardLayoutC"
import DashboardLayoutI from "../ui/dashboard/organization/DashboardLayoutI"
import Auth from "../services/authorization/sign-in"
import Dashboard from "../ui/dashboard/Dashboard"
import DashboardStudent from "../ui/dashboard/DashboardLearner"
import SEO from "../ui/base/seo"
import DashboardConsultant from "../ui/dashboard/DashboardConsultant"
import DashboardInitiatives from "../ui/dashboard/DashboardInitiatives"
import LoadingComponent from "../ui-components/LoadingComponent"
import {
  INITIATIVE_ROLE,
  INSTRUCTOR_ROLE,
  STUDENT_ROLE,
} from "../utils/constants"

const DashboardPage = () => {
  const [user, setUser] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser(user => setUser(user))
        if (response.status === 200) setUser(response.data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    fetchData()
  }, [])

  const [pageTag, setpageTag] = useState("dashboard")

  if (!user) return <LoadingComponent />

  switch (user.role) {
    case STUDENT_ROLE:
      return (
        <DashboardLayoutS
          role={user.role}
          pageTag={pageTag}
          setpageTag={setpageTag}
        >
          <SEO title="dashboard" />
          <DashboardStudent user={user} />
        </DashboardLayoutS>
      )
    case INSTRUCTOR_ROLE:
      return (
        <DashboardLayoutC
          role={user.role}
          pageTag={pageTag}
          setpageTag={setpageTag}
        >
          <SEO title="dashboard" />
          <DashboardConsultant user={user} />
        </DashboardLayoutC>
      )
    case INITIATIVE_ROLE:
      return (
        <DashboardLayoutI
          role={user.role}
          pageTag={pageTag}
          setpageTag={setpageTag}
        >
          <SEO title="dashboard" />
          <DashboardInitiatives user={user} />
        </DashboardLayoutI>
      )
  }
}

export default DashboardPage

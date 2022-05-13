import React, {useEffect, useState} from "react"

import Layout from "../ui/base/layout"
import SEO from "../ui/base/seo"

import Class from "../ui/dashboard/templates/classTemplate"
import Auth from "../services/authorization/sign-in"
import DashboardLayoutS from "../ui/dashboard/learner/DashboardLayoutS";
import DashboardLayoutI from "../ui/dashboard/organization/DashboardLayoutI"
import LoadingComponent from "../ui-components/LoadingComponent"
import {
    INITIATIVE_ROLE,
    INSTRUCTOR_ROLE,
    STUDENT_ROLE,
  } from "../utils/constants"


const ClassPage = ({classId}) => {
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

    const [pageTag, setpageTag] = useState("classes")

    if (!user) return <LoadingComponent />
    
    switch (user.role) {
        case STUDENT_ROLE:
            return (<DashboardLayoutS
                role={user.role}
                pageTag={pageTag}
                setpageTag={setpageTag}
                >
                <SEO title="class"/>
                <Class classId={classId}/>
            </DashboardLayoutS>)
        case INITIATIVE_ROLE:
            return (<DashboardLayoutI
                role={user.role}
                pageTag={pageTag}
                setpageTag={setpageTag}
                >
                <SEO title="class"/>
                <Class classId={classId}/>
            </DashboardLayoutI>)
        case INSTRUCTOR_ROLE:
            return (<DashboardLayoutI
                role={user.role}
                pageTag={pageTag}
                setpageTag={setpageTag}
            >
                <SEO title="class"/>
                <Class classId={classId}/>
            </DashboardLayoutI>)
    }
}

export default ClassPage

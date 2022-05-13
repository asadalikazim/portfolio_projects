import React from "react"

import Layout from "../ui/base/layout"
import SEO from "../ui/base/seo"

import CreateLectures from "../ui/Consultant/create-lectures";
import DashboardLayoutC from "../ui/dashboard/consultant/DashboardLayoutC";


const CreateLecturesPage = () => (
  <DashboardLayoutC>
    <SEO title="Create Lecture" />
      {console.log(window.history)}
    <CreateLectures id={window.history.state.id}/>
  </DashboardLayoutC>
)

export default CreateLecturesPage

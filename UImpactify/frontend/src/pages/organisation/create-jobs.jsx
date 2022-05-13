import React from "react"

import Layout from "../../ui/base/layout"
import SEO from "../../ui/base/seo"

import CreateJob from "../../ui/organisation/CreateJob"

const CreateJobPage = () => (
  <Layout>
    <SEO title="CreateJob" />
    <CreateJob />
  </Layout>
)

export default CreateJobPage

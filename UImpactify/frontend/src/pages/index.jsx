import React from "react"

import Layout from "../ui/base/layout"
import SEO from "../ui/base/seo"

import WelcomePage from "../ui/home/home"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <WelcomePage/>
  </Layout>
)

export default IndexPage

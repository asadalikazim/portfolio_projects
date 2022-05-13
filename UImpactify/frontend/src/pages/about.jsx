import React from "react"

import Layout from "../ui/base/layout"
import SEO from "../ui/base/seo"

import About from "../ui/home/about"


const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <About/>
  </Layout>
)

export default AboutPage

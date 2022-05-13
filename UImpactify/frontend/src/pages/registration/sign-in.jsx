import React from "react"

import Layout from "../../ui/base/layout"
import SEO from "../../ui/base/seo"
import SignIn from "../../ui/registration/sign-in"

const SignInPage = () => (
    <Layout>
        <SEO title="sign-up" />
        <SignIn />
    </Layout>
)

export default SignInPage


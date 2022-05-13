import React from "react";
import Organization from "../ui/dashboard/templates/organizationTemplate"
import DashboardLayoutS from "../ui/dashboard/learner/DashboardLayoutS";
import SEO from "../ui/base/seo";


const OrganizationPage = ({orgId}) => (
    <DashboardLayoutS>
        <SEO title="organization" />
        <Organization orgId={orgId}/>
    </DashboardLayoutS>
)

export default OrganizationPage
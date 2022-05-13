import React, {useEffect} from "react"

import ToOrganizations from "../../../ui-components/organization/ToOrganizations"
import OrganizationTitle from "../../../ui-components/organization/OrganizationTitle"
import OrganizationTabsComponent from "../../../ui-components/organization/OrganizationTabsComponent"
import ClassCalls from "../../../axios/ClassCalls";
import OrgCalls from "../../../axios/OrgCalls";
import LoadingComponent from "../../../ui-components/LoadingComponent";




/**
 * Template for individual opportunities. Will be created on runtime by createPages
 *
 */


const Organization = ({orgId}) => {

    const [orgDetails, setOrgDetails] = React.useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await OrgCalls.getOrgById(orgId)
                if (response.status === 200) setOrgDetails(response.data);
            } catch (err){
                console.log(err);
                setOrgDetails(null);
            }
        };
        fetchData();
    }, []);

    if (!orgDetails) return <LoadingComponent/>
  return (
    <>
      <ToOrganizations />
      <OrganizationTitle 
          orgName={orgDetails.name} 
          orgWebsite={orgDetails.website}
          orgAddress={orgDetails.address}
          orgPhone={orgDetails.phoneNum}
          orgRating={orgDetails.rating} />
      <OrganizationTabsComponent 
          orgName={orgDetails.name}
          orgAbout={orgDetails.about}
          orgId={orgDetails._id}/>
    </>
  )
}

export default Organization
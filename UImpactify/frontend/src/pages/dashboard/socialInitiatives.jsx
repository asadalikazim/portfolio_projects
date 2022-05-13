import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import ExploreOpportunities from "../../ui/student/ExploreOpportunities"
import SEO from "../../ui/base/seo"
import ExploreOpportunitiesPage from "../student/explore-opportunities";
import Auth from "../../services/authorization/sign-in";
import LoadingComponent from "../../ui-components/LoadingComponent";



const SocialInitiativesPage = () => {
    // useEffect(  () => {
    //    setTimeout( () => {
    //        async function getUser() {
    //            return await Auth.getAuthUser();
    //        };
    //        setResult(getUser());
    //    }, 1000)
    // }, []);

    // const handleClick = async () => {
    //     const user = await Auth.getAuthUser();
    //     setResult(user);
    // }
    const [pageTag, setpageTag] = useState("social Initiatives");
    const [user, setUser] = React.useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await Auth.getAuthUser((user) => setUser(user));
                if (response.status === 200) setUser(response.data);
            } catch (err){
                console.log(err);
                setUser(null);
            }
        };
        fetchData();
    }, []);

    if (!user) return <LoadingComponent/>

    return (
        <DashboardLayoutS role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="social initiatives"/>
            <ExploreOpportunitiesPage/>
        </DashboardLayoutS>
    );
};

export default SocialInitiativesPage
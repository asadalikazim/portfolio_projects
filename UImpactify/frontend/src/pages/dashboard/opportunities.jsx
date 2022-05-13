import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutI from "../../ui/dashboard/organization/DashboardLayoutI"
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import CreateJob from "../../ui/organisation/CreateJob"
import SEO from "../../ui/base/seo"
import Auth from "../../services/authorization/sign-in";
import LoadingComponent from "../../ui-components/LoadingComponent";
import {INITIATIVE_ROLE, STUDENT_ROLE} from "../../utils/constants";
import ExploreOpportunitiesPage from "../student/explore-opportunities";


const OpportunitiesPage = () => {
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
    const [pageTag, setpageTag] = useState("opportunities");
    const [role, setRole] = useState("initiative");
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

    switch (user.role) {
        case (STUDENT_ROLE):
            return (<DashboardLayoutS role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
                <SEO title="opportunities"/>
                <ExploreOpportunitiesPage/>
            </DashboardLayoutS>);
        case (INITIATIVE_ROLE):
            return (<DashboardLayoutI role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
                <SEO title="opportunities"/>
                <CreateJob/>
            </DashboardLayoutI>)
        default:
            return (
                <DashboardLayoutC role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
                    <SEO title="opportunities"/>
                </DashboardLayoutC>
            )
    }

};

export default OpportunitiesPage
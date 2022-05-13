import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import SEO from "../../ui/base/seo"



const CommunityPage = () => {
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
    const [pageTag, setpageTag] = useState("community");
    const [role, setRole] = useState("student");

    if(role == "student"){
        return (
            <DashboardLayoutS role={role} pageTag={pageTag} setpageTag={setpageTag}>
                <SEO title="community"/>
            </DashboardLayoutS>
        )
    }

    return (
        <DashboardLayoutC role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="community"/>
        </DashboardLayoutC>
    )
};

export default CommunityPage
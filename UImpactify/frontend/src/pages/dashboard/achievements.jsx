import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import SEO from "../../ui/base/seo"



const AchievementsPage = () => {
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
    const [pageTag, setpageTag] = useState("achievements");
    const [role, setRole] = useState("student");

    return (
        <DashboardLayoutS role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="achievements"/>
        </DashboardLayoutS>
    )
};

export default AchievementsPage
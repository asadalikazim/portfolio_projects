import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import DashboardLayoutI from "../../ui/dashboard/organization/DashboardLayoutI"
import SEO from "../../ui/base/seo"



const SettingPage = () => {
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
    const [pageTag, setpageTag] = useState("setting");
    const [role, setRole] = useState("student");

    if(role == "student"){
        return (
            <DashboardLayoutS role={role} pageTag={pageTag} setpageTag={setpageTag}>
                <SEO title="setting"/>
            </DashboardLayoutS>
        )
    }else if(role == "initiative"){
        return (
            <DashboardLayoutI role={role} pageTag={pageTag} setpageTag={setpageTag}>
                <SEO title="setting"/>
            </DashboardLayoutI>
        )
    }

    return (
        <DashboardLayoutC role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="setting"/>
        </DashboardLayoutC>
    )
};

export default SettingPage
import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import SEO from "../../ui/base/seo"



const MailboxPage = () => {
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
    const [pageTag, setpageTag] = useState("mailbox");
    const [role, setRole] = useState("student");

    if(role == "student"){
        return (
            <DashboardLayoutS role={role} pageTag={pageTag} setpageTag={setpageTag}>
                <SEO title="mailbox"/>
            </DashboardLayoutS>
        )
    }

    return (
        <DashboardLayoutC role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="mailbox"/>
        </DashboardLayoutC>
    )
};

export default MailboxPage
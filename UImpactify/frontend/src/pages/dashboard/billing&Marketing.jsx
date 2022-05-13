import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import SEO from "../../ui/base/seo"



const BillingAndMarketingPage = () => {
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
    const [pageTag, setpageTag] = useState("billing&Marketing");
    const [role, setRole] = useState("consultant");

    return (
        <DashboardLayoutC role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="billing&Marketing"/>
        </DashboardLayoutC>
    )
};

export default BillingAndMarketingPage
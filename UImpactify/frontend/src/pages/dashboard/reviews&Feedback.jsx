import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import SEO from "../../ui/base/seo"



const ReviewsAndFeedbackPage = () => {
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
    const [pageTag, setpageTag] = useState("reviews&Feedback");
    const [role, setRole] = useState("consultant");

    return (
        <DashboardLayoutC role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="reviews&Feedback"/>
        </DashboardLayoutC>
    )
};

export default ReviewsAndFeedbackPage
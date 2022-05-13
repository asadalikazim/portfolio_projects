import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC"
import {INITIATIVE_ROLE, INSTRUCTOR_ROLE, STUDENT_ROLE} from "../../utils/constants";
import Request from "../../ui/Consultant/request"
import SEO from "../../ui/base/seo"



const RequestsPage = () => {
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
    const [pageTag, setpageTag] = useState("requests");
    const [role, setRole] = useState(INSTRUCTOR_ROLE);

    return (
        <DashboardLayoutC role={role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="requests"/>
            <Request />
        </DashboardLayoutC>
    )
};

export default RequestsPage
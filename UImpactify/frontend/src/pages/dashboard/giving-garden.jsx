import React from 'react';
import { useEffect, useState } from 'react';
import DashboardLayoutS from "../../ui/dashboard/learner/DashboardLayoutS"
import DashboardLayoutI from "../../ui/dashboard/organization/DashboardLayoutI"
import SEO from "../../ui/base/seo"
import Auth from "../../services/authorization/sign-in";
import GivingGardenRequest from "../../ui/giving-garden/GardenForm";
import LoadingComponent from "../../ui-components/LoadingComponent";
import {INITIATIVE_ROLE, INSTRUCTOR_ROLE, STUDENT_ROLE} from "../../utils/constants";

// The implementation of the giving garden request has been moved to ClassButtonsComponent.
// This page is no longer in use so please disregard. Page can be deleted if brings confusion.

const GivingGardenPage = () => {
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
    const [pageTag, setpageTag] = useState("classes");

    if (!user) {
        return <LoadingComponent/>
    }
    console.log(user)

    switch (user.role){
        case STUDENT_ROLE:
            return (
                <DashboardLayoutS role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
                    <GivingGardenRequest />
                </DashboardLayoutS>
            )
        case INITIATIVE_ROLE:
            return (
                <DashboardLayoutI role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
                    <SEO title="classes"/>
                    <GivingGardenRequest />
                </DashboardLayoutI>
            )

    }


};

export default GivingGardenPage
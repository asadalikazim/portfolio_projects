import CreateClass from "../../ui/dashboard/consultant/create-class";
import React, {useEffect, useState} from "react"

import SEO from "../../ui/base/seo"
import DashboardLayoutC from "../../ui/dashboard/consultant/DashboardLayoutC";
import Auth from "../../services/authorization/sign-in";
import LoadingComponent from "../../ui-components/LoadingComponent";


const CreateClassPage = () => {
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
    return (
        <DashboardLayoutC role={user.role} pageTag={pageTag} setpageTag={setpageTag}>
            <SEO title="CreateOrg"/>
            <CreateClass/>
        </DashboardLayoutC>
    );
}

export default CreateClassPage
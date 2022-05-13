import React from "react";
import { Router } from "@reach/router";
import ClassPage from "../templatePages/class-template";
import OrgPage from "../templatePages/org-template";


const App = () => {
    return (
        <Router basepath="/app">
            <ClassPage path="/class/:classId" />
            <OrgPage path="/orgs/:orgId"/>
        </Router>
    );
};

export default App;
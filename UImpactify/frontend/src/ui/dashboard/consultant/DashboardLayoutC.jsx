import React from "react"
import PropTypes from "prop-types"
import Topbar from "../Topbar"
import Footer from "../../base/footer";


const DashboardLayoutC = ({ children, role, pageTag, setpageTag}) => {
  
  return (
    <>
      <Topbar role={role} pageTag={pageTag} setpageTag={setpageTag}/>
      <main>{children}</main>
        <Footer/>
    </>
  )
}

DashboardLayoutC.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayoutC

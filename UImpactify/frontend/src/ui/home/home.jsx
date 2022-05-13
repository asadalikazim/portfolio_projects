import React from "react"

import WhatIsUImpactify from "../../ui-components/home/WhatIsUImpactify"
import WhyUImpactify from "../../ui-components/home/WhyUImpactify"
import WhoWeServe from "../../ui-components/home/WhoWeServe"
import Testimonials from "../../ui-components/home/Testimonials"

/**
 * Home page of UImpactify
 *
 * @example
 * return(
 *  <WelcomePage />
 * )
 */

const WelcomePage = () => {
  return (
    <>
      <WhatIsUImpactify />
      <WhyUImpactify />
      <WhoWeServe />
      <Testimonials />
    </>
  )
}

export default WelcomePage

import React from "react"

/*import my pages to here
import WhatIsUImpactify from "../WhatIsUImpactify"
import WhyUImpactify from "../WhyUImpactify"
import WhoWeServe from "../WhoWeServe"
import Testimonials from "../Testimonials"
*/

import PricingOptions from "../../ui-components/home/PricingOptions"
import IncludedPlans from "../../ui-components/home/IncludedPlans"
import Questions from "../../ui-components/home/Questions"
/**
 * Pricing Page
 *
 * @example
 * return(
 *  <PricePage />
 * )
 */

const PricePage = () => {
  return (
    <>
      <PricingOptions />
      <IncludedPlans />
      <Questions />
    </>
  )
}

export default PricePage

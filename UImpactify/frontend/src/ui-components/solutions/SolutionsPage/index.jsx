import React, {useState} from "react"

import SolutionsComponent from "../SolutionsComponent"
import DevelopNewSkillsAndKnowledge_S from "../DevelopNewSkillsAndnowledge_S"
import TeachOrCoachForStudentsSuccess_I from "../TeachOrCoachForStudentsSuccess_I"

import WhatMakesUImpactifySpecial_S from "../WhatMakesU-ImpactifySpecial-S"
import WhatMakesUImpactifySpecial_I from "../WhatMakesU-ImpactifySpecial-I"
import ExploreOurClasses from "../ExploreOurClasses"
/**
 * Home page of UImpactify
 *
 * @example
 * return(
 *  <WelcomePage />
 * )
 */




const SolutionsPage = () => {
  const [isStudents, setIsStudents] = useState(true);
  if (isStudents) {
    return (
      <>
        <SolutionsComponent
          isStudents={isStudents}
          setIsStudents={setIsStudents}
        />
        <DevelopNewSkillsAndKnowledge_S />
        <WhatMakesUImpactifySpecial_S />
        <ExploreOurClasses />
      </>
    )
  }
  return (
    <>
      <SolutionsComponent
        isStudents={isStudents}
        setIsStudents={setIsStudents}
      />
      <TeachOrCoachForStudentsSuccess_I />
      <WhatMakesUImpactifySpecial_I />
      
    </>
    
  )
}

export default SolutionsPage
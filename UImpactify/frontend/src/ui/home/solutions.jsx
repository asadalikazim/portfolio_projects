import React, {useState} from "react"

import SolutionsComponent from "../../ui-components/solutions/SolutionsComponent"
import DevelopNewSkillsAndnowledge_S from "../../ui-components/solutions/DevelopNewSkillsAndnowledge_S"
import WhatMakesUImpactifySpecial_S from "../../ui-components/solutions/WhatMakesU-ImpactifySpecial-S"
import ExploreOurClasses from "../../ui-components/solutions/ExploreOurClasses"
import GetStartedButtonComponent_S from "../../ui-components/solutions/GetStartedButtonComponent_S"

import TeachOrCoachForStudentsSuccess_I from "../../ui-components/solutions/TeachOrCoachForStudentsSuccess_I"
import WhatMakesUImpactifySpecial_I from "../../ui-components/solutions/WhatMakesU-ImpactifySpecial-I"
import GetStartedButtonComponent_I from "../../ui-components/solutions/GetStartedButtonComponent_I"
/**
 * Home page of UImpactify
 *
 * @example
 * return(
 *  <WelcomePage />
 * )
 */




const Solutions = () => {
  const [isStudents, setIsStudents] = useState(true);
  
  const [classType, setClassType] = useState("Entrepreneurship");
  if (isStudents) {
    return (
      <>
        <SolutionsComponent
          isStudents={isStudents}
          setIsStudents={setIsStudents}
        />
        <DevelopNewSkillsAndnowledge_S />
        <WhatMakesUImpactifySpecial_S />
        <ExploreOurClasses 
          classType={classType}
          setClassType={setClassType}
        />
        <GetStartedButtonComponent_S />
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
      <GetStartedButtonComponent_I />
    </>
    
  )
}

export default Solutions
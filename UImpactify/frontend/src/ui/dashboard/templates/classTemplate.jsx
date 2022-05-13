import React, {useEffect} from "react"

import ToClasses from "../../../ui-components/class/ToClasses"
import ClassTitle from "../../../ui-components/class/ClassTitle"
import ClassButtonsComponent from "../../../ui-components/class/ClassButtonsComponent"
import ClassDescription from "../../../ui-components/class/ClassDescription"
import ClassCalls from "../../../axios/ClassCalls";
import LoadingComponent from "../../../ui-components/LoadingComponent";



/**
 * Template for individual classes. Will be used by createPages
 *
 */


const Class = ({classId}) => {
    const [classDetails, setClass] = React.useState(null);
    useEffect(   () => {
        const fetchData = async () => {
            try {
                const response = await ClassCalls.getClassById(classId)
                if (response.status === 200) setClass(response.data);
            } catch (err){
                console.log(err);
                setClasses(null);
            }
        };
        fetchData();
    }, []);

  // const classDetails = {name: "Business Fundamentals",
  //                       description: "This is the description of the class",
  //                       instructorId: "12345",
  //                       givingGarden: false,
  //                       rating: 4.5}
    if (!classDetails) return <LoadingComponent/>
  return (
    <>
      <ToClasses />
      <ClassTitle classTitle={classDetails.name}/>
      <ClassButtonsComponent classDetails={classDetails} />
    </>
  )
}

export default Class
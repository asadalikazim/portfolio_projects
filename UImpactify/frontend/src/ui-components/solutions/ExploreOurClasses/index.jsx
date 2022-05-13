import React from "react"
import { Grid, Typography, Box, Button} from "@material-ui/core"
import ClassesCards from "./ClassesCards"
import TimLeibovitzAVA from "../../../ui-resources/solutions/ExploreOurClasses/TimLeibovitzAVA.svg"
import TimLeibovitzBG from "../../../ui-resources/solutions/ExploreOurClasses/TimLeibovitzBG.svg"
import KathrynNguyenAVA from "../../../ui-resources/solutions/ExploreOurClasses/KathrynNguyenAVA.svg"
import KathrynNguyenBG from "../../../ui-resources/solutions/ExploreOurClasses/KathrynNguyenBG.svg"
import DianeMilesAVA from "../../../ui-resources/solutions/ExploreOurClasses/DianeMilesAVA.svg"
import DianeMilesBG from "../../../ui-resources/solutions/ExploreOurClasses/DianeMilesBG.svg"
import ClassTypeBtn from "./ClassTypeBtn"
import "./styles.css"

const ExploreOurClasses = ({ classType, setClassType }) => {
    const profiles = [
        {
            key: 1,
            avatar: TimLeibovitzAVA,
            background: TimLeibovitzBG,
            classType: "Entrepreneurship",
            name: "Tim Leibovitz",
            occupation: "Business Fundamentals",
            lessons: 12,
            tasks: 12,
            minutes: 30,
        },
        {
            key: 2,
            avatar: KathrynNguyenAVA,
            background: KathrynNguyenBG,
            classType: "Entrepreneurship",
            name: "Kathryn Nguyen",
            occupation: "Business Strategy",
            lessons: 10,
            tasks: 15,
            minutes: 45,
        },
        {
            key: 3,
            avatar: DianeMilesAVA,
            background: DianeMilesBG,
            classType: "Entrepreneurship",
            name: "Tim Leibovitz",
            occupation: "Business Plan",
            lessons: 12,
            tasks: 12,
            minutes: 30,
        },
    ]

    return (
        <Box className="ExploreOurClasses-outer-border-control">
            <Box className="ExploreOurClasses-border-control">
                <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                >
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className="title"
                    >
                        <Typography variant="h4">Explore our classes</Typography>
                    </Grid>

                    <Grid
                        container
                        justify="flex-start"
                        alignItems="center"
                        className="classTypes"
                        xs={9}
                    >
                        <ClassTypeBtn classType={classType} setClassType={setClassType} type="Entrepreneurship"/>
                        <ClassTypeBtn classType={classType} setClassType={setClassType} type="Communication"/>
                        <ClassTypeBtn classType={classType} setClassType={setClassType} type="Project Management"/>
                        <ClassTypeBtn classType={classType} setClassType={setClassType} type="Strategy"/>
                        <ClassTypeBtn classType={classType} setClassType={setClassType} type="Operations"/>
                        <ClassTypeBtn classType={classType} setClassType={setClassType} type="Finance"/>
                    </Grid>

                    <Grid item container direction="row" justify="center">
                        {profiles.map(profile => (
                            <ClassesCards key={profile.key} data={profile} />
                        ))}
                    </Grid>

                </Grid>

            </Box>
        </Box>
    )
}

export default ExploreOurClasses
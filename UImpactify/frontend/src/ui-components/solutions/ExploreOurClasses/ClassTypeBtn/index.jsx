import React from "react"
import { Grid, Typography, Box, Button} from "@material-ui/core"
import "./styles.css"

const ClassTypeBtn = ({ classType, setClassType, type }) => {
    if(classType==type){
        return (
            <>
                <Box color="#50C878" borderBottom={2}>
                    <Grid xs={12}>
                        <Grid container className="Btn" justify="center" xs={12}>
                            <Button onClick={() => { setClassType(type) }}>
                                <Typography variant="body1">{type}</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </>   
        )
    }
    return (
        <>
            <Grid >
                <Grid container className="Btn" justify="center">
                    <Button onClick={() => { setClassType(type) }}>
                        <Typography variant="body1">{type}</Typography>
                    </Button>
                </Grid>
            </Grid>
        </>           
    )
}

export default ClassTypeBtn
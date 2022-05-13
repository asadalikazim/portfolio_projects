import React, {useEffect} from "react"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import { navigate } from "gatsby"

//refreshing requestPage
const Refresh = (() => {
    useEffect(() => {
        navigate("/dashboard/requests")
    }, [])
    return <Grid></Grid>
}
   
)

export default Refresh
import React, { useEffect, useState } from "react"
import { Grid, Button, Typography, Box } from "@material-ui/core"
import { Link, navigate } from "gatsby"
import "./styles.css"
import Auth from "../../../services/authorization/sign-in"
import LoadingComponent from "../../LoadingComponent"

const GridCategoryList = ({ title, data, extraText, extraFuncLink }) => {
  const [user, setUser] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser(user => setUser(user))
        if (response.status === 200) setUser(response.data)
      } catch (err) {
        console.log(err)
        setUser(null)
      }
    }
    fetchData()
  }, [])

  const handleAddLecture = id => {
    navigate("/create-lectures", {
      state: { id },
    })
  }

  const handleAddAssignment = id => {
    console.log(id)
    navigate("/upload-assignments", {
      state: { id },
    })
    
  }

  if (!user) return <LoadingComponent />

  return (
    <Grid
      item
      className="each-category-main-list-component"
      justify="flex-start"
      alignItems="center"
      direction="column"
      style={{ margin: "0.5rem", padding: "1rem" }}
    >
      <Grid item container justify="flex-start" alignItems="center">
        <Box color="#A78EC3">
          <Typography variant="h5">{title}</Typography>
        </Box>
      </Grid>
      <Grid
        item
        container
        justify="flex-start"
        alignItems="center"
        style={{
          display: "flex",
          flexWRap: "wrap",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}
      >
        {data.map((eachData, index) => (
          <>
            {/* STUDENT */}
            {user.role == "STUDENT" && (
              <Grid
                className="grid-cat-list-card-each"
                style={{
                  padding: "10px 10px",
                  width: "100%",
                }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/app/class/${eachData._id}`}
                >
                  <Button component={Link} to={`/app/class/${eachData._id}`}>
                    <Typography variant="h6">{eachData.name}</Typography>
                  </Button>
                  <br />
                </Link>
              </Grid>
            )}
            {/* Consultant */}
            {user.role == "CONSULTANT" && (
              <Grid
                className="grid-cat-list-card-each"
                style={{
                  padding: "10px 10px",
                  width: "100%",
                }}
              >
                <Button component={Link} to={`/app/class/${eachData._id}`}>
                  <Typography variant="h6">{eachData.name}</Typography>
                </Button>
                <br />
                <span>
                  <Button onClick={() => handleAddLecture(eachData._id)}>
                    <Box color="#A78EC3">
                      <Typography>+ Lecture</Typography>
                    </Box>
                  </Button>
                  <Button onClick={() => handleAddAssignment(eachData._id)}>
                    <Box color="#A78EC3">
                      <Typography>+ Assignment</Typography>
                    </Box>
                  </Button>
                </span>
              </Grid>
            )}
            {/* CONSULTANT */}
            {user.role == "INITIATIVE" && (
              <Grid
                className="grid-cat-list-card-each"
                style={{
                  padding: "10px 10px",
                  width: "100%",
                }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`${eachData.opportunityLink}`}
                >
                  <Typography variant="h6">{eachData.name}</Typography>
                </Link>
              </Grid>
            )}
          </>
        ))}
        {(user.role == "CONSULTANT") && (
          <Button
            onClick={extraFuncLink}
            component={Link}
            to="/consultant/create-class"
            variant="outlined"
            style={{
              color: "#A78EC3",
              backgroundColor: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#A78EC3",
              },
              variant: "outlined",
              margin: "0.5rem",
              boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
              padding: "0.5rem",
              borderRadius: "25px",
              borderColor: "#A78EC3",
            }}
          >
            <Typography variant="subtitle2">{extraText}</Typography>
          </Button>
        )}
        {/* STUDENT */}
        {(user.role == "STUDENT") && (
          <Button
            onClick={extraFuncLink}
            component={Link}
            to="/dashboard/classes"
            variant="outlined"
            style={{
              color: "#A78EC3",
              backgroundColor: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#A78EC3",
              },
              variant: "outlined",
              margin: "0.5rem",
              boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
              padding: "0.5rem",
              borderRadius: "25px",
              borderColor: "#A78EC3",
            }}
          >
            <Typography variant="subtitle2">{extraText}</Typography>
          </Button>
        )}
        {/* Initiatives */}
        {user.role == "INITIATIVE" && (
          <Button
            onClick={extraFuncLink}
            component={Link}
            to="/dashboard/opportunities"
            variant="outlined"
            style={{
              color: "#A78EC3",
              backgroundColor: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#A78EC3",
              },
              variant: "outlined",
              margin: "0.5rem",
              boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
              padding: "0.5rem",
              borderRadius: "25px",
              borderColor: "#A78EC3",
            }}
          >
            <Typography variant="subtitle2">{extraText}</Typography>
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
export default GridCategoryList
